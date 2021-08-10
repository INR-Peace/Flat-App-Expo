import React, {useRef} from "react";
import styled from 'styled-components/native';
import UnderLineInput from "../components/Input/UnderLineInput";
import {RoundButton} from "../components/Button/RoundButton";
import {Dimensions, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View} from "react-native";
import {StyleSheet} from "react-native";

const LogoView = styled.View`
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
  background-color: #101010;
`;

const LoginView = styled.View`
  align-items: center;
  justify-content: center;
`;

const styles = StyleSheet.create({
    center: {
        height: Dimensions.get('window').height,
    },
});

export const LoginPage =({ navigation }) => {
    const refId = useRef(null);
    const refPw = useRef(null);

    return (
      <View style={{flex: 1, backgroundColor: "#101010", justifyContent: "center"}}>
          <ScrollView contentContainerStyle={styles.center} >
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 , alignItems: "center", justifyContent:"center"}}
              >
                  <LogoView>
                      <Image source={require('../../assets/images/flat_logo_4x.png')} resizeMode="center" style={{width: 150, height: 120}}/>
                  </LogoView>
                  <LoginView>
                      <UnderLineInput name="account-outline" state="Login" line='이메일' keyType="next" refName={refId} nextRef={refPw} icon={true}/>
                      <UnderLineInput name="lock" state="Login" line='비밀번호' keyType="done" refName={refPw} nextRef={null} hide={true} icon={true}/>
                      <RoundButton state="COLOR_SMALL" name="로그인" pageName="HomeTab" nav={navigation}/>
                      <RoundButton state="GRAY_SMALL" name="회원가입" pageName="SignUpPage" nav={navigation}/>
                      <Text style={{color:'#ffffff', marginTop:10}}>구글 계정으로 로그인</Text>
                  </LoginView>
              </KeyboardAvoidingView>
          </ScrollView>
      </View>
    );
};
