import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { chat_style } from '../styles/CSS';

function ChatScreen({ navigation, route }) {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [message_box, setMessage_box] = useState([]);
    const server_url = route.params.server_url;
    const scrollViewRef = useRef(); // Ref for the ScrollView

    useEffect(() => {
        const server_url = route.params.server_url
        const obj_name = route.params.obj_name
        const obj_nickname = route.params.obj_nickname
        const mood = route.params.mood
        const personal = route.params.personal

        navigation.setOptions({
            title: '채팅화면',
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

        const setRole = async () => {
            try {
                const response = await axios.post(server_url + 'set_role', {
                    obj_name: obj_name,
                    obj_nickname: obj_nickname,
                    mood: mood,
                    personal: personal
                });

                if (response.status === 200) {
                    console.log(response.data);
                    setMessage_box(response.data.message)
                } else {
                    console.log('error');
                }
            } catch (error) {
                console.log(error);
            }
        }
        setRole();
    }, [navigation]);

    const sendMessage = async () => {
        if (inputText) {
            scrollViewRef.current.scrollToEnd({ animated: true });
            addMessage(inputText, true);
            setInputText('');
            try {
                const response = await axios.post(server_url + 'ask',
                    {
                        text: inputText,
                        message_box: message_box
                    });
                const botReply = response.data.answer;
                setMessage_box(response.data.message_box)
                addMessage(botReply, false);
                scrollViewRef.current.scrollToEnd({ animated: true });

            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const addMessage = (text, isUser) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text, isUser },
        ]);
    };

    return (
        <KeyboardAvoidingView
            style={chat_style.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <ScrollView
                style={chat_style.chat_container}
                ref={scrollViewRef}
            >
                {messages.map((message, index) => (
                    <View key={index} style={message.isUser ? chat_style.user_message : chat_style.bot_message}>
                        <Text style={message.isUser ? chat_style.user_conversation : chat_style.bot_conversation}>{message.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={chat_style.input_container}>
                <TextInput
                    style={chat_style.input}
                    placeholder="메세지를 입력하세요"
                    value={inputText}
                    onChangeText={(text) => setInputText(text)}
                />
                <TouchableOpacity style={chat_style.send_btn}
                    onPress={sendMessage}>
                    <Image
                        source={require('../assets/icons/send.png')}
                        style={chat_style.icon_send}
                    />
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}
export default ChatScreen;
