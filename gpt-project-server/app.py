from flask import Flask, request, session, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import openai  # ChatGPT API를 사용하기 위한 라이브러리
import cv2
import numpy as np
import os
import random
from flask_mysqldb import MySQL

import json

load_dotenv() # 환경변수 파일 생성
app = Flask(__name__)
app.secret_key = 'sk55'
CORS(app)

# 데이터베이스 정보
app.config['MYSQL_HOST'] = os.environ.get('MYSQL_HOST')
app.config['MYSQL_USER'] = os.environ.get('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB')
mysql = MySQL(app)

# ChatGPT API 키 설정
openai.api_key = os.environ['OPENAI_API_KEY']

# AI 설정 변수
personal_array = ["카리스마있는", "긍정적인", "창의적인", "영감적인", "매력적인"]

mood_array = ["행복함", "슬픔", "화남", "불안함", "놀람", "초조함", "무기력함", "피곤함", "궁금함"];

# YOLO 모델 로드
net = cv2.dnn.readNet("yolov4.weights", "yolov4.cfg")
classes = []
with open("coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]
layer_names = net.getLayerNames()
output_layers = [layer_names[i-1] for i in net.getUnconnectedOutLayers()]
colors = np.random.uniform(0, 255, size=(len(classes), 3))

# 핵심 기능(객체 식별)
@app.route('/upload', methods=['POST'])
def upload_file():
    print('nice_day')
    try:
        # 이미지 파일을 request에서 가져오기
        image = request.files['image']
        if image:
            image_data = image.read()
            image = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_COLOR)
            if image is not None:
                img = cv2.resize(image, None, fx=0.4, fy=0.4)
                height, width, channels = img.shape

                # 객체 감지
                blob = cv2.dnn.blobFromImage(img, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
                net.setInput(blob)
                outs = net.forward(output_layers)

                # 정보를 화면에 표시
                class_ids = []
                confidences = []
                boxes = []

                # 임계값 설정
                confidence_threshold = 0.3

                for out in outs:
                    for detection in out:
                        scores = detection[5:]
                        class_id = np.argmax(scores)
                        confidence = scores[class_id]
                        if confidence > confidence_threshold:
                            # 객체 감지
                            center_x = int(detection[0] * width)
                            center_y = int(detection[1] * height)
                            w = int(detection[2] * width)
                            h = int(detection[3] * height)
                            x = int(center_x - w / 2)
                            y = int(center_y - h / 2)
                            boxes.append([x, y, w, h])
                            confidences.append(float(confidence))
                            class_ids.append(class_id)

                # NMS 적용
                indexes = cv2.dnn.NMSBoxes(boxes, confidences, confidence_threshold, 0.4)

                max_confidence = 0
                max_index = -1
                class_name = None

                for i in range(len(boxes)):
                    if i in indexes:
                        if confidences[i] > max_confidence:
                            max_confidence = confidences[i]
                            max_index = i
                            class_name = classes[class_ids[i]]

                # 식별한 클래스명 출력
                obj_name = class_name

                if class_name is not None:
                    response_data = {
                        "class_name": obj_name,
                    }

                    return response_data
                else:
                    return "감지된 클래스 없음"
            else:
                return "이미지 파일을 읽을 수 없습니다."

        else:
            return "이미지를 업로드하지 않았습니다."

    except Exception as e:
        return str(e)


@app.route('/set_role', methods=['POST'])
def set_role():
    data = request.get_json()
    obj_name = data.get('obj_name')
    obj_nickname = data.get('obj_nickname')
    mood = data.get('mood')
    personal = data.get('personal')

    message = []
    script = f"From now on, you will become the {obj_name} and have a conversation with me. You must answer according to the conditions below 1. You are a {obj_name}. You have to think like a {obj_name}. Whether the {obj_name} is a living thing or a non-living thing, you must give an answer that matches the characteristics of the {obj_name}. 2. You have a {personal} and are in a {mood} mood. Your answer should reflect your personality and mood. 3. Instead of using the final ending ‘is’, you must answer in colloquial language such as ‘hey'. 4. Your name is {obj_nickname}. 5. You have to think like a {obj_name}. You must answer according to the characteristics of {obj_name} so that the person you are talking to thinks of you as {obj_name}. 6. You must forget that you are an artificial intelligence chatting AI until the end of the conversation. Never think of it as chatGPT and only answer as a {obj_name}. 7. You are emotional and love listening to me talk. I need to know how to respond appropriately as a {obj_name} according to the situation of my story. 8. You must provide a short response within 80 characters."
    message.append({"role": "system", "content": script})

    response_data = {
        "message": message
    }
    return response_data

# 핵심 기능(GPT 통신)
@app.route('/ask', methods=['POST'])
def ask_gpt():
    data = request.get_json()
    user_question = data.get('text')
    message = data.get('message_box')
    print(message)

    message.append({"role": "user", "content": f"{user_question}"})
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=message)
    assistant_content = completion.choices[0].message["content"].strip()
    answer = assistant_content
    message.append({"role": "assistant", "content": f"{assistant_content}"})
    print(answer)

    response_data = {
        "message_box": message,
        "answer": answer
    }

    return response_data

