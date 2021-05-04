import React from "react";
import styled from 'styled-components/native';
import Logo from "../components/Logo";
import { FlatList, TouchableOpacity } from "react-native";
import { Album } from "../components/Album";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  margin: ${props => props.index%2 === 1 ? "20% 0 0 5%" : "20% 5% 0 0"};
`;

const ParentContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #101010;
`;

const StyledView=styled.View`
  flex-direction: row;
  justify-content: center;
  width: 50%;
`;

export const CommunityPage =({ navigation }) => {
    const renderAlbum=({item})=>(
        <StyledView>
            <TouchableOpacity onPress={() => navigation.navigate('CommunityDetail')}>
                <Container index={item.id}>
                    <Album state="LIKE_LARGE" title={item.title} description={item.description} time={item.time} artist={item.artist} liked={item.liked}
                    coverURL='https://rereco.co/wp-content/uploads/2021/02/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA-2021-02-03-%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE-4.55.06.jpg'
                    />
                </Container>
            </TouchableOpacity>
        </StyledView>
    );

    return (
        <ParentContainer>
            <FlatList data={albums}
                renderItem={renderAlbum}
                      keyExtractor={(item)=> item.id} //수정
                      numColumns={2}
            />
        </ParentContainer>
    );
};

const albums = [
    {
        id: "1",
        title: '조이',
        description: '깔깔깔',
        time: '1:20',
        artist:'보경',
        liked: true
    },
    {
        id: "2",
        title: '슬픔이',
        description: '흐애애앵',
        time: '1:20',
        artist:'보경',
        liked: true
    },
    {
        id: "3",
        title: '소심이',
        description: '슬퍼!',
        time: '1:20',
        artist:'보경',
        liked: true
    },
    {
        id: "4",
        title: 'Hello',
        description: '뭘봐?',
        time: '1:20',
        artist:'보경',
        liked: true
    },
    {
        id: "5",
        title: '슬픔이',
        description: '흐애애앵',
        time: '1:20',
        artist:'보경',
        liked: true
    },
    {
        id: "6",
        title: '슬픔이',
        description: '흐애애앵',
        time: '1:20',
        artist:'보경',
        liked: true
    },{
        id: "7",
        title: '슬픔이',
        description: '흐애애앵',
        time: '1:20',
        artist:'보경',
        liked: true
    },{
        id: "8",
        title: '슬픔이',
        description: '흐애애앵',
        time: '1:20',
        artist:'보경',
        liked: true
    },
];

