import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { chat_style } from '../styles/CSS';

function ReChatScreen({ navigation, route }) {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [message_box, setMessage_box] = useState([]);

    const [obj_descript, setObj_descirpt] = useState('');
    const [user_id, setUser_id] = useState('');
    const [obj_name, setObj_name] = useState('');
    const [obj_nickname, setObj_nickname] = useState('');

    const server_url = route.params.server_url;
    const scrollViewRef = useRef(); // Ref for the ScrollView

    useEffect(() => {
        const server_url = route.params.server_url
        const data = route.params.item
        const obj_name = data.name
        const obj_nickname = data.nickname
        const user_id = data.userid
        const message = data.message_box
        const messages = data.messages

        setUser_id(user_id)
        setObj_name(obj_name)
        setObj_nickname(obj_nickname)

        axios
            .post(server_url + 'change_message', { message: message, messages: messages })
            .then((response) => {
                console.log(response.data.messages)
                setMessages(response.data.messages)

            })
            .catch((error) => {
                console.error(error);
            });

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

    }, [navigation]);

    const sendMessage = async () => {
        if (inputText) {
            scrollViewRef.current.scrollToEnd({ animated: true });
            addMessage(inputText, true);
            setInputText('');
            try {
                const response = await axios.post(server_url + 'ask',
                    {
                        user_id: user_id,
                        obj_name: obj_name,
                        obj_nickname: obj_nickname,
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
export default ReChatScreen;
