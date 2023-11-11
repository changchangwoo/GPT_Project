import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    font_size_large: 32, // 타이틀
    font_size_medium: 18, // 본문
    font_size_small: 16, // 캡션
})

export const intro_style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEFEFE',
    },
    top_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '40%',
    },
    middle_container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '40%',
        justifyContent: 'center'
    },
    low_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '20%',
        paddingLeft: 20,
        paddingRight: 20
    },
    logo: {
        fontSize: style.font_size_large,
        fontFamily: 'NEXON_MEDIUM',
        marginTop: 50
    },
    logo_descript: {
        fontSize: style.font_size_medium,
        fontFamily: 'NEXON_LIGHT',
        textAlign: 'center',
        marginTop: 20
    },
    start_btn: {
        width: '100%',
        height: 40,
        backgroundColor: '#7E506C',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 20
    },
    register_btn: {
        width: '100%',
        height: 40,
        backgroundColor: '#B8A8C4',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 20
    },
    start_text: {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_medium,
        color: 'white'
    },
    intro_image: {
        width: '100%',
        height: '100%',
        marginTop: 100,
        resizeMode: 'contain', // 이미지 비율 유지
    }
});

export const main_style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
    },
    top_container: {
        width: '100%',
        height: '25%',
        alignItems: 'center',
    },
    logo: {
        fontSize: style.font_size_large,
        fontFamily: 'NEXON_MEDIUM',
        marginTop: 30
    },
    logo_descript: {
        fontSize: style.font_size_medium,
        fontFamily: 'NEXON_LIGHT',
        textAlign: 'center',
        marginTop: 20
    },
    main_container: {
        width: '100%',
        height: '30%',
        borderRadius: 10,
        backgroundColor: '#F5ECF9',
        elevation: 5, // Android에서 그림자를 추가할 때 사용
        shadowColor: 'black', // iOS에서 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자의 위치 (가로, 세로)
        shadowOpacity: 0.2, // 그림자의 투명도
        shadowRadius: 4, // 그림자의 반

    },
    main_image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // 이미지 비율 유지
    },
    low_container: {
        width: '100%',
        height: '45%',
        padding: 20,
        paddingTop: 30
    },
    btn: {
        width: '100%',
        height: 40,
        backgroundColor: '#B8A8C4',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
    },
    start_text: {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_medium,
        color: 'white',
        textAlign: 'center',
    },
    recognize_btn: {
        width: '100%',
        height: 120,
        backgroundColor: '#7E506C',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 20
    },
    icon_camera: {
        width: 26,
        height: 26,
        justifyContent: 'center',
        left: 38
    },
    icon_gallery: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        left: 30
    }
});
export const profile_style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
    },
    top_container: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
    },
    circleView: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#F5ECF9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    logo: {
        fontSize: style.font_size_large,
        fontFamily: 'NEXON_MEDIUM',
        marginTop: 20
    },
    logo_descript: {
        fontSize: style.font_size_medium,
        fontFamily: 'NEXON_LIGHT',
        textAlign: 'center',
        marginTop: 5
    },

    middle_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    personal_box: {
        width: '30%',
        height: 30,
        backgroundColor: '#F5ECF9',
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        justifyContent: 'center',
    },
    like_box : {
        width: '100%',
        height: '10%',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row'
    },
    like_left : {
        width: '15%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    like_text : {
        fontSize: style.font_size_small,
        fontFamily: 'NEXON_LIGHT',
    },
    like_right : {
        width: '85%',
        height: '100%',
        flexDirection: 'row'

    },
    like : {
        width: '20%',
        backgroundColor: 'white',
        marginLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        alignItems: 'center',
        justifyContent: 'center'
    },
    like_descript : {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_small-4
    },
    personal_text: {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_small,
        color: 'black',
        textAlign: 'center',
    },
    low_container: {
        width: '100%',
        height: '40%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginTop: 20,
        padding: 20
    },
    text_box: {
        width: '100%',
        height: '60%',
        marginTop: 10
    },
    text_descript: {
        color: 'black',
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_small,
        textAlign: 'center'
    },
    start_btn: {
        width: '100%',
        height: 40,
        backgroundColor: '#7E506C',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    start_text: {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_medium,
        color: 'white',
        textAlign: 'center',
    },
    loading_image: {
        width: 300,
        height: 300,
        resizeMode: 'contain', // 이미지 비율 유지
    },
    loading_container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    loading_text: {
        marginTop: 70,
        fontSize: style.font_size_medium,
        fontFamily: 'NEXON_LIGHT',
        textAlign: 'center'
    }

})

