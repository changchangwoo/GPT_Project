import { View, Text, TouchableOpacity, Image } from 'react-native';
import { intro_style } from '../styles/CSS';


const IntroScreen = ({ navigation }) => {

    const handle_anonymous = () => {
        navigation.navigate('Main');
    }
    const handle_login = () => {
        navigation.navigate('Login');
    }


    return (
        <View style={intro_style.container}>
            <View style={intro_style.top_container}>
                <Image
                    source={require('../assets/imgs/intro_image.png')}
                    style={intro_style.intro_image}
                />
            </View>
            <View style={intro_style.middle_container}>
                <Text style={intro_style.logo}>
                    작은 친구들
                </Text>
                <Text style={intro_style.logo_descript}>
                    그동안 내가 놓치고 있었던{'\n'}
                    작은 목소리에 귀를 기울여보세요
                </Text>
            </View>
            <View style={intro_style.low_container}>
                <TouchableOpacity style={intro_style.start_btn}
                    onPress={handle_login}>
                    <Text style={intro_style.start_text}>시작하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={intro_style.register_btn}
                    onPress={handle_anonymous}>
                    <Text style={intro_style.start_text}>비회원으로 시작하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default IntroScreen;
