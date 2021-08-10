import React, {useLayoutEffect} from "react";
import { Dimensions, TouchableOpacity, FlatList, View, SafeAreaView, Text} from 'react-native';
import styled from 'styled-components/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Album} from "../components/Album";

const initialLayout = {width: Dimensions.get('window').width};

const RenderAlbumView = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 50%;
`;

const TitleWrapper = styled.View`
  justify-content: center;
  align-self: stretch;
  height: 50px;
  align-items: center;
  background-color: #101010;
  flex-direction: row;
`;

const FirstRoute = ({navigation}) => {

    const renderAlbum=({item})=>(
        <RenderAlbumView>
            <TouchableOpacity onPress={() => navigation.navigate('CommunityDetail')}>
                <View style={{alignItems: "center", marginVertical: 15}} index={item.id}>
                    <Album state="LIKE_LARGE" title={item.title} coverURL={item.coverURL} description={item.description}
                           time={item.time} artist={item.artist} isPublic={item.isPublic}/>
                </View>
            </TouchableOpacity>
        </RenderAlbumView>
    )
    return (
        <View style={{flex: 1, backgroundColor: "#101010"}}>
            <FlatList data={myAlbums}
                      renderItem={renderAlbum}
                      keyExtractor={(item) => item.id} //수정
                      style={{marginHorizontal: 20, marginTop: 20}}
                      numColumns={2}
            />
        </View>
    );
};

const SecondRoute = ({navigation}) => {
    const renderAlbum=({item})=>(
        <RenderAlbumView>
            <TouchableOpacity onPress={() => navigation.navigate('CommunityDetail')}>
                <View style={{alignItems: "center", marginVertical: 15}} index={item.id}>
                    <Album state="LIKE_LARGE" title={item.title} coverURL={item.coverURL} description={item.description}
                           time={item.time} artist={item.artist} liked={item.liked}/>
                </View>
            </TouchableOpacity>
        </RenderAlbumView>
    );

    return (
        <View style={{flex: 1, backgroundColor: "#101010"}}>
            <FlatList data={likedAlbums}
                      renderItem={renderAlbum}
                      keyExtractor={(item) => item.id} //수정
                      style={{marginHorizontal: 20, marginTop: 20}}
                      numColumns={2}
            />
        </View>
    );
};


export const PlayListPage =({navigation}) =>{
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'BGM'},
        {key: 'second', title: '스크랩'},
    ]);

    const renderScene=({route})=>{
       switch (route.key){
           case 'first':
               return <FirstRoute navigation={navigation}/>
           case 'second':
               return <SecondRoute navigation={navigation}/>
           default:
               return null;
       }
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#101010"}}>
            <TitleWrapper>
                <Text style={{fontSize: 20, color: "#ffffff"}}>이너피스의 플레이리스트</Text>
            </TitleWrapper>
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        style={{
                            padding: 0,
                            backgroundColor: '#101010',
                            fontSize: 10,
                        }}
                        indicatorStyle={{
                            backgroundColor: '#87F8FF',
                        }}
                    />
                )}
            />
        </SafeAreaView>
    );
};

const myAlbums = [
    {
        coverURL: require("../../assets/images/profileImage/profilePage1.png"),
        id: "1",
        title: 'INNERPEACE',
        description: '깔깔깔',
        time: '2:15',
        artist: '작곡가',
        liked: false,
        isPublic: true
    },
    {
        coverURL: require("../../assets/images/PlayListImage/playListImage2.jpg"),
        id: "2",
        title: '디즈니 OST 모음',
        description: '흐애애앵',
        time: '0:25',
        artist: '작곡가',
        liked: false,
        isPublic: true
    },
    {
        coverURL: require("../../assets/images/PlayListImage/playListImage3.jpg"),
        id: "3",
        title: '청량한 노래',
        state: 'LIKE_LARGE',
        description: '흐애애앵',
        time: '0:45',
        artist: '작곡가',
        liked: false,
        isPublic: true
    },
    {
        id: "4",
        coverURL: require("../../assets/images/EditListImage/EditListImage4.jpg"),
        title: '엘레강스한 노래',
        description: '뭘봐?',
        time: '0:15',
        artist:'작곡가',
        liked: false,
        isPublic: false
    },
    {
        id: "5",
        coverURL: require("../../assets/images/EditListImage/EditListImage5.jpg"),
        title: '멋쟁이 노래',
        description: '흐애애앵',
        time: '0:30',
        artist:'작곡가',
        liked: false,
        isPublic: false
    },
    {
        id: "6",
        coverURL: require("../../assets/images/EditListImage/EditListImage6.png"),
        title: '승희의 발라드',
        description: '흐애애앵',
        time: '0:33',
        artist:'작곡가',
        liked: false,
        isPublic: false
    },{
        id: "7",
        coverURL: require("../../assets/images/EditListImage/EditListImage7.jpg"),
        title: '부드러운 노래',
        description: '흐애애앵',
        time: '0:15',
        artist:'작곡가',
        liked: false,
        isPublic: false
    },{
        id: "8",
        coverURL: require("../../assets/images/EditListImage/EditListImage8.png"),
        title: 'land',
        description: '흐애애앵',
        time: '0:18',
        artist:'작곡가',
        liked: false,
        isPublic: false
    },
];

const likedAlbums = [
    {
        coverURL: require("../../assets/images/EditListImage/EditListImage7.jpg"),
        id: "1",
        title: '씨티팝',
        description: '깔깔깔',
        time: '2:15',
        artist: 'Soji',
        liked: true,
        isPublic: true
    },
    {
        coverURL: require("../../assets/images/EditListImage/EditListImage8.png"),
        id: "2",
        title: 'cute song',
        description: '흐애애앵',
        time: '1:20',
        artist: '보경',
        liked: true,
        isPublic: true
    },
    {
        coverURL: require("../../assets/images/profileImage/profilePage6.jpg"),
        id: "3",
        title: '무야호 Remix',
        state: 'LIKE_LARGE',
        description: '흐애애앵',
        time: '1:15',
        artist: '예진',
        liked: true,
        isPublic: true
    },
];
