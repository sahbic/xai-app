from flask import Flask
app = Flask(__name__)

from test import test_inference

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/test')
def test():
    return(test_inference())

if __name__ == "__main__":
    app.run(host='0.0.0.0')