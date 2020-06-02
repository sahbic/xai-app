import numpy as np
import pickle
import json

MODEL_DIR = 'models/'

DATA = json.load(open(MODEL_DIR + 'GBT_features.json', 'rb'))

MODEL = pickle.load(open(MODEL_DIR + 'GBT.pickle', 'rb'))
EXPLAINER = pickle.load(open(MODEL_DIR + 'SHAP_GBT_Explainer.pickle', 'rb'))


def get_features():
    return(json.dumps(DATA['features']))

def get_params():
    params = {k: DATA[k] for k in DATA.keys() & {'probability', 'threshold', 'higherisbetter'}}
    return(json.dumps(params))

def get_prediction(inputs):
    prediction = MODEL.predict_proba(np.array(inputs).reshape(1, -1))
    return(prediction)

def get_explanation(inputs):
    values = list(inputs.values())
    shap_values = EXPLAINER.shap_values(np.array(values))
    out = [{"label":DATA['features'][i]['label'],"value":shap_values[i]} for i in range(len(DATA['features']))]
    # out = {DATA['features'][i]['name']:shap_values[i] for i in range(len(DATA['features']))}
    return(out)

def mapValues(inputs):
    for el in DATA["features"]:
        if el['type'] == 'categorical':
            inputs[el['name']] = el['input'][inputs[el['name']]]
        elif el['type'] == 'numeric':
            inputs[el['name']] = float(inputs[el['name']])
        else:
            inputs[el['name']] = inputs[el['name']]
    return(inputs)