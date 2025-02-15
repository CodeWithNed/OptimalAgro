from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import numpy as np
import json
from openai import OpenAI

app = Flask(__name__)

CORS(app)

client = OpenAI(
    api_key='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',  # This is the default and can be omitted
)

# Load the pickled model
with open('crop_model.pkl', 'rb') as f:
    model_dict = pickle.load(f)

input_data = None
predictions_of_model_for_input_data = None
land_condition = None
area = None

nitrogen = None
phosphorous = None
potassium = None
temperature = None
humidity = None
pH = None
rainfall = None


@app.route('/chat', methods=['POST'])
def chat():
    responses = []

    # Iterate through each crop and make a separate API call
    for crop in predictions_of_model_for_input_data:
        prompt = """{
  "Selected Area": {
    "size": {area} km²,
    "land_condition": {land_condition}
  },
  "Soil Composition": {
    "Nitrogen": ,
    "Phosphorous": 0,
    "Potassium": 0
  },
  "Environmental Conditions": {
    "temperature": "25°C",
    "humidity": "65%",
    "pH_level": 7,
    "rainfall": "1000mm"
  }
}

Using this information, provide a cultivation timeline for the given crops. Include costs in Sri Lankan Rupees (LKR) and output the result in JSON format. The JSON should follow this structure:

{
  "title": "",
  "duration": "",
  "cost": "",
  "description": ""
}

Translate all values into Sinhala without altering the keys."""
        prompt = prompt.format(crop_type=crop)
        
        # Prepare the message to send to the OpenAI API
        messages = [{"role": "user", "content": prompt}]
        
        # Make a request to OpenAI's API for each crop
        response = client.chat.completions.create(
            model="gpt-4o",  # Corrected model name, use the valid model
            messages=messages
        )
        
        # Extract the response text
        crop_response = response.choices[0].message.content
        
        # Append the response to the list of responses
        responses.append({crop: crop_response})

        print(responses)

    # Return the responses as a JSON
    return jsonify({"responses": responses})
    
# Function to predict top-k labels
def predict_top_k(json_input, scaler, label_encoder, model, k=4):

    global nitrogen, pH, phosphorous, potassium, temperature, humidity, rainfall

    nitrogen = json_input["nitrogen"],
    phosphorous = json_input["phosphorous"],
    potassium = json_input["potassium"],
    temperature = json_input["temperature"],
    humidity = json_input["humidity"],
    pH = json_input["pH"],
    rainfall = json_input["rainfall"]
    
    # Convert JSON input to numpy array
    input_data = np.array([
        json_input["nitrogen"],
        json_input["phosphorous"],
        json_input["potassium"],
        json_input["temperature"],
        json_input["humidity"],
        json_input["pH"],
        json_input["rainfall"]
    ]).reshape(1, -1)

    print(input_data)

    # Scale input
    input_scaled = scaler.transform(input_data)

    # Get probabilities and top-k indices
    probabilities = model.predict_proba(input_scaled)
    top_k_indices = np.argsort(probabilities, axis=1)[:, -k:]  # Get top-k indices
    top_k_labels = np.array([label_encoder.inverse_transform(row) for row in top_k_indices])  # Convert to labels

    return top_k_labels[0].tolist()  # Return as a list

@app.route('/predict', methods=['POST'])
def predict():
    global input_data, predictions_of_model_for_input_data, land_condition, area 
    data = request.get_json()  # Get input data from the request
    data = data['features']
    input_data = data
    land_condition = data.pop('landCondition')
    area = data.pop("area")

    model = model_dict['model']
    label_encoder = model_dict['label_encoder']
    scaler = model_dict['scaler']

    print(data)

    k = 4

    # Get top-3 predictions
    top_k_predictions = predict_top_k(data, scaler, label_encoder, model, k=4)
    predictions_of_model_for_input_data = top_k_predictions
    print(f"Top-{k} Predicted Crops:", top_k_predictions)
    return jsonify({'prediction': top_k_predictions})

@app.route('/get_data', methods=['GET'])
def get_data():
    global input_data, predictions_of_model_for_input_data 
    print(input_data)
    print(predictions_of_model_for_input_data)
    return jsonify({'input_data': input_data, 'prediction': predictions_of_model_for_input_data})


if __name__ == '__main__':
    app.run(debug=True)
