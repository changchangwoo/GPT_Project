import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { list_style } from '../styles/CSS';
import axios from 'axios';

const ListScreen = ({ navigation, route }) => {
    const [server_url, setServer_url] = useState('');
    const [dataList, setDataList] = useState([]);
    const [user_id, setUser_id] = useState('');
    const [check_delete, setCheck_delete] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false); // Add forceUpdate state


    useEffect(() => {
        const user_id = route.params.user_id;
        const server_url = route.params.server_url;
        setServer_url(server_url);
        setUser_id(user_id);

        axios
            .post(server_url + 'get_list', { user_id: user_id })
            .then((response) => {
                console.log(response.data);
                setDataList(response.data);
            })
            .catch((error) => {
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
    }, [navigation, forceUpdate]);

    const handleItemPress = (item) => {
        const did = item.userid
        const dname = item.name
        const dnickname = item.nickname
        console.log(did, dname, dnickname)
        if (check_delete) {
            axios
                .post(server_url + 'delete_data', { user_id: did, name: dname, nickname: dnickname })
                .then((response) => {
                    console.log(response.data);
                    setForceUpdate(prevState => !prevState); // Toggle forceUpdate to trigger re-render

                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            navigation.navigate('ReChat', { item: item, server_url: server_url });
        }
    };

    const handle_main = () => {
        navigation.navigate('Main', { user_id, server_url: server_url });
    };

    const set_delete = () => {
        setCheck_delete(!check_delete);
    };

    return (
        <View style={list_style.container}>
            {dataList.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={list_style.list_container}
                    onPress={() => handleItemPress(item)}
                >
                    <View
                        style={[
                            list_style.contents_container,
                            check_delete && list_style.opacityReducedContainer,
                        ]}
                    >
                        {check_delete && (
                            <View style={list_style.delete_contents}>
                                <TouchableOpacity style={list_style.de}>

                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={list_style.left_container}>
                            <Image
                                style={list_style.circle}
                                source={{ uri: item.img }}
                            />
                        </View>
                        <View style={list_style.right_container}>
                            <View style={list_style.date_container}>
                                <Text style={list_style.data_text}>{item.date}</Text>
                            </View>
                            <View style={list_style.name_container}>
                                <Text style={list_style.name}>{item.nickname}</Text>
                                <Text style={list_style.type}>{item.name}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                style={list_style.add_container}
                onPress={handle_main}
            >
                <Text style={list_style.add_text}>새친구 만나기 +</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={list_style.delete_container}
                onPress={set_delete}
            >
                <Text style={list_style.delete_text}>대화내용 제거</Text>
            </TouchableOpacity>
            {
                check_delete && (
                    <Text style={list_style.delete_descript}>
                        삭제할 대화내용을 터치하세요
                    </Text>
                )
            }
        </View>
    );
};

export default ListScreen;
