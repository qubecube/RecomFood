import React, { Component, Fragment } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Platform, StatusBar, AsyncStorage, SafeAreaView, ImageBackground } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';

import Home from '../page/Home.js';
import HomeCreate from '../page/HomeCreate';

import History from '../page/History';
import Recommend from '../page/Recommend';
import Setting from '../page/Setting';

import Signin from '../page/Signin';
import Register from '../page/Register';

import TutorialCheck from '../page/TutorialCheck';
import CheckListWeek from '../page/CheckListWeek';
import HistoryInside from '../page/HistoryInside';
import HistoryDetail from '../page/HistoryDetail';


const Stack = createStackNavigator();
function StackNaviga() {
    const MainPageOptionNoBack = {
        gestureEnabled: false,
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
        tabBarVisible: false
    }
    const OptionOnlyArrowBack = {
        title: '',
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerStyle: { backgroundColor: '#fff', shadowOpacity: 0, elevation: 0, },
        cardStyle: { backgroundColor: '#fff' },
        headerBackImage: () => (
            <Image
                resizeMode={'contain'}
                source={require("../../assets/icon/backapp.png")}
                style={[TabBarBottomStyles.setheaderBackImage]}
            />
        ),
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Signin" component={Signin} options={MainPageOptionNoBack} />
                <Stack.Screen name="Register" component={Register} options={MainPageOptionNoBack} />
                <Stack.Screen name="Home" component={TabNavigator} options={MainPageOptionNoBack} />
                <Stack.Screen name="History" component={History} options={MainPageOptionNoBack} />
                <Stack.Screen name="Recommend" component={Recommend} options={MainPageOptionNoBack} />
                <Stack.Screen name="Setting" component={Setting} options={MainPageOptionNoBack} />

                <Stack.Screen name="HomeCreate" component={HomeCreate}
                    options={{
                        title: "การเลี้ยง",
                        headerTitleStyle: {
                            alignSelf: 'center',
                            fontSize: 18,
                            color: '#ffac2a',
                            fontFamily: 'Prompt-Regular',
                            marginLeft: Platform.OS == "ios" ? 0 : 0,
                        },
                        headerBackTitleVisible: false,
                        headerStyle: { shadowOpacity: 0, elevation: 0, },
                        cardStyle: { backgroundColor: '#fff' },
                        headerBackImage: () => (
                            <Image
                                resizeMode={'contain'}
                                source={require("../../assets/icon/backappyellow.png")}
                                style={[TabBarBottomStyles.setheaderBackImage]}
                            />
                        )
                    }}
                />
                <Stack.Screen name="TutorialCheck" component={TutorialCheck}
                    options={{
                        title: "เตรียม",
                        headerTitleStyle: {
                            alignSelf: 'center',
                            fontSize: 18,
                            color: '#ffac2a',
                            fontFamily: 'Prompt-Regular',
                            marginLeft: Platform.OS == "ios" ? 0 : 0,
                        },
                        headerBackTitleVisible: false,
                        headerStyle: { shadowOpacity: 0, elevation: 0, },
                        cardStyle: { backgroundColor: '#fff' },
                        headerBackImage: () => (
                            <Image
                                resizeMode={'contain'}
                                source={require("../../assets/icon/backappyellow.png")}
                                style={[TabBarBottomStyles.setheaderBackImage]}
                            />
                        )
                    }}
                />
                <Stack.Screen name="CheckListWeek" component={CheckListWeek}
                    options={{
                        title: "ตารางเลี้ยงหนู",
                        headerTitleStyle: {
                            alignSelf: 'center',
                            fontSize: 18,
                            color: '#ffac2a',
                            fontFamily: 'Prompt-Regular',
                            marginLeft: Platform.OS == "ios" ? 0 : 0,
                        },
                        headerBackTitleVisible: false,
                        headerStyle: { shadowOpacity: 0, elevation: 0, },
                        cardStyle: { backgroundColor: '#fff' },
                        headerBackImage: () => (
                            <Image
                                resizeMode={'contain'}
                                source={require("../../assets/icon/backappyellow.png")}
                                style={[TabBarBottomStyles.setheaderBackImage]}
                            />
                        )
                    }}
                />
                <Stack.Screen name="HistoryInside" component={HistoryInside}
                    options={{
                        title: "ประวัติ",
                        headerTitleStyle: {
                            alignSelf: 'center',
                            fontSize: 18,
                            color: '#ffac2a',
                            fontFamily: 'Prompt-Regular',
                            marginLeft: Platform.OS == "ios" ? 0 : 0,
                        },
                        headerBackTitleVisible: false,
                        headerStyle: { shadowOpacity: 0, elevation: 0, },
                        cardStyle: { backgroundColor: '#fff' },
                        headerBackImage: () => (
                            <Image
                                resizeMode={'contain'}
                                source={require("../../assets/icon/backappyellow.png")}
                                style={[TabBarBottomStyles.setheaderBackImage]}
                            />
                        )
                    }}
                />
                <Stack.Screen name="HistoryDetail" component={HistoryDetail}
                    options={{
                        title: "รายละเอียด",
                        headerTitleStyle: {
                            alignSelf: 'center',
                            fontSize: 18,
                            color: '#ffac2a',
                            fontFamily: 'Prompt-Regular',
                            marginLeft: Platform.OS == "ios" ? 0 : 0,
                        },
                        headerBackTitleVisible: false,
                        headerStyle: { shadowOpacity: 0, elevation: 0, },
                        cardStyle: { backgroundColor: '#fff' },
                        headerBackImage: () => (
                            <Image
                                resizeMode={'contain'}
                                source={require("../../assets/icon/backappyellow.png")}
                                style={[TabBarBottomStyles.setheaderBackImage]}
                            />
                        )
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default class MainRoutes extends Component {
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
                <StackNaviga />
            </>
        );
    }
}


const TabBarBottomStyles = StyleSheet.create({
    setheaderBackImage: {
        height: 20,
        width: 20,
        marginLeft: Platform.OS == "ios" ? 10 : -5
    },
});