import React, { useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { main_style } from '../styles/CSS';

const MainScreen = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            title: '',
            headerTitleStyle: {
                fontFamily: 'FONT_LIGHT',
                fontSize: 20,
            },
            headerStyle: {
                backgroundColor: '#B8A8C4',
            },
            headerTitleAlign: 'center', // 가운데 정렬 추가
            headerShadowVisible: false, // 헤더 아래 선을 제거
        });

    }, [navigation]);

    return (
        <View style={main_style.container}>
            <View style={main_style.nav_container}>
            </View>
            <View style={main_style.contents_container}>
                <View style={main_style.img_container}>

                </View>
                <View style={main_style.button_container}>
                    <TouchableOpacity style={main_style.camera_button}>
                        <Text style={main_style.camera_button_text}>카메라로 촬영하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={main_style.camera_button}>
                        <Text style={main_style.camera_button_text}>앨범에서 업로드하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={main_style.set_chat_button}>
                        <Text style={main_style.set_chat_button_text}>대화 시작하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default MainScreen;
