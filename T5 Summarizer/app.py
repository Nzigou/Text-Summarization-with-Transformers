from flask import Flask, request, jsonify, render_template
from transformers import pipeline

app = Flask(__name__, template_folder='templates', static_folder='static')

summarizer = pipeline("summarization", model="t5-base")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/text-summarizer', methods=['POST'])
def text_summarizer():
    text = request.json['text']
    
    summary = summarizer(text, max_length=1024, min_length=30, length_penalty=2.0, num_beams=3, early_stopping=True)
    
    summary_text = summary[0]['summary_text']
    
    response = jsonify({'summarizeText': summary_text})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)