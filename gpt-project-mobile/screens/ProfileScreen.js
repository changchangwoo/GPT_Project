import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { profile_style } from '../styles/CSS';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


const ProfileScreen = ({ navigation, route }) => {
    const [img, setImage] = useState(null);
    useEffect(() => {
        setImage(route.params.img)
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
        <View style={profile_style.container}>
            <View style={profile_style.top_container}>
                <View style={profile_style.top_container}>
                    <View style={profile_style.circleView}>
                        {img && (
                            <Image
                                source={{ uri: img }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 100, // 원 모양으로 만들기 위한 반지름 설정 (이미지 크기의 반으로 설정)
                                }}
                            />
                        )}
                    </View>
                    <Text style={profile_style.logo}>
                        햇살
                    </Text>
                    <Text style={profile_style.logo_descript}>
                        강아지
                    </Text>
                </View>
            </View>
            <View style={profile_style.middle_container}>
                <View style={profile_style.personal_box}>
                    <Text style={profile_style.personal_text}>
                        신나는 성격
                    </Text>
                </View>
                <View style={profile_style.personal_box}>
                    <Text style={profile_style.personal_text}>
                        그냥 그런 성격
                    </Text>
                </View>
            </View>
            <View style={profile_style.low_container}>
                <View style={profile_style.text_box}>
                    <Text style={profile_style.text_descript}>
                        구름은 대기 중에서 수증기가 응축하여 형성되는 대기 중의 미세한 수치로, 다양한 형태와 높이로 나타납니다. 구름은 날씨를 예측하는 데 중요한 역할을 하며, 대기 중 수분을 분배하고 태양 복사를 흩뿌려 환경을 안정시키는 역할을 합니다. 또한 우리에게 아름다운 풍경을 선사하며, 자연의 아름다움과 우리 생활에 필수적인 요소로 구름은 소중한 존재입니다.
                    </Text>
                </View>
                <TouchableOpacity style={profile_style.start_btn}>
                    <Text style={profile_style.start_text}>시작하기</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default ProfileScreen;