export const chat_style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
    },
    chat_container: {
        width: '100%',
        height: '90%',
        flex: 1,
    },
    user_conversation: {
        color: 'white',
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_small

    },
    bot_conversation: {
        color: 'black',
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_small
    },
    user_message: {
        backgroundColor: '#7E506C',
        alignSelf: 'flex-end',
        margin: 5,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 8,
        fontFamily: 'NEXON_LIGHT',
        color: 'white'
    },
    bot_message: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        margin: 5,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 8,
        fontFamily: 'NEXON_LIGHT',
        color: 'black',
        borderWidth: 1,
        borderColor: 'grey'
    },
    input: {
        height: 50,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 8,
        fontSize: style.font_size_medium,
        fontFamily: 'NEXON_LIGHT',
        padding: 10
    },
    input_container: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 20,
    },
    send_btn: {
        width: '20%',
        height: 50,
        borderRadius: 20,
        backgroundColor: '#7E506C',
        marginHorizontal: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon_send: {
        width: 32,
        height: 32,
        justifyContent: 'center',
    },
})

export const login_style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F7F7',
        paddingLeft: 20,
        paddingRight: 20
    },
    logo: {
        fontSize: style.font_size_large,
        fontFamily: 'NEXON_MEDIUM',
        bottom: 30
    },
    input_container: {
        width: '100%',
        height: '40%',
        borderRadius: 20,
        backgroundColor: '#F5ECF9',
        elevation: 5, // Android에서 그림자를 추가할 때 사용
        shadowColor: 'black', // iOS에서 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자의 위치 (가로, 세로)
        shadowOpacity: 0.2, // 그림자의 투명도
        shadowRadius: 4, // 그림자의 반
        padding: 20
    },
    text_input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_small,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#CCCCCC'
    },
    start_btn: {
        width: '100%',
        height: 40,
        backgroundColor: '#7E506C',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 40
    },
    start_text: {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_medium,
        color: 'white',
        textAlign: 'center',
    },
    select_container: {
        width: '100%',
        height: 40,
        marginVertical: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        marginTop: 50

    },
    login_select: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#F5ECF9',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    register_select: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#F5ECF9',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    select_text: {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_medium,
        color: 'black',
        textAlign: 'center',
    },

})

export const list_style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
    },
    list_container: {
        width: '100%',
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    contents_container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row'
    },
    scroll_container : {
        width: '100%',
        height: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    opacityReducedContainer: {
        opacity: 0.3, // 원하는 값을 사용하세요.

    },
    button_container : {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '30%',

    },
    
    delete_button: {
        height: '100%',
        backgroundColor: 'yellow',

        zIndex: 1
    }
    ,
    circle: {
        width: 55,
        height: 55,
        borderRadius: 70,
        backgroundColor: 'gray',
    },
    left_container: {
        width: '30%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    right_container: {
        width: '70%',
        height: '100%',
        paddingRight: 10,
        paddingTop: 5

    },
    date_container: {
        width: '100%',
        height: '20%',
        alignItems: 'flex-end',
        top: 10
    },
    data_text: {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_small,
        textAlign: 'right',
        color: 'grey'
    },
    name_container: {
        width: '100%',
        height: '70%',

    },
    name: {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_medium,
    },
    type: {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_small,
        color: 'grey'
    },
    add_container: {
        marginTop: 20,
        borderRadius: 10,
        width: '80%',
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        justifyContent: 'center'
    },
    add_text: {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_medium
    },
    delete_container: {
        marginTop: 20,
        borderRadius: 10,
        width: '80%',
        height: 40,
        backgroundColor: '#7E506C',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        justifyContent: 'center'
    },
    delete_text: {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_small,
        color: 'white'
    },
    delete_descript: {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_small,
        marginTop: 10
    }


});