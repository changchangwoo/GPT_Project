import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { main_style } from '../styles/CSS';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


const MainScreen = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const selectImageFromGallery = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('갤러리 접근 권한이 필요합니다!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        if (result.canceled === false) {
            if (result.assets && result.assets.length > 0) {
                setSelectedImage(result.assets[0].uri);
            }
        }
    };

    const takePicture = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('카메라 접근 권한이 필요합니다!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        if (result.canceled === false) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        const apiUrl = 'http://192.168.25.17:5555/upload'; // Flask 서버의 엔드포인트 URL로 대체

        const formData = new FormData();
        formData.append('image', {
            uri: selectedImage, // 이미지 파일의 URI를 사용
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
            if (response.data == '감지된 클래스 없음') {
                Alert.alert('물체를 식별할 수 없어요')
            } else {
                navigation.navigate('Profile', { img: selectedImage, obj_name: response.data.class_name })
            }
        } catch (error) {
            Alert.alert('이미지를 업로드해주세요')
        }
    };

    useEffect(() => {
        navigation.setOptions({
            title: '메인화면',
            headerTitleStyle: {
                fontFamily: 'NEXON_LIGHT',
                fontSize: 20,
            },
            headerStyle: {
                backgroundColor: 'white',
                borderBottomWidth: 1, // 네비게이션 바 하단에 선을 추가
                borderBottomColor: '#d3d3d3', // 선의 색상
            },
            headerTitleAlign: 'center',
        });
    }, [navigation]);

    return (
        <View style={main_style.container}>
            <View style={main_style.top_container}>
                <Text style={main_style.logo}>
                    새 친구 만나기
                </Text>
                <Text style={main_style.logo_descript}>
                    사진 촬영 또는 이미지 업로드를 통해서{'\n'}
                    새로운 친구를 만나보세요
                </Text>
            </View>
            <View style={main_style.main_container}>
                <Image
                    source={{ uri: selectedImage }}
                    style={main_style.main_image}
                />
            </View>
            <View style={main_style.low_container}>
                <TouchableOpacity style={main_style.btn} onPress={takePicture}>
                    <Text style={main_style.start_text}>카메라 촬영</Text>
                    <Image
                        source={require('../assets/icons/camera.png')}
                        style={main_style.icon_camera}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={main_style.btn} onPress={selectImageFromGallery}>
                    <Text style={main_style.start_text}>이미지 업로드</Text>
                    <Image
                        source={require('../assets/icons/gallery.png')}
                        style={main_style.icon_gallery}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={main_style.recognize_btn} onPress={uploadImage}>
                    <Text style={main_style.start_text}>새 친구 만나기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MainScreen;