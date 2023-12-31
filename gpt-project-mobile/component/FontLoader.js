// FontLoader.js

import React, { useEffect, useState } from 'react';
import LoadingScreen from '../screens/LoadingScreen';
import * as Font from 'expo-font';

const FontLoader = ({ children }) => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadCustomFont() {
            await Font.loadAsync({
                'FONT_LIGHT': require('../assets/fonts/NotoSansKR-Light.ttf'),
                'FONT_MEDIUM': require('../assets/fonts/NotoSansKR-Medium.ttf'),
                'FONT_BOLD': require('../assets/fonts/NotoSansKR-Bold.ttf'),
                'NEXON_LIGHT': require('../assets/fonts/NEXON-Lv2-Gothic-Light.ttf'),
                'NEXON_MEDIUM': require('../assets/fonts/NEXON-Lv2-Gothic-Medium.ttf'),
                'NEXON_BOLD': require('../assets/fonts/NEXON-Lv2-Gothic-Bold.ttf')
            });
            setFontLoaded(true);
        }

        loadCustomFont();
    }, []);

    if (!fontLoaded) {
        return <LoadingScreen />
    }

    return <>{children}</>
};

export default FontLoader;
