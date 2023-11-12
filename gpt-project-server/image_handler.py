# handlers/image_handler.py
from flask import request
import cv2
import numpy as np

class ImageHandler:
    def __init__(self):
        self.net = cv2.dnn.readNet("source/yolov4.weights", "source/yolov4.cfg")
        self.classes = []
        with open("source/coco.names", "r") as f:
            self.classes = [line.strip() for line in f.readlines()]
        self.layer_names = self.net.getLayerNames()
        self.output_layers = [self.layer_names[i - 1] for i in self.net.getUnconnectedOutLayers()]
        self.colors = np.random.uniform(0, 255, size=(len(self.classes), 3))

    def upload_file(self):
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
                    self.net.setInput(blob)
                    outs = self.net.forward(self.output_layers)

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
                    class_name = None

                    for i in range(len(boxes)):
                        if i in indexes:
                            if confidences[i] > max_confidence:
                                max_confidence = confidences[i]
                                class_name = self.classes[class_ids[i]]

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
