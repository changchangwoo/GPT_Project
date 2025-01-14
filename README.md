# 작은 친구들
![로고 이미지](https://github.com/user-attachments/assets/70ab415e-e070-4dac-8c22-4d53a80a970d)

- 🏆 동양미래대학교 2023 주문식 소프트웨어 경연 대회 우수상
- **🗓️** 프로젝트 기간 :  2023.10.16-2023.11.12
- 😸 1인 개발

작은 친구들은 일상 속 비활성 객체들과의 상호작용을 통해 새로운 사용자 채팅 경험을 제공하고 가치 인식을 확장하기 위해 기획된 프로젝트입니다
</br>
GPT API와 YOLO 모델을 활용하여 사용자가 업로드한 이미지의 물체를 식별하고 해당하는 특성의 프롬프트를 학습한 Chat GPT 통신의 챗 봇 서비스를 제공합니다.

## 기술 스택

React Native(Expo), Flask, Yolo, MySQL

## 기능 설계
![image](https://github.com/user-attachments/assets/14cca8e0-b01a-4ebb-9d53-6e9e16e70ddb)

* 플라스크 서버의 클래스 다이어 그램은 다음과 같습니다.
  

## 기능 소개

### 회원/비회원
<img width="300" src="https://github.com/user-attachments/assets/6c6f846e-6a9c-4cc7-b534-77930e3d2e06"/>

* 회원/비회원 기능을 구분하여 제공합니다
* 회원의 경우 대화내용이 저장되어 이후에도 접근이 가능합니다.

### 이미지 촬영 및 업로드
<img width="300" src="https://github.com/user-attachments/assets/75478afb-69f3-477d-8446-53a1ed7dd6f1"/>


* Expo ImagePicker의 촬영 및 갤러리 이미지 접근을 통해 이미지를 업로드 할 수 있습니다.
* 업로드 된 이미지는 새 친구 만나기 버튼을 통해 플라스크 서버로 전송되어집니다.

### 프로필 생성
<img width="300" src="https://github.com/user-attachments/assets/7d49d1a7-f285-45fe-81ff-3601fc98c8d3"/>


* 인공지능 이미지 인식 모델 Yolo를 통해 입력받은 이미지의 실제 객체 값을 반환합니다.
* 반환된 실제 객체 값을 바탕으로 OpenAI API를 활용하여 해당하는 객체의 닉네임, 좋아/싫어하는 것, 간단한 특성에 대한 설명을 추출합니다.
* 성격 배열 값에서 랜덤으로 두 개의 성격을 추출합니다.
* 성격과 이미지 특성을 바탕으로 챗 봇 프로필을 생성합니다.
* 생성된 프로필을 기반으로 프롬프트를 작성하여 이를 학습한 챗 봇을 생성합니다. 

### 대화 // 대화 내용 기억
<img width="300" src="https://github.com/user-attachments/assets/30fe76cf-3a97-4fad-9f28-4ca081883ade"/>


* 프로필을 바탕으로 특성을 학습한 챗 봇과 대화를 진행 할 수 있습니다.

<img width="300" src="https://github.com/user-attachments/assets/02cca2bc-a009-4db2-b11d-09835a42d434"/>

* 회원의 경우 대화 내용이 데이터베이스에 저장되어집니다
* 생성한 챗 봇과 언제든지 이어서 대화 할 수 있습니다

### 프로필 관리
<img width="300" src="https://github.com/user-attachments/assets/7b7a2cef-0d0a-4035-9d62-be7f1288edf6"/>

* 회원의 경우 대화 정보 페이지에서 작은 친구들의 대화 내용을 관리 할 수 있습니다
* 대화 내용이 제거 되는 경우 프로필도 제거 됩니다.
