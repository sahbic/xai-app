from flask import Flask, request, jsonify
app = Flask(__name__)

from utils import get_features, get_prediction
import logging

@app.route('/inputs')
def inputs():
    return(get_features())

@app.route('/predict',methods=['POST'])
def predict():
    data = request.get_json(force=True)
    prediction = get_prediction(list(data.values()))
    output = prediction[0][1]
    return(jsonify(output))

if __name__ == "__main__":
    app.run(host='0.0.0.0')