import numpy as np
import pickle
import json

MODEL_DIR = 'models/'

model = pickle.load(open(MODEL_DIR + 'GBT.pickle', 'rb'))
explainer = pickle.load(open(MODEL_DIR + 'SHAP_GBT_Explainer.pickle', 'rb'))

# feature_list = pickle.load(open(MODEL_DIR + 'GBT_features.pickle', 'rb'))
feature_list = json.load(open(MODEL_DIR + 'GBT_features.json', 'rb'))


def get_features():
    return(json.dumps(feature_list['features']))

def get_prediction(data):
    prediction = model.predict_proba(np.array(data).reshape(1, -1))
    return(prediction)