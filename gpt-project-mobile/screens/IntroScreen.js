import React from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { intro_style, style } from '../styles/CSS';


const IntroScreen = ({ navigation }) => {
    const handle_start = () => {
        console.log('handle_start_clicked')
        navigation.navigate('Main');

    }
    return (
        <View style={intro_style.container}>
            <View style={intro_style.top_container}>
                <Image
                    source={require('../assets/imgs/intro_image.png')} // 이미지 경로 설정
                    style={intro_style.intro_image}
                />
            </View>
            <View style={intro_style.middle_container}>
                <Text style={intro_style.logo}>
                    귀를 기울이면
                </Text>
                <Text style={intro_style.logo_descript}>
                    그동안 내가 놓치고 있었던{'\n'}
                    주변 목소리에 귀를 기울여보세요
                </Text>
            </View>
            <View style={intro_style.low_container}>
                <TouchableOpacity style={intro_style.start_btn}
                    onPress={handle_start}>
                    <Text style={intro_style.start_text}>시작하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={intro_style.register_btn}
                    onPress={handle_start}>
                    <Text style={intro_style.start_text}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default IntroScreen;
