import * as React from 'react';
import styled  from 'styled-components/native';
import {useLayoutEffect} from "react";
import {AntDesign, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {SafeAreaView} from "react-native";


const PlayButtonWrapper = styled.Pressable`
      width: 222px;
      height: 222px;
      border-radius: 111px;
      border-width: 15px;
      border-color : #51CDDE;
      align-items: center;
      justify-content: center;
`;

export const MusicSheetPlayPage = ({ navigation }) => {
    const [play, setPlay] = React.useState(false);

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerTintColor: '#ffffff',
            headerLeft: ({onPress, tintColor}) => {
                return (
                    <MaterialCommunityIcons
                        name="keyboard-backspace"
                        size={30}
                        style={{marginLeft:11}}
                        color={tintColor}
                        onPress={onPress}
                    />
                );
            },
            headerRight: ({tintColor}) => (
                <AntDesign
                    name="check"
                    size={30}
                    style={{marginRight:11}}
                    color={tintColor}
                    onPress={()=> navigation.popToTop()}
                />
            ),
        });
    },[]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#101010", justifyContent: "center", alignItems: "center"}}>
            <PlayButtonWrapper onPress={()=> {setPlay(!play)}}>
                {play ?
                    <MaterialCommunityIcons name="pause" size={50} color="white" />
                    :
                    <MaterialCommunityIcons name="play" size={50} color="white" />
                }
            </PlayButtonWrapper>
        </SafeAreaView>
    );
}
