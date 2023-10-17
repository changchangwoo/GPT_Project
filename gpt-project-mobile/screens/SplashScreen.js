import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

export default function App() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [response, setResponse] = useState('');

    const sendTextToServer = async () => {
        try {
            const apiUrl = 'http://192.168.132.140:5000/ask'; // Flask 서버의 엔드포인트 URL로 대체

            const response = await axios.post(apiUrl, { text });

            setResponse(response.data);
        } catch (error) {
            console.error('데이터 전송 실패:', error);
        }
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 카메라 액세스 권한을 요청
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                console.log('카메라 액세스 권한이 거부되었습니다.');
            }
        })();
    }, []);

    // 이미지 선택 및 업로드 함수
    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) { // 'canceled'로 수정
            setImage(result.assets[0].uri); // 'assets' 배열을 사용하여 이미지 URI에 접근
            uploadImage(result.assets[0].uri);
        }
    };

    // 이미지를 Flask 서버로 업로드
    const uploadImage = async (uri) => {
        const apiUrl = 'http://192.168.132.140:5000/upload'; // Flask 서버의 엔드포인트 URL로 대체

        const formData = new FormData();
        formData.append('image', {
            uri,
            name: 'image.jpg',
            type: 'image/jpg',
        });

        try {
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('이미지 업로드 성공:', response.data);
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
        }
    };

    return (
        <View style={styles.container}>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <TouchableOpacity style={styles.button} onPress={selectImage}>
                <Text style={styles.buttonText}>이미지 선택</Text>
            </TouchableOpacity>
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 50 }}
                    onChangeText={(value) => setText(value)}
                    value={text}
                />
                <Button title="서버로 데이터 전송" onPress={sendTextToServer} />
                <Text>서버 응답: {response}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
