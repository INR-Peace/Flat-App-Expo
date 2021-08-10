import React, { useState } from 'react';
import styled from 'styled-components/native';
import {Pressable, FlatList, Dimensions, View, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Album } from "../components/Album";
import { Comment } from "../components/Comment";
import SmallSquareInput from "../components/Input/SmallSquareInput";


const AlbumContainer = styled.View`
    width: 90%;
    position: relative;
    margin: 20px 0 10px 0;
    border-bottom-width: 1px;
    border-bottom-color: #9F9F9F;
    align-items: center;
`;

const IconContainer = styled.View`
    width: 50px;
    position: absolute;
    flex-direction: row;
    justify-content: space-between;
    right: 10px;
    top: ${Dimensions.get('window').width-35}px;
`;

const CountContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding-left: 2%;
    margin: 15px 0 5px 0;
`;

const CountText = styled.Text`
    font-size: 12px;
    color:#ffffff;
    padding: 5px;
`;

const CommentContainer = styled.View`
    width: 100%;
    justify-content: center;
    height: 60px;
    left: 7.5%;
`;

const CommunityIcon = ({ name, size, color, liked }) => {
    const [isClicked, setIsClicked] = useState(liked);
    return (
        <Pressable onPress={()=> {setIsClicked(!isClicked)}}>
            {isClicked ?
                <Ionicons name={name} size={size} color={color}/>
                :
                <Ionicons name={name+'-outline'} size={size} color={color}/>
            }
        </Pressable>
    );
};

export const CommunityDetailPage = () => {
    const HeaderComponent = () => {
        return (
            <>
                <View style={{alignItems: "center"}}>
                    <AlbumContainer>
                        <Album state={"PLAY_LARGE"} coverURL={album.coverURL} title={album.title} artist={album.artist} time={album.time} description={album.description} />
                        <IconContainer>
                            <CommunityIcon name="heart" size={24} color="#ffffff" liked={album.liked}/>
                            <CommunityIcon name="bookmark" size={22} color="#ffffff" />
                        </IconContainer>
                    <CountContainer>
                        <CountText>댓글 {comments.length}개</CountText>
                        <CountText>좋아요 3개</CountText>
                    </CountContainer>
                    </AlbumContainer>
                </View>
            </>
        );
    };

    const renderComment = ({item}) => (
        <CommentContainer>
            <Comment user={item.id} comment={item.comment} imgURL={item.imgURL}/>
        </CommentContainer>
    )

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#101010"}}>
            <FlatList
                data={comments}
                renderItem={renderComment}
                keyExtractor={(item)=>item.id}
                ListHeaderComponent={HeaderComponent}
            />
            <SmallSquareInput/>
        </SafeAreaView>
    );
};

const album = {
    coverURL: require("../../assets/images/communityImage/communityImage1.jpg"),
    id: "1",
    title: '갈기를 가지고 싶어',
    description: '라이언 캐릭터에서 영감을 받은 자작곡입니다. 많이 들어주세요~!',
    time: '0:25',
    artist: '이너피스',
    liked: true
}


const comments = [
    {
        imgURL: require("../../assets/images/CommentImage/CommentImage1.jpg"),
        id: '옆집토끼',
        comment: '잘 듣고 갑니다!'
    },
    {
        imgURL: require("../../assets/images/CommentImage/CommentImage2.jpg"),
        id: '작알못',
        comment: '저도 갈기 가지고 싶네요'
    },
    {
        imgURL: require("../../assets/images/CommentImage/CommentImage3.jpg"),
        id: 'rabbit',
        comment: 'Good'
    },
    {
        imgURL: require("../../assets/images/profileImage/ProfileImage.png"),
        id: '이너피스',
        comment: '댓글 감사합니다!'
    },
    {
        imgURL: require("../../assets/images/CommentImage/CommentImage5.jpg"),
        id: '나무늘보',
        comment: '뒷짐진 라이언 이미지가 너무 귀여워요~!'
    },
];
