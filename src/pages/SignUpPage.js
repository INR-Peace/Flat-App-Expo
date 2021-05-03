import React, {useRef, useState} from "react";
import styled from 'styled-components/native';
import IdInput from "../components/Input/IdInput";
import {Image} from "react-native";
import {RoundButton} from "../components/RoundButton";

const RegisterView = styled.View`
  height: 300px;
  justify-content: center;
  align-items: center;
  background-color: #101010;
`;
const LogoView = styled.View`
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: #101010;
`;
const ParentContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #101010;
  justify-content: center;
  align-items: center;
`;

export const SignUpPage =({ navigation }) => {

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck]=useState('');
    const [nickName, setNickName]=useState('');

    const refId = useRef(null);
    const refPw = useRef(null);
    const refIdCheck = useRef(null);
    const refNick = useRef(null);

    const validateEmail = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if(!email){
            return '';
        }
        else if(expression.test(String(email).toLowerCase())){
            return '유효한 이메일';
        } else{
            return '유효하지 않은 이메일';
        }
    };
    const validatePw = (pw) => {
        const expression = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
        if(expression.test(String(pw).toLowerCase())){
            return '유효한 비밀번호';
        } else{
            return '유효하지 않은 비밀번호';
        }
    };
    const validatePwCheck = (pwCheck) => {
        if(pw===pwCheck){
            return '';
        } else{
            return '비밀번호 불일치';
        }
    };

    return (
        <ParentContainer>
            <LogoView>
                <Image source={require('../../assets/images/logo.png')}/>
            </LogoView>
            <RegisterView>
                <IdInput name={'email-outline'} state="Email" setValue={setEmail}
                         type="email" line='이메일' keyType="next" refName={refId} nextRef={refPw}
                         onChangeText={(e) =>setEmail(e)} description={validateEmail(email)}/>
                <IdInput name={'lock'} value={pw} state="Pw" line='비밀번호' setValue={setPw}
                         keyType="next" refName={refPw} nextRef={refIdCheck} hide={true}
                         onChangeText={(e) =>setPw(e)}
                         description={validatePw(pw)}/>
                <IdInput name={'check-circle-outline'} value={pwCheck} state="PwCheck" setValue={setPwCheck}
                         line='비밀번호 확인' keyType="next" refName={refIdCheck} nextRef={refNick} hide={true}
                         onChangeText={(e) =>setPwCheck(e)}
                         description={validatePwCheck(pwCheck)}/>
                <IdInput name={'emoticon-happy-outline'} value={nickName} line='닉네임' refName={refNick} nextRef={null}
                         setValue={setNickName} />
            </RegisterView>
            <RoundButton state="COLOR_SMALL" name="가입하기" pageName="LoginPage" nav={navigation}/>
        </ParentContainer>
    );
};
