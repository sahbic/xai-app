# xai-app

Prototype for an Interactive & Interpretable Machine Learning model in production

It is built using:
- React.js
- Flask
- Jupyter Notebook

## Preview

![image](example.png "XAI App")

## Motivation

For every decision made with an ML model, we should be able to have clues about why this decision was made. We trust human decisions once we understand them and when they are based on facts and thorrow analysis. It should be the same for Machine Learning Models.

This app allows to interact with Machine Learning models to better understand the output.

It uses the local interpretabilty method of SHAP values to explain why a decision was made, and highlight what are the features that are pushing the prediction value up or down.

> "Interpretability is the degree to which a human can understand the cause of a decision"  Miller, Tim
