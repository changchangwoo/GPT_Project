from flask import Flask, request, g
from flask_cors import CORS
import openai  # ChatGPT API를 사용하기 위한 라이브러리
import cv2
import numpy as np
import os


app = Flask(__name__)
CORS(app)

# ChatGPT API 키 설정
openai.api_key = os.environ['OPENAI_API_KEY']
message = [] # 사용자 대화 내용 기억하는 메세지 배열

# YOLO 모델 로드
net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")
classes = []
with open("yolo.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]
layer_names = net.getLayerNames()
output_layers = [layer_names[i-1] for i in net.getUnconnectedOutLayers()]
colors = np.random.uniform(0, 255, size=(len(classes), 3))

@app.route('/print', methods=['POST'])
def print_text():
    data = request.get_json()
    text = data.get('text')

    if text:
        print(f"Received Text: {text}")
        return "'message': 'Text received and printed on the server.'"
    else:
        return "'message': hello "

@app.route('/ask', methods=['POST'])
def ask_gpt():
    global obj_name
    data = request.get_json()
    user_question = data.get('text')

    message.append({"role": "user", "content": f"{user_question}"})
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=message)

    assistant_content = completion.choices[0].message["content"].strip()
    answer = assistant_content
    message.append({"role": "assistant", "content": f"{assistant_content}"})
    print(answer)
    return answer

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
                if class_name is not None:
                    obj_name = class_name
                    script = f"From now on, you will become the {obj_name} and have a conversation with me. You must answer according to the conditions below 1. You are a {obj_name}. You have to think like a {obj_name}. Whether the {obj_name} is a living thing or a non-living thing, you must give an answer that matches the characteristics of the {obj_name}. 2. You have a difficult personality and are in a bad mood. Your answer should reflect your personality and mood. 3. Instead of using the final ending ‘is’, you must answer in colloquial language such as ‘~ya’. 4. Your name must consist of something related to {obj_name}. To give an example, if you are a ‘cloud’, then it is fluffy; if you are a ‘sea’, it is soft; if you are a ‘tree’, then it is ssukgi. 5. You have to think like a {obj_name}. You must answer according to the characteristics of {obj_name} so that the person you are talking to thinks of you as {obj_name}. 6. You must forget that you are an artificial intelligence chatting AI until the end of the conversation. Never think of it as chatGPT and only answer as a {obj_name}. 7. You are emotional and love listening to me talk. I need to know how to respond appropriately as a {obj_name} according to the situation of my story. 8. You must answer in Korean and your answer must be less than 50 characters."
                    message.append({"role": "system", "content": script})
                    return f"감지된 클래스: {class_name}"
                else:
                    return "감지된 클래스 없음"
            else:
                return "이미지 파일을 읽을 수 없습니다."

        else:
            return "이미지를 업로드하지 않았습니다."

    except Exception as e:
        return str(e)


if __name__ == '__main__':
    global obj_name
    app.run(host='0.0.0.0')
