from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# Load the pickled model
with open('crop_model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get input data from the request
    input_features = data['features']  # Expecting a JSON key 'features'
    prediction = model.predict([input_features])  # Perform prediction
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
