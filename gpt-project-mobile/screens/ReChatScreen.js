import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { chat_style } from '../styles/CSS';

function ReChatScreen({ navigation, route }) {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const server_url = process.env.EXPO_PUBLIC_API_URL;

    const scrollViewRef = useRef();

    const { item } = route.params;
    const { name: obj_name, nickname: obj_nickname, userid: user_id, message_box, messages: initialMessages } = item;

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

        const fetchMessages = async () => {
            try {
                const response = await axios.post(`${server_url}change_message`, { message: message_box, messages: initialMessages });
                setMessages(response.data.messages);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMessages();
    }, [navigation, server_url, message_box, initialMessages]);

    const sendMessage = async () => {
        if (inputText) {
            scrollViewRef.current.scrollToEnd({ animated: true });
            addMessage(inputText, true);
            setInputText('');

            try {
                const response = await axios.post(`${server_url}ask`, {
                    user_id,
                    obj_name,
                    obj_nickname,
                    text: inputText,
                    message_box,
                    messages,
                });

                addMessage(response.data.answer, false);
                scrollViewRef.current.scrollToEnd({ animated: true });
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const addMessage = (text, isUser) => {
        setMessages(prevMessages => [...prevMessages, { text, isUser }]);
    };

    return (
        <KeyboardAvoidingView style={chat_style.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <ScrollView style={chat_style.chat_container} ref={scrollViewRef}>
                {messages.map((message, index) => (
                    <View key={index} style={message.isUser ? chat_style.user_message : chat_style.bot_message}>
                        <Text style={message.isUser ? chat_style.user_conversation : chat_style.bot_conversation}>
                            {message.text}
                        </Text>
                    </View>
                ))}
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

export default ReChatScreen;
