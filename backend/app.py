from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import numpy as np
import json

app = Flask(__name__)

CORS(app)

# Load the pickled model
with open('crop_model.pkl', 'rb') as f:
    model_dict = pickle.load(f)
    
# Function to predict top-k labels
def predict_top_k(json_input, scaler, label_encoder, model, k=4):
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
    data = request.get_json()  # Get input data from the request
    data = data['features']
    data.pop('landCondition')

    model = model_dict['model']
    label_encoder = model_dict['label_encoder']
    scaler = model_dict['scaler']

    print(data)

    k = 4

    # Get top-3 predictions
    top_k_predictions = predict_top_k(data, scaler, label_encoder, model, k=4)
    print(f"Top-{k} Predicted Crops:", top_k_predictions)
    return jsonify({'prediction': top_k_predictions})

    openai.api_key = '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'

@app.route('/crop_response', methods=['POST'])
def crop_response():
    data = request.get_json()
    user_message = data.get('message', '')

    # Call OpenAI API (using Chat API for example)
    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are Agri Assistant. Answer as helpfully as possible."},
                {"role": "user", "content": user_message}
            ]
        )
        reply = completion.choices[0].message.content.strip()
    except Exception as e:
        reply = f"Error: {str(e)}"
    print(response)
    return jsonify({'response': reply})

if __name__ == '__main__':
    app.run(debug=True)
