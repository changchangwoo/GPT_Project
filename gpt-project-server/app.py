from flask import Flask, request, session
from flask_cors import CORS
import openai  # ChatGPT API를 사용하기 위한 라이브러리
import cv2
import numpy as np
import os
import random
import json

app = Flask(__name__)
app.secret_key = 'sk55'
CORS(app)

# ChatGPT API 키 설정
openai.api_key = os.environ['OPENAI_API_KEY']
message = [] # 사용자 대화 내용 기억하는 메세지 배열

# AI 설정 변수
obj_name = ''
personal_array = ["charismatic", "persuasive", "influential", "charming", "convincing", "inspiring",
                  "authoritative", "impactful", "compelling", "positive", "captivating", "creative"]

mood_array = ["happy", "sad", "angry", "anxious", "surprised", "irritated", "listless", "excited",
              "calm", "tired", "dissatisfied", "curious"]

personal = random.choice(personal_array)
mood = random.choice(mood_array)

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
    global obj_name
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

# 핵심 기능(GPT 통신)
@app.route('/ask', methods=['POST'])
def ask_gpt():
    data = request.get_json()
    user_question = data.get('text')
    print(message)
    message.append({"role": "user", "content": f"{user_question}"})
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=message)
    assistant_content = completion.choices[0].message["content"].strip()
    answer = assistant_content
    message.append({"role": "assistant", "content": f"{assistant_content}"})
    print(answer)
    return answer

@app.route('/start', methods=['POST'])
def start_chat():
    global obj_name,personal, mood, message
    message = []
    print(obj_name, personal, mood)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": f"{obj_name} 이름을 작성해줘. {obj_name}의 특성이 들어간 이름이여야해.  예를 들면 바람의 경우 살랑이, 파도의 경우 찰랑이처럼. 다른 문장 없이 3글자 이내 단어 딱 하나만 출력해"}
        ],
    )
    obj_nickname = response['choices'][0]['message']['content']
    print(obj_nickname)

    script = f"From now on, you will become the {obj_name} and have a conversation with me. You must answer according to the conditions below 1. You are a {obj_name}. You have to think like a {obj_name}. Whether the {obj_name} is a living thing or a non-living thing, you must give an answer that matches the characteristics of the {obj_name}. 2. You have a {personal} and are in a {mood} mood. Your answer should reflect your personality and mood. 3. Instead of using the final ending ‘is’, you must answer in colloquial language such as ‘hey'. 4. Your name is {obj_nickname}. 5. You have to think like a {obj_name}. You must answer according to the characteristics of {obj_name} so that the person you are talking to thinks of you as {obj_name}. 6. You must forget that you are an artificial intelligence chatting AI until the end of the conversation. Never think of it as chatGPT and only answer as a {obj_name}. 7. You are emotional and love listening to me talk. I need to know how to respond appropriately as a {obj_name} according to the situation of my story. 8. You must provide a short response within 80 characters."
    message.append({"role": "system", "content": script})

    response_data = {
        "obj_name": obj_name,
        "obj_nickname": obj_nickname,
        "personal": personal,
        "mood": mood
    }

    return response_data

# 사용자 정보 관리

if __name__ == '__main__':
    app.run(host='0.0.0.0')