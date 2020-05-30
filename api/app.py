from flask import Flask
app = Flask(__name__)

from utils import get_features

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/inputs')
def inputs():
    return(get_features())

if __name__ == "__main__":
    app.run(host='0.0.0.0')