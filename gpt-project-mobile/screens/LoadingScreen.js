import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const LoadingScreen = ({ }) => {

    return (
        <View style={splashStyle.loadingContainer}>
            <Text>기달</Text>
        </View>
    );
};

const splashStyle = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBE3F0',
    }
});

export default LoadingScreen;
