import React from "react";
import styled from 'styled-components/native';
import {FlatList, Text, TouchableOpacity, View, Button, SafeAreaView} from "react-native";
import {Album} from "../components/Album";
import {ProfileImage} from "../components/ProfileImage";


const ProfileView = styled.View`
  flex: 2;
  padding: 20px 10px 10px 10px;
  
`;

const AlbumInfoView = styled.View`
  flex: 3;
  padding: 0 10px 0 10px;
  justify-content: center;
`;

const AlbumWrapper = styled.View`
  padding-right: 8px;
  margin-top: 10px;  
  align-items: center;
  flex: 1;
`;

const ProfileItemName = styled.Text`
  font-size: 20px;
  color: #ffffff;
`;

//받아와야할 것, UserName, Image, introduce, 공개 허용한 곡의 정보, 좋아요 등록한 곡의 정보
export const ProfilePage = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#101010", justifyContent: "center"}}>
            <ProfileView>
                <ProfileItemName>이너피스</ProfileItemName>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <ProfileImage size={'MEDIUM'} imgURL={require('../../assets/images/profileImage/ProfileImage.png')}/>
                    <View style={{padding: 10, justifyContent: "center", flex: 1}}>
                        <Text style={{color: '#ffffff', padding: 5}}>이제 작곡에 입문한 병아리 작곡가 입니다. {"\n"}피드백 환영합니다!</Text>
                        <View style={{width: 85, borderWidth: 1.5, borderColor: 'white', borderRadius: 3}}>
                            <Button
                                onPress={() => navigation.navigate('Setting')} title={"프로필편집"} color='#101010'/>
                        </View>
                    </View>
                </View>
            </ProfileView>

            <AlbumInfoView>
                <ProfileItemName>공개 허용한 곡</ProfileItemName>
                <FlatList
                    data={myAlbums}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity>
                                <AlbumWrapper>
                                    <Album title={item.title} state={item.state} description={item.description}
                                           coverURL={item.coverURL} isPublic={true}/>
                                </AlbumWrapper>
                            </TouchableOpacity>
                        );
                    }}
                />
            </AlbumInfoView>
            <AlbumInfoView>
                <ProfileItemName>스크랩한 곡</ProfileItemName>
                <FlatList
                    data={scrapedAlbums}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity>
                                <AlbumWrapper>
                                    <Album title={item.title} state={item.state} description={item.description}
                                           liked={true} coverURL={item.coverURL}/>
                                </AlbumWrapper>
                            </TouchableOpacity>
                        );
                    }}
                />
            </AlbumInfoView>
        </SafeAreaView>
    );
};

const myAlbums = [
    {
        coverURL: require("../../assets/images/profileImage/profilePage1.png"),
        id: "1",
        title: 'INNERPEACE',
        state: 'LIKE_SMALL',
        description: '깔깔깔',
        time: '2:15',
        artist: '작곡가',
        isPublic: false
    },
    {
        coverURL: require("../../assets/images/PlayListImage/playListImage2.jpg"),
        id: "2",
        title: '디즈니 OST 모음',
        state: 'LIKE_SMALL',
        description: '흐애애앵',
        time: '1:20',
        artist: '작곡가',
        isPublic: false
    },
    {
        coverURL: require("../../assets/images/PlayListImage/playListImage3.jpg"),
        id: "3",
        title: '청량한 노래',
        state: 'LIKE_SMALL',
        description: '슬퍼!',
        time: '1:20',
        artist: '작곡가',
        isPublic: false
    },
];

const scrapedAlbums = [
    {
        coverURL: require("../../assets/images/EditListImage/EditListImage7.jpg"),
        id: "1",
        title: '씨티팝',
        state: 'LIKE_SMALL',
        description: '깔깔깔',
        time: '1:20',
        artist: '보경',
        liked: true
    },
    {
        coverURL: require("../../assets/images/EditListImage/EditListImage8.png"),
        id: "2",
        title: 'cute song',
        state: 'LIKE_SMALL',
        description: '흐애애앵',
        time: '1:20',
        artist: '보경',
        liked: true
    },
    {
        coverURL: require("../../assets/images/profileImage/profilePage6.jpg"),
        id: "3",
        title: '무야호 Remix',
        state: 'LIKE_SMALL',
        description: '슬퍼!',
        time: '1:20',
        artist: '보경',
        liked: true
    },
];
