import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { list_style, style } from '../styles/CSS';
import axios from 'axios';

const ListScreen = ({ navigation, route }) => {
    const [server_url, setServer_url] = useState('');
    const [dataList, setDataList] = useState([]);
    const [user_id, setUser_id] = useState('');

    useEffect(() => {
        const user_id = route.params.user_id;
        const server_url = route.params.server_url;
        setServer_url(server_url);
        setUser_id(user_id)

        axios.post(server_url + 'get_list', { user_id: user_id })
            .then(response => {
                console.log(response.data);
                setDataList(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        navigation.setOptions({
            title: '대화정보',
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

    const handleItemPress = (item) => {
        console.log(item); // 아이템의 모든 값을 출력하거나 원하는 작업을 수행합니다.
    };

    const handle_main = () => {
        navigation.navigate('Main', { user_id, server_url: server_url });
    };

    return (
        <View style={list_style.container}>
            {dataList.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={list_style.list_container}
                    onPress={() => handleItemPress(item)}
                >
                    <View style={list_style.left_container}>
                        <View style={list_style.circle} />
                    </View>
                    <View style={list_style.right_container}>
                        <View style={list_style.date_container}>
                            <Text style={list_style.data_text}>
                                {item.date}
                            </Text>
                        </View>
                        <View style={list_style.name_container}>
                            <Text style={list_style.name}>
                                {item.nickname}
                            </Text>
                            <Text style={list_style.type}>
                                {item.name}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                style={list_style.add_container}
                onPress={handle_main}
            >
                <Text style={list_style.add_text}>
                    새친구 만나기 +
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ListScreen;
