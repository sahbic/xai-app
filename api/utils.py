import numpy as np
import pickle
import json

MODEL_DIR = 'models/'

model = pickle.load(open(MODEL_DIR + 'GBT.pickle', 'rb'))
feature_list = pickle.load(open(MODEL_DIR + 'GBT_features.pickle', 'rb'))
explainer = pickle.load(open(MODEL_DIR + 'SHAP_GBT_Explainer.pickle', 'rb'))


def get_features():
    dict = []
    for inpt in feature_list:
        dict.append({
            "name": inpt
        })
    return(json.dumps(dict))