import React, { useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { main_style } from '../styles/CSS';

const MainScreen = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            title: '메인화면',
            headerTitleStyle: {
                fontFamily: 'NEXON_LIGHT',
                fontSize: 20,
            },
            headerStyle: {
                backgroundColor: 'white',
            },
            headerTitleAlign: 'center', // 가운데 정렬 추가
            headerShadowVisible: false, // 헤더 아래 선을 제거
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
                    source={require('../assets/imgs/main_image.png')} // 이미지 경로 설정
                    style={main_style.main_image}
                />
            </View>
            <View style={main_style.low_container}>
                <TouchableOpacity style={main_style.btn}>
                    <Text style={main_style.start_text}>카메라 촬영</Text>
                    <Image
                        source={require('../assets/icons/camera.png')} // 이미지 경로 설정
                        style={main_style.icon_camera}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={main_style.btn}>
                    <Text style={main_style.start_text}>이미지 업로드</Text>
                    <Image
                        source={require('../assets/icons/gallery.png')} // 이미지 경로 설정
                        style={main_style.icon_gallery}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={main_style.recognize_btn}>
                    <Text style={main_style.start_text}>새 친구 만나기</Text>
                </TouchableOpacity>

            </View>


        </View>
    );
};

export default MainScreen;
