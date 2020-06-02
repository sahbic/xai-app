from flask import Flask, request, jsonify
app = Flask(__name__)

from utils import get_features, get_prediction, get_explanation, mapValues, get_params
import logging

@app.route('/inputs')
def inputs():
    return(get_features())

@app.route('/parameters')
def params():
    return(get_params())

@app.route('/predict',methods=['POST'])
def predict():
    inputs = request.get_json(force=True)
    logging.warn(inputs)
    inputs = mapValues(inputs)
    logging.warn(inputs)
    prediction = get_prediction(list(inputs.values()))
    logging.warn(prediction)
    output = prediction[0][1]
    return(jsonify(output))

@app.route('/explain',methods=['POST'])
def explain():
    inputs = request.get_json(force=True)
    inputs = mapValues(inputs)
    logging.warn(inputs)
    explanations = get_explanation(inputs)
    logging.warn(explanations)
    return(jsonify(explanations))

if __name__ == "__main__":
    app.run(host='0.0.0.0')