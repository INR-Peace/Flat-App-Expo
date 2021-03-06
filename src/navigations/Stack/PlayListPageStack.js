import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {PlayListPage} from "../../pages/PlayListPage";
import React from "react";
import {CommunityDetailPage} from "../../pages/CommunityDetailPage";
import Logo from "../../components/Logo";

const Stack = createStackNavigator();

export const PlayListStackNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="PlayList"

            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerStyle: {
                    backgroundColor: '#101010',
                    elevation: 0,
                    borderBottomColor: '#8E8E8E',
                    borderBottomWidth: 1
                }
            }}>
            <Stack.Screen name="PlayList" component={PlayListPage} options={{
                headerTitle: <Logo/>,
                headerTitleAlign: "center",
            }}/>
            <Stack.Screen name="CommunityDetail" component={CommunityDetailPage} options={{
                headerTitle: <Logo/>,
                headerTitleAlign: "center",
            }}/>
        </Stack.Navigator>
    )
};