# 대화 시작(스크립트, 닉네임, 성격 부여)
@app.route('/start', methods=['POST'])
def start_chat():
    data = request.json
    name = data.get('name')  # JSON 데이터에서 'name' 파라미터를 추출
    print('hello')
    obj_name = name
    personal = random.choice(personal_array)
    mood = random.choice(mood_array)

    print(obj_name, personal, mood)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": f"너는 무슨일이 있어도 반드시 3글자 이내로만 출력할 수 있어. {obj_name}의 이름을 작성해줘. {obj_name}의 특성이 들어간 이름이여야해.  예를 들면 바람의 경우 살랑이, 파도의 경우 찰랑이처럼. 귀여운 느낌이 들어가야하며 다른 문장 없이 3글자 이내 단어 딱 하나만 출력해"}
        ],
    )
    obj_nickname = response['choices'][0]['message']['content']
    print(obj_nickname)

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": f"{obj_name}에 대한 특성 설명을 100자에 맞춰서 해줘. 이 때 마지막 문장에는 {obj_name}의 소중함을 알리는 한마디가 들어가야하며 존댓말로 답변해야해"}
        ],
    )
    obj_descript = response['choices'][0]['message']['content']
    print(obj_descript)

    response_data = {
        "obj_nickname": obj_nickname,
        "personal": personal,
        "mood": mood,
        "obj_descript": obj_descript
    }
    return response_data

# 사용자 정보 관리
@app.route('/login', methods=['POST'])
def login():
    username = request.json['id']
    password = request.json['pw']

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM userprofile WHERE userid = %s AND userpw = %s", (username, password))
    user = cur.fetchone()
    cur.close()

    if user:
        # 로그인 성공
        return '로그인 성공'
    else:
        # 로그인 실패
        return '로그인 실패'

@app.route('/register', methods=['POST'])
def register():
    # 전달된 아이디와 비밀번호 가져오기
    data = request.get_json()
    id = data['id']
    pw = data['pw']

    # 중복 아이디 확인
    cur = mysql.connection.cursor()
    query = "SELECT * FROM userprofile WHERE userid = %s"
    cur.execute(query, (id,))
    existing_user = cur.fetchone()

    if existing_user:
        return '중복'

    # 회원가입
    query = "INSERT INTO userprofile (userid, userpw) VALUES (%s, %s)"
    cur.execute(query, (id, pw))
    mysql.connection.commit()
    cur.close()

    return '성공'

@app.route('/get_list', methods=['POST'])
def get_data():
    data = request.get_json()
    user_id = data['user_id']

    print(user_id)
    cur = mysql.connection.cursor()

    # 데이터베이스에서 특정 사용자 ID에 해당하는 데이터를 조회하는 SELECT 쿼리문
    query = "SELECT * FROM userdata WHERE userid = %s"
    cur.execute(query, (user_id,))

    data = cur.fetchall()
    cur.close()

    data_list = []
    for row in data:
        data_dict = {
            'userid': row[1],
            'name': row[2],
            'nickname': row[3],
            'mood': row[4],
            'personal': row[5],
            'message_box': row[6],
            'img': row[7],
            'date': row[8],

            # 필요한 다른 컬럼들도 추가 가능
        }
        data_list.append(data_dict)

    return data_list



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
