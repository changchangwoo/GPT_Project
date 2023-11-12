import ast
import random
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from flask_mysqldb import MySQL
import json

from database_handler import DatabaseHandler
from image_handler import ImageHandler

class GPTHandler:
    def __init__(self):
        openai.api_key = os.environ['OPENAI_API_KEY']
        self.personal_array = ["카리스마있는", "긍정적인", "부정적인", "애교많은", "날카로운", "감성적인"]
        self.mood_array = ["행복함", "슬픔", "화남", "피곤함", "기쁨", "우울함", "들뜸"]

    def set_role(self):
        data = request.get_json()
        user_id = data.get('user_id')
        obj_name = data.get('obj_name')
        obj_nickname = data.get('obj_nickname')
        mood = data.get('mood')
        personal = data.get('personal')
        img = data.get('img')
        descript = data.get('obj_descript')
        like = data.get('like')
        dislike = data.get('dislike')
        messages = 'temp'

        scr_like = str(like)
        scr_dislike = str(dislike)

        message = []
        script = f"From now on, you will become the {obj_name} and have a conversation with me. You must answer according to the conditions below 1. You are a {obj_name}. You have to think like a {obj_name}. Whether the {obj_name} is a living thing or a non-living thing, you must give an answer that matches the characteristics of the {obj_name}. 2. You have a {personal} and are in a {mood} mood. Your answer should reflect your personality and mood. 3. you must answer in colloquial language. 4. Your name is {obj_nickname}. 5. You have to think like a {obj_name}. You must answer according to the characteristics of {obj_name} so that the person you are talking to thinks of you as {obj_name}.  6.You should respond positively to the word {scr_like} and negatively to the word {scr_dislike} 7. You must forget that you are an artificial intelligence chatting AI until the end of the conversation. Never think of it as chatGPT and only answer as a {obj_name}. 8. You are emotional and love listening to me talk. I need to know how to respond appropriately as a {obj_name} according to the situation of my story. 9. You must provide a short response within 80 characters. 10. You have to write sentences with Korean being read naturally. "
        message.append({"role": "system", "content": script})

        if user_id is not None:
            DB = ChatGPTFlaskApp()
            DB.save_to_database(user_id, obj_name, obj_nickname, mood, personal, message, img, descript, messages)

        response_data = {
            "message": message
        }
        return response_data

    def ask_gpt(self):
        data = request.get_json()
        user_question = data.get('text')
        message = data.get('message_box')
        user_id = data.get('user_id')
        obj_name = data.get('obj_name')
        obj_nickname = data.get('obj_nickname')
        messages = data.get('messages')

        message.append({"role": "user", "content": f"{user_question}"})
        completion = openai.ChatCompletion.create(model="gpt-4-1106-preview", messages=message)
        assistant_content = completion.choices[0].message["content"].strip()
        answer = assistant_content
        message.append({"role": "assistant", "content": f"{assistant_content}"})

        if user_id is not None:
            DB = ChatGPTFlaskApp()
            DB.update_user_info(message, user_id, obj_name, obj_nickname, messages)

        response_data = {
            "message_box": message,
            "answer": answer
        }

        return response_data

    def start_chat(self):
        data = request.json
        name = data.get('name')
        obj_name = name
        personal = random.choice(self.personal_array)
        mood = random.choice(self.mood_array)

        response = openai.ChatCompletion.create(
            model="gpt-4-1106-preview",
            messages=[
                {"role": "system",
                 "content": f"너는 무슨일이 있어도 반드시 3글자 이내로만 출력할 수 있어. {obj_name}의 이름을 작성해줘. {obj_name}의 특성이 들어간 이름이여야해.  예를 들면 바람의 경우 살랑이, 파도의 경우 찰랑이처럼. 귀여운 느낌이 들어가야하며 다른 문장 없이 3글자 이내 단어 딱 하나만 출력해"}
            ],
        )
        obj_nickname = response['choices'][0]['message']['content']

        response = openai.ChatCompletion.create(
            model="gpt-4-1106-preview",
            messages=[
                {"role": "system",
                 "content": f"{obj_name}에 대한 특성 설명을 100자에 맞춰서 해줘. 이 때 마지막 문장에는 {obj_name}의 소중함을 알리는 한마디가 들어가야하며 존댓말로 답변해야해. 반드시 한국말만 사용해서 답변해야해"}

            ],
        )
        obj_descript = response['choices'][0]['message']['content']

        response = openai.ChatCompletion.create(
            model="gpt-4-1106-preview",
            messages=[
                {"role": "system",
                 "content": f"{obj_name}가 좋아하는 단어 4개의 리스트, 싫어하는 단어 4개의 리스트를 하나의 리스트에 담아 답변해줘. 다음은 의자를 통한 예시이며 동일한 형식으로 대답해야해 [[ '편안함', '안락', '디자인', '품질', '내추럴'],['불편','딱딱','색상','낡은','부실']] 다른 문장 없이 오직 리스트만을 답변해. 반드시 한국말만 사용해서 답변해야해"}
            ],
        )
        like_array = response['choices'][0]['message']['content']

        text_representation = like_array
        word_lists = ast.literal_eval(text_representation)

        like = word_lists[0]
        dislike = word_lists[1]

        response_data = {
            "obj_nickname": obj_nickname,
            "personal": personal,
            "mood": mood,
            "obj_descript": obj_descript,
            "like": like,
            "dislike": dislike
        }
        return response_data

