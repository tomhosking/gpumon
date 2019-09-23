from flask import Flask, render_template

import json

import polling

app = Flask(__name__)

@app.route('/')
def home():
    
    return render_template('index.htm')


@app.route('/api/status')
def get_status():
    return json.dumps(polling.get_status()[0])


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5001)