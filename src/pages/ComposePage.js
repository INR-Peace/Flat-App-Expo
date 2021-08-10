import React from "react";
import styled from 'styled-components/native';
import {RoundButton} from "../components/Button/RoundButton";
import {SafeAreaView} from "react-native";

const ButtonWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #101010;
`;

export const ComposePage = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#101010"}}>
            <ButtonWrapper>
                <RoundButton state="GRAD_LARGE" name="녹음하기" pageName="RecordPage" nav={navigation}/>
                <RoundButton state="GRAD_LARGE" name="악보 불러오기" pageName="SheetUploadPage" nav={navigation}/>
            </ButtonWrapper>
        </SafeAreaView>
    );
};
