import React, {useLayoutEffect, useState} from "react";
import {View, Dimensions, StyleSheet, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {SquareButtonList} from '../components/Button/SquareButtonList';
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {MusicSheet} from "../components/MusicSheet";


const initialLayout = {width: Dimensions.get('window').width};

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor: '#C4C4C4',
    },
    like: {
        padding: 8,
        backgroundColor: '#101010',
        fontSize: 10,
    },
});

// MusicSheet들어갈 자리 임시방편
const MusicSheetView = styled.ScrollView`
  background-color: #FFFFFF;
  border-width: 1px;
  flex-direction: row;
  border-bottom-color: #8E8E8E;
  flex: 1;
`;

const FirstRoute = () => (
  <View style={[styles.scene]}>
      <SquareButtonList effects={["Piano", "Drum", "Acoustic", "Electronic", "Saxophone", "Violin"]}/>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene]}>
      <SquareButtonList effects={["BALLAD", "R&B", "Rock", "HIP HOP", "JAZZ", "DANCE"]}/>
  </View>
);


const getTop = (note) => {
    switch (note) {
        case "C3": // 주작
            return 48;
        case "C4":
            return 60;
        case "D4":
            return 62;
        case "E4":
            return 64;
        case "F4":
            return 65;
        case "G4":
            return 67;
        case "A4":
            return 69;
        case "B4":
            return 71;
        case "C5":
            return 72;
        case "G5": // 주작
            return 79;
        case "C6": // 주작
            return 84;
        default:
            return 60;
    }
}

const getLeft = (index) => {
    return index * 30 + 20
}

const notes = ["C4", "F4", "G5", "D4", "B4", "D4", "C3", "F4", "C6", "D4", "C5", "C4", "F4", "A4", "D4", "G4"];
const X = notes.map((note, index) => getLeft(index))
const Y = notes.map((note) => getTop(note)*2)
const result = X.map((x, i) => {
    return [x, Y[i]]
})

export const EditPage = ({navigation}) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: '사운드'},
        {key: 'second', title: '장르'},
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: '#ffffff',

            headerLeft: ({onPress, tintColor}) => {
                return (
                    <MaterialCommunityIcons
                        name="keyboard-backspace"
                        size={30}
                        style={{marginLeft: 11}}
                        color={tintColor}
                        onPress={onPress}
                    />
                );
            },
            headerRight: ({tintColor}) => (
                <Ionicons name="download-outline"
                          size={32}
                          style={{marginRight: 11}}
                          color={tintColor}
                          onPress={() => navigation.navigate("EditSavePage")}
                />
            ),
        });
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#101010"}}>
            {/*<TopBar2/>*/}
            <MusicSheetView horizontal={true}>
                <MusicSheet positions={result}/>
            </MusicSheetView>
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        style={styles.like}
                        indicatorStyle={{
                            backgroundColor: '#51CDDE',
                        }}
                    />
                )}
            />
        </SafeAreaView>
    );
};


