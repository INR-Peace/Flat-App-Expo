import React, {useEffect, useState} from "react";
import styled from 'styled-components/native';
import {
  Text,
  Switch,
  Button,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform, SafeAreaView, ScrollView
} from "react-native";
import LargeSquareInput from "../components/Input/LargeSquareInput";
import {ProfileImage} from "../components/ProfileImage";
import * as ImagePicker from 'expo-image-picker';

const ProfileView = styled.View`
  height: 150px;
  background-color: #101010;
  justify-content: center;
  align-items: center;
`;

const UserView = styled.View`
  height: 55px;
  background-color: #101010;
  padding: 3%;
  border-color: #8E8E8E;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
`;

const EditItemName = styled.Text`
  font-size: 18px;
  color: #ffffff;
`;

const IntroduceItemWrapper = styled.View`
  display: flex;
  height: 200px;
  background-color: #101010;
  padding: 3%;
  border-color: #8E8E8E;
  flex-direction: row;
  border-bottom-width: 1px;
  align-items: center;
  width: ${Dimensions.get('window').width}px;
  justify-content: space-between;
`;


export const ProfileEditPage =({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [image, setImage] = useState('');

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
            aspect: [1, 1],
            quality: 1,
        });



        if (!result.cancelled) {
            setImage(result.uri);
          console.log(result);
        }
    };

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "#101010"}}>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
          >
            <ProfileView>
              <TouchableOpacity onPress={pickImage}>
                <ProfileImage size={'LARGE'} imgURL={ image ? {uri: image} : require('../../assets/images/profileImage/ProfileImage.png')}/>
              </TouchableOpacity>
              <Text style={{color: 'white'}}>프로필 설정</Text>

            </ProfileView>
            <UserView>
              <EditItemName>로그인 정보</EditItemName>
              <EditItemName>innerpeace@gmail.com</EditItemName>
            </UserView>
            <IntroduceItemWrapper>
              <EditItemName>소개</EditItemName>
              <LargeSquareInput/>
            </IntroduceItemWrapper>
            <UserView>
              <EditItemName>알림 설정</EditItemName>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={ isEnabled ? "#1E90FF" : "#f4f3f4" }
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </UserView>
            <View style={{ alignItems:"center", justifyContent:"flex-end"}}>
              <Button color="#101010" title='로그아웃' onPress={()=>alert('로그아웃 되었습니다.!')}/>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
};
