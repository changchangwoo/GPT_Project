import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { login_style, style } from '../styles/CSS';
import { TextInput } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation, route }) => {
    const server_url = process.env.EXPO_PUBLIC_API_URL;

    const [id, onChangeid] = useState('');
    const [pw, onChangepw] = useState('');
    const [selectedButton, setSelectedButton] = useState('login');

    useEffect(() => {
        navigation.setOptions({
            title: '회원정보',
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
    }, [navigation]);

    const handleLoginSelect = () => {
        setSelectedButton('login');
    };

    const handleRegisterSelect = () => {
        setSelectedButton('register');
    };

    const handleAction = () => {
        if (selectedButton === 'login') {
            axios.post(server_url + 'login', { id: id, pw: pw })
                .then(response => {
                    console.log(response.data);
                    if (response.data === '로그인 성공') {
                        navigation.navigate('List', { user_id: id, server_url: server_url })
                    } else if (response.data === '로그인 실패') {
                        Alert.alert('아이디 또는 비밀번호를 확인해주세요')
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
        else if (selectedButton === 'register') {
            axios.post(server_url + 'register', { id: id, pw: pw })
                .then(response => {
                    console.log(response.data);
                    if (response.data === '성공') {
                        Alert.alert('회원가입이 완료되었습니다')
                    } else if (response.data === '중복') {
                        Alert.alert('중복된 아이디입니다. 다른 아이디를 사용해주십시오')
                    }
                })
                .catch(error => {
                    console.error(error);
                });

        }
    }

    return (
        <View style={login_style.container}>
            <Text style={login_style.logo}>
                로그인
            </Text>
            <View style={login_style.select_container}>
                <TouchableOpacity
                    style={[
                        login_style.login_select,
                        selectedButton === 'login' && { backgroundColor: '#B8A8C4' },
                    ]}
                    onPress={handleLoginSelect}
                >
                    <Text style={login_style.select_text}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        login_style.register_select,
                        selectedButton === 'register' && { backgroundColor: '#B8A8C4' },
                    ]}
                    onPress={handleRegisterSelect}
                >
                    <Text style={login_style.select_text}>회원가입</Text>
                </TouchableOpacity>
            </View>
            <View style={login_style.input_container}>
                <TextInput
                    style={login_style.text_input}
                    onChangeText={onChangeid}
                    value={id}
                    placeholder='아이디'
                />
                <TextInput
                    style={login_style.text_input}
                    onChangeText={onChangepw}
                    value={pw}
                    placeholder='비밀번호'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={login_style.start_btn}
                    onPress={handleAction}>
                    <Text style={login_style.start_text}>
                        {selectedButton === 'login' ? '로그인' : '회원가입'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;
