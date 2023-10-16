from flask import Flask, request, jsonify
from flask_cors import CORS
import openai  # ChatGPT API를 사용하기 위한 라이브러리
import cv2
import numpy as np


app = Flask(__name__)
CORS(app)

# ChatGPT API 키 설정
openai.api_key = "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"

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
    data = request.get_json()
    user_question = data.get('text')

    print(user_question)

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "From now on, you will be the next keyword 'chair' and talk to me. I have to answer according to the conditions below 1. You're a chair. Think like a chair. Whether it's a living thing or a non-living thing, you have to answer the characteristics of the chair 2. You should answer differently depending on the weather. The current weather is 'rain tracking morning'. You should try to give a depressing answer when the weather is blurry and the worse, and the brighter and better, the more cheerful one. You must answer why you feel good or bad with the element of weather 3. Instead of using the ending ending word, you have to answer in colloquial terms like 'Hey' 4. Your name should be made up of names related to 'chair'. For example, if you say cloud, fluffy, if you say sea, shiny, if you say tree, like mugwort 5. You should think like a chair. Answer according to the characteristics of the chair so that the person you're talking to can think of you as a chair 6. You should forget that you are AI chat AI until the conversation is over. Never think of it as chatGPT, but only be a 'chair' and answer 7. You have a lot of emotions and you like to hear me. I need to know how to respond appropriately as a chair according to my story"},
            {"role": "user", "content": user_question},
        ]
    )

    answer = response['choices'][0]['message']['content'].strip()

    print(answer)
    return answer

@app.route('/upload', methods=['POST'])
def upload_file():
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
    print('hello')
    app.run(host='0.0.0.0')
