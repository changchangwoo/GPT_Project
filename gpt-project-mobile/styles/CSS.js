import { StyleSheet } from "react-native";

export const intro_style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B8A8C4',
    },
    top_container:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '40%',
    },
    middle_container:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
    },
    low_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '20%',
    },
    logo: {
        marginTop: 100,
        fontSize: 45,
        fontFamily: 'FONT_BOLD'
    },
    logo_descript : {

        fontSize: 18,
        fontFamily: 'FONT_LIGHT',
        textAlign: 'center'

    },
    start_btn : {
        width: '70%',
        height: '30%',
        backgroundColor: '#E6E6FA',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginBottom: 40
    },
    start_text: {
        fontFamily: 'FONT_LIGHT',
        fontSize: 17
    },
    intro_image: {
        width: '100%',
        height: '100%'
    }
});

export const main_style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B8A8C4',
    },
    nav_container:{
        width: '100%',
        height: '10%',
    },
    contents_container:{
        width:'100%',
        height:'100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img_container: {
        width: '80%',
        height: '40%',
        backgroundColor: '#E6E6FA',
        borderRadius: 50, // 반원을 만들기 위해 반지름으로 설정
    },
    button_container : {
        width: '100%',
        height: '50%',
        padding: '5%'
    },
    camera_button : {
        width: '100%',
        height: '20%',
        backgroundColor: '#B8A8C4',
        borderRadius: 20,
        justifyContent: 'center',

        marginBottom: 20
    },
    camera_button_text: {
        textAlign: 'center',
        fontFamily: 'FONT_LIGHT',
        fontSize: 15
    },
    set_chat_button: {
        width: '100%',
        height: '40%',
        backgroundColor: '#916D8A',
        borderRadius: 20,
        justifyContent: 'center',

    },
    set_chat_button_text : {
        
        textAlign: 'center',
        fontFamily: 'FONT_BOLD',
        fontSize: 30

    }

});
