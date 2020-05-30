import numpy as np
import pickle

MODEL_DIR = 'models/'

model = pickle.load(open(MODEL_DIR + 'GBT.pickle', 'rb'))
feature_list = pickle.load(open(MODEL_DIR + 'GBT_features.pickle', 'rb'))
explainer = pickle.load(open(MODEL_DIR + 'SHAP_GBT_Explainer.pickle', 'rb'))


def test_inference():
    res = []
    personal_info = np.array([[1  , 0  , 17  , 50  , 1  , 0  , 2  , 4  , 0]])

    res.append(feature_list)

    prediction = model.predict_proba(np.array(personal_info[0]).reshape(1, -1))
    res.append(prediction)

    shap_values = explainer.shap_values(personal_info[0])
    res.append(shap_values)

    return(" | ".join([str(e) for e in res]))