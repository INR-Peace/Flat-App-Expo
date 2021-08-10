import React from 'react';
import { View, Animated } from 'react-native';
import AppLoading from "expo-app-loading";
import * as SplashScreen from 'expo-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation} from "./navigations/Stack/SignUpPageStack";

const AnimatedAppLoader = ({ children, image }) => {
    const [isSplashReady, setSplashReady] = React.useState(false);
    const startAsync = React.useMemo(() => () => [image]);
    const onFinish = React.useMemo(() => setSplashReady(true), []);

    if (!isSplashReady) {
        return (
            <AppLoading
                autoHideSplash={false}
                startAsync={startAsync}
                onError={console.error}
                onFinish={onFinish}
            />
        );
    }

    return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

const AnimatedSplashScreen = ({ children, image }) => {
    const animation = React.useMemo(() => new Animated.Value(1), []);
    const [isAppReady, setAppReady] = React.useState(false);
    const [isSplashAnimationComplete, setAnimationComplete] = React.useState(false);

    React.useEffect(() => {
        if (isAppReady) {
            Animated.timing(animation, {
                toValue: 10,
                duration: 3000,
                useNativeDriver: true,
            }).start(() => setAnimationComplete(true));
        }
    }, [isAppReady]);

    const onImageLoaded = React.useMemo(() => async () => {
        try {
            await SplashScreen.hideAsync();
            // Load stuff
            await Promise.all([]);
        } catch (e) {
            // handle errors
        } finally {
            setAppReady(true);
        }
    });

    return (
        <View style={{ flex: 1 }}>
            {isAppReady && children}
            {!isSplashAnimationComplete && (
                <Animated.View
                    pointerEvents="none"
                >
                    <Animated.Image
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain",
                        }}
                        source={image}
                        onLoadEnd={onImageLoaded}
                        fadeDuration={0}
                    />
                </Animated.View>
            )}
        </View>
    );
}

const MainScreen = () =>{
    return (
        <NavigationContainer>
            <StackNavigation/>
        </NavigationContainer>
    );
}


const App = () => {
    return (
        <AnimatedAppLoader image={require("../assets/images/flat_splash_4x.png")} >
            <MainScreen />
        </AnimatedAppLoader>
    );
};

export default App;
