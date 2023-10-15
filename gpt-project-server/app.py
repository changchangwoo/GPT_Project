from flask import Flask, request, jsonify
from flask_cors import CORS
import openai  # ChatGPT API를 사용하기 위한 라이브러리

app = Flask(__name__)
CORS(app)

# ChatGPT API 키 설정
openai.api_key = "api_key"

@app.route('/print', methods=['POST'])
def print_text():
    data = request.get_json()
    text = data.get('text')

    if text:
        print(f"Received Text: {text}")
        return jsonify({'message': 'Text received and printed on the server.'})
    else:
        return jsonify({'error': 'Text is missing in the request'})

@app.route('/ask', methods=['POST'])
def ask_gpt():
    data = request.get_json()
    user_question = data.get('text')

    print(user_question)

    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"Translate the following English text to Korean: '{user_question}'",
        max_tokens=100
    )

    answer = response.choices[0].text.strip()

    print(answer)
    return jsonify({'answer': answer})


if __name__ == '__main__':
    print('hello')
    app.run(host='0.0.0.0')
