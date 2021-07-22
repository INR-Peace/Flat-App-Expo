import React, {useRef} from "react";
import styled from 'styled-components/native';
import UnderLineInput from "../components/Input/UnderLineInput";
import {RoundButton} from "../components/Button/RoundButton";
import {Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, Text} from "react-native";
import {StyleSheet} from "react-native";

const Container = styled.View`
  flex:1;
  background-color: #101010;

`;
const LogoView = styled.View`
  height: 100px;
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
        alignItems: 'center',
        backgroundColor: '#101010',
        justifyContent:'center',
        alignContent:'center',
        height:Dimensions.get('window').height,
    },
});


export const LoginPage =({ navigation }) => {
    const refId = useRef(null);
    const refPw = useRef(null);

    return (
        <Container>
            <ScrollView contentContainerStyle={styles.center} >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={{ flex: 1 , alignItems: "center", justifyContent:"center"}}
                >
                    <LogoView>
                        <Image source={require('../../assets/images/logo.png')}/>
                    </LogoView>
                    <LoginView>
                        <UnderLineInput name="account-outline" state="Login" keyType="next" refName={refId} nextRef={refPw} icon={true}/>
                        <UnderLineInput name="lock" state="Login" keyType="done" refName={refPw} nextRef={null} hide={true} icon={true}/>
                        <RoundButton state="COLOR_SMALL" name="로그인" pageName="HomeTab" nav={navigation}/>
                        <RoundButton state="GRAY_SMALL" name="회원가입" pageName="SignUpPage" nav={navigation}/>
                        <Text style={{color:'#ffffff', marginTop:10}}>구글 계정으로 로그인</Text>
                    </LoginView>
                </KeyboardAvoidingView>
            </ScrollView>
        </Container>

    );
};
