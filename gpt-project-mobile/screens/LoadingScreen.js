import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const LoadingScreen = ({ }) => {

    return (
        <View style={splashStyle.loadingContainer}>
            <Text>로딩중입니다</Text>
        </View>
    );
};

const splashStyle = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7E506C',
    }
});

export default LoadingScreen;
