import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

function ChatScreen({ navigation, route }) {
    const obj_data = route.params.obj_data;

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const sendMessage = async () => {
        if (inputText) {
            // 사용자 메시지를 추가
            addMessage(inputText, true);
            setInputText('');

            try {
                // 서버로 메시지를 보내고 응답을 받는 부분
                const response = await axios.post('http://172.29.51.21:5000/ask', { text: inputText });
                const botReply = response.data;
                // 봇의 응답을 추가
                addMessage(botReply, false);
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
        <View style={styles.container}>
            <Text style={{marginVertical: 50, textAlign: 'center'}}> 
        사물 : {obj_data.obj_name} {'\n'}
        별명 : {obj_data.obj_nickname}  {'\n'}
        기분 : {obj_data.mood}  {'\n'}
        성격 : {obj_data.personal}</Text>
            <ScrollView style={styles.chatContainer}>
                {messages.map((message, index) => (
                    <View key={index} style={message.isUser ? styles.userMessage : styles.botMessage}>
                        <Text>{message.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <TextInput
                style={styles.input}
                placeholder="Type a message..."
                value={inputText}
                onChangeText={(text) => setInputText(text)}
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    chatContainer: {
        flex: 1,
    },
    userMessage: {
        backgroundColor: 'lightblue',
        alignSelf: 'flex-start',
        margin: 8,
        padding: 8,
        borderRadius: 8,
    },
    botMessage: {
        backgroundColor: 'lightgreen',
        alignSelf: 'flex-end',
        margin: 8,
        padding: 8,
        borderRadius: 8,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 8,
    },
});

export default ChatScreen;
