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
        height: '45%',
        alignItems: 'center',
    },
    circleView: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: '#F5ECF9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },

    circleText: {
        fontSize: 20,
        color: 'white',
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
        marginTop: 5
    },

    middle_container: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    personal_box: {
        width: '30%',
        height: 30,
        backgroundColor: '#F5ECF9',
        marginHorizontal: 20,
        marginTop: 30,
        borderRadius: 10,
        justifyContent: 'center',

    },
    personal_text: {
        fontFamily: 'NEXON_LIGHT',
        fontSize: style.font_size_small,
        color: 'black',
        textAlign: 'center',
    },
    low_container: {
        width: '100%',
        height: '50%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#B8A8C4',
        marginTop: 20,
        padding: 20
    },
    text_box: {
        width: '100%',
        height: '60%',
        marginTop: 10
    },
    text_descript: {
        color: 'white',
        fontFamily: 'NEXON_MEDIUM',
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