load_dotenv()
class ChatGPTFlaskApp:
    def __init__(self):
        self.app = Flask(__name__)
        self.app.secret_key = 'sk55'
        CORS(self.app)

        self.app.config['MYSQL_HOST'] = os.environ.get('MYSQL_HOST')
        self.app.config['MYSQL_USER'] = os.environ.get('MYSQL_USER')
        self.app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASSWORD')
        self.app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB')
        self.mysql = MySQL(self.app)
        self.db_manager = DatabaseHandler(self.mysql)

        self.setup_routes()

    def setup_routes(self):
        self.app.route('/upload', methods=['POST'])(self.upload_file)
        self.app.route('/set_role', methods=['POST'])(self.set_role)
        self.app.route('/ask', methods=['POST'])(self.ask_gpt)
        self.app.route('/start', methods=['POST'])(self.start_chat)
        self.app.route('/login', methods=['POST'])(self.login)
        self.app.route('/register', methods=['POST'])(self.register)
        self.app.route('/get_list', methods=['POST'])(self.get_data)
        self.app.route('/delete_data', methods=['POST'])(self.delete_data)
        self.app.route('/change_message', methods=['POST'])(self.change_message)

    def upload_file(self):
        handler = ImageHandler()
        return handler.upload_file()

    def run(self):
        self.app.run(host='0.0.0.0', port=5555, debug=True)

    def set_role(self):
        handler = GPTHandler()
        return handler.set_role()

    def ask_gpt(self):
        handler = GPTHandler()
        return handler.ask_gpt()

    def start_chat(self):
        handler = GPTHandler()
        return handler.start_chat()

    def login(self):
        username = request.json['id']
        password = request.json['pw']
        result = self.db_manager.login(username, password)
        return result

    def register(self):
        data = request.get_json()
        id = data['id']
        pw = data['pw']
        result = self.db_manager.register(id, pw)
        return result

    def get_data(self):
        data = request.get_json()
        user_id = data['user_id']
        result = self.db_manager.get_data(user_id)
        return result

    def delete_data(self):
        data = request.get_json()
        user_id = data.get('user_id')
        obj_name = data.get('name')
        obj_nickname = data.get('nickname')
        result = self.db_manager.delete_data(user_id, obj_name, obj_nickname)
        return result

    def save_to_database(self, user_id, obj_name, obj_nickname, mood, personal, message, img, descript, messages):
        self.db_manager.save_to_database(user_id, obj_name, obj_nickname, mood, personal, message, img, descript, messages)

    def update_user_info(self, message, user_id, obj_name, obj_nickname, messages):
        self.db_manager.update_user_info(message, user_id, obj_name, obj_nickname, messages)
    def change_message(self):
        try:
            data = request.json
            message_json = data.get('message')
            messages_json = data.get('messages')

            message = json.loads(message_json)
            messages = json.loads(messages_json)

            return jsonify({'message': message, 'messages': messages})

        except Exception as e:
            print(f"An error occurred: {e}")
            return jsonify({'error': 'An error occurred during message change'})

if __name__ == '__main__':
    chatgpt_app = ChatGPTFlaskApp()
    chatgpt_app.run()
