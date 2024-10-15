import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { chat_style } from '../styles/CSS';

function ChatScreen({ navigation, route }) {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const scrollViewRef = useRef();
    const server_url = process.env.EXPO_PUBLIC_API_URL;

    const {
        obj_name,
        obj_nickname,
        mood,
        personal,
        user_id,
        img,
        obj_descript,
        like,
        dislike,
    } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: '채팅화면',
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

        const setRole = async () => {
            try {
                const response = await axios.post(`${server_url}set_role`, {
                    user_id,
                    obj_name,
                    obj_nickname,
                    mood,
                    personal,
                    obj_descript,
                    img,
                    like,
                    dislike,
                });

                if (response.status === 200) {
                    setMessages(response.data.message);
                } else {
                    console.error('Failed to set role');
                }
            } catch (error) {
                console.error('Error setting role:', error);
            }
        };
        setRole();
    }, [navigation, server_url, obj_name, obj_nickname, mood, personal, user_id, img, obj_descript, like, dislike]);

    const sendMessage = async () => {
        if (inputText) {
            addMessage(inputText, true);
            setInputText('');

            try {
                const response = await axios.post(`${server_url}ask`, {
                    user_id,
                    obj_name,
                    obj_nickname,
                    text: inputText,
                    messages,
                });

                const botReply = response.data.answer;
                setMessages(prev => [...prev, { text: botReply, isUser: false }]);
                scrollToBottom();
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const addMessage = (text, isUser) => {
        setMessages(prevMessages => [...prevMessages, { text, isUser }]);
        scrollToBottom();
    };

    const scrollToBottom = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    return (
        <KeyboardAvoidingView
            style={chat_style.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <ScrollView
                style={chat_style.chat_container}
                ref={scrollViewRef}
                contentContainerStyle={{ paddingBottom: 20 }} // 아래쪽 여백 추가
            >
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <View key={index} style={message.isUser ? chat_style.user_message : chat_style.bot_message}>
                            <Text style={message.isUser ? chat_style.user_conversation : chat_style.bot_conversation}>{message.text}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>메시지가 없습니다.</Text>
                )}
            </ScrollView>
            <View style={chat_style.input_container}>
                <TextInput
                    style={chat_style.input}
                    placeholder="메세지를 입력하세요"
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity style={chat_style.send_btn} onPress={sendMessage}>
                    <Image source={require('../assets/icons/send.png')} style={chat_style.icon_send} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default ChatScreen;
