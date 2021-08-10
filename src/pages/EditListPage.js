import React from "react";
import styled from 'styled-components/native';
import {FlatList, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Album} from "../components/Album";

const TitleWrapper = styled.View`
  height: 50px;
  align-items: center;
  background-color: #101010;
  flex-direction: row;
  padding-left: 3%;
  margin: 2% 4% 2% 4%;
`;

export const EditListPage = ({navigation}) => {
    const renderAlbum = ({item}) => (
        <View style={{flexDirection: "row", margin: 3, paddingBottom: 6}}>
            <TouchableOpacity onPress={() => navigation.navigate('EditPage')}>
                <View style={{paddingLeft: 5}}>
                    <Album state={'PLAY_SMALL'} coverURL={item.coverURL} artist={item.artist} liked={item.liked}
                           title={item.title} time={item.time}/>
                </View>
            </TouchableOpacity>
        </View>
    )
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#101010"}}>
            <TitleWrapper>
                <Text style={{fontSize: 30, color: "#ffffff"}}>My Songs</Text>
            </TitleWrapper>
            <View style={{flex: 1, marginHorizontal: 15, marginVertical: 10}}>
                <FlatList data={albums}
                          renderItem={renderAlbum}
                          keyExtractor={(item) => item.id}/>
            </View>
        </SafeAreaView>
    );
};

const albums = [
    {
        id: "1",
        coverURL: require("../../assets/images/profileImage/profilePage1.png"),
        title: 'INNERPEACE',
        artist: '작곡가',
        time: '2:15',
    },
    {
        id: "2",
        coverURL: require("../../assets/images/PlayListImage/playListImage2.jpg"),
        title: '디즈니 OST 모음',
        description: '흐애애앵',
        time: '0:25',
        artist: '작곡가',
    },
    {
        id: "3",
        coverURL: require("../../assets/images/PlayListImage/playListImage3.jpg"),
        title: '청량한 노래',
        description: '슬퍼!',
        time: '0:45',
        artist: '작곡가',
    },
    {
        id: "4",
        coverURL: require("../../assets/images/EditListImage/EditListImage4.jpg"),
        title: '엘레강스한 노래',
        description: '뭘봐?',
        time: '0:15',
        artist: '작곡가',
    },
    {
        id: "5",
        coverURL: require("../../assets/images/EditListImage/EditListImage5.jpg"),
        title: '멋쟁이 노래',
        description: '흐애애앵',
        time: '0:30',
        artist: '작곡가',
    },
    {
        id: "6",
        coverURL: require("../../assets/images/EditListImage/EditListImage6.png"),
        title: '승희의 발라드',
        description: '흐애애앵',
        time: '0:33',
        artist: '작곡가',
    }, {
        id: "7",
        coverURL: require("../../assets/images/EditListImage/EditListImage7.jpg"),
        title: '부드러운 노래',
        description: '흐애애앵',
        time: '0:15',
        artist: '작곡가',
    }, {
        id: "8",
        coverURL: require("../../assets/images/EditListImage/EditListImage8.png"),
        title: 'land',
        description: '흐애애앵',
        time: '0:18',
        artist: '작곡가',
    },
];
