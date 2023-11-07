import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { profile_style } from '../styles/CSS';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


const ProfileScreen = ({ navigation, route }) => {
    const server_url = route.params.server_url
    const [img, setImage] = useState(null);
    const [obj_name, setObj_name] = useState('');
    const [mood, setMood] = useState('');
    const [obj_descript, setObj_descirpt] = useState('');
    const [obj_nickname, setObj_nickname] = useState('');
    const [personal, setPersonal] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setImage(route.params.img);
        setObj_name(route.params.obj_name);
        navigation.setOptions({
            title: '프로필화면',
            headerTitleStyle: {
                fontFamily: 'NEXON_LIGHT',
                fontSize: 20,
            },
            headerStyle: {
                backgroundColor: 'white',
                borderBottomWidth: 1,
                borderBottomColor: '#d3d3d3',
            },
            headerTitleAlign: 'center',
        });

        // 데이터 로딩
        const setProfile = async () => {
            const name = route.params.obj_name;
            console.log(name);
            try {
                const response = await axios.post(server_url+'start', {
                    name: name,
                });

                if (response.status === 200) {
                    console.log(response.data);
                    setObj_nickname(response.data.obj_nickname);
                    setObj_descirpt(response.data.obj_descript);
                    setMood(response.data.mood);
                    setPersonal(response.data.personal);
                    setIsLoading(false); // 데이터 로딩이 완료되면 isLoading을 false로 설정
                } else {
                    console.log('error');
                    setIsLoading(false); // 에러가 발생하더라도 isLoading을 false로 설정
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false); // 에러가 발생하더라도 isLoading을 false로 설정
            }
        };
        setProfile();
    }, [navigation]);

    const NavChatScreen = () => {
        navigation.navigate('Chat', { img: img, obj_name: obj_name, mood: mood, obj_nickname: obj_nickname, personal: personal, server_url: server_url })
    };

    if (isLoading) {
        return (
            <View style={profile_style.loading_container}>
                <Image
                    source={require('../assets/imgs/loading_image.png')} // 이미지 경로 설정
                    style={profile_style.loading_image}
                />
                <Text style={profile_style.loading_text}>새 친구가 대화를 준비하는 중입니다 {'\n'}
                    잠시만 기다려주세요</Text>
            </View>

        )
    }

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
                        {obj_nickname}
                    </Text>
                    <Text style={profile_style.logo_descript}>
                        {obj_name}
                    </Text>
                </View>
            </View>
            <View style={profile_style.middle_container}>
                <View style={profile_style.personal_box}>
                    <Text style={profile_style.personal_text}>
                        {personal}
                    </Text>
                </View>
                <View style={profile_style.personal_box}>
                    <Text style={profile_style.personal_text}>
                        {mood}
                    </Text>
                </View>
            </View>
            <View style={profile_style.low_container}>
                <View style={profile_style.text_box}>
                    <Text style={profile_style.text_descript}>
                        {obj_descript}
                    </Text>
                </View>
                <TouchableOpacity style={profile_style.start_btn}
                onPress={NavChatScreen}>
                    <Text style={profile_style.start_text}>대화 시작하기</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default ProfileScreen;