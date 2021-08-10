import * as React from 'react';
import styled from 'styled-components/native';
import {useEffect, useLayoutEffect, useState} from "react";
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {Image, Platform, SafeAreaView} from "react-native";


const ImageButtonContainer = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const SheetUploadPage = ({navigation}) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: '#ffffff',

            headerLeft: ({onPress, tintColor}) => {
                return (
                    <MaterialCommunityIcons
                        name="keyboard-backspace"
                        size={30}
                        style={{marginLeft: 11}}
                        color={tintColor}
                        onPress={onPress}
                    />
                );
            },
            headerRight: ({tintColor}) => (
                <AntDesign
                    name="check"
                    size={30}
                    style={{marginRight: 11}}
                    color={tintColor}
                    onPress={() => navigation.navigate("MusicSheetPlayPage")}
                />
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#101010", justifyContent: "center", alignItems: "center"}}>
            <ImageButtonContainer onPress={pickImage}>
                <Image source={image ? { uri: image } : require('../../assets/images/photo.jpg')} style={{width: "100%", height: "100%"}}/>
            </ImageButtonContainer>
        </SafeAreaView>
    );
};

export default SheetUploadPage;
