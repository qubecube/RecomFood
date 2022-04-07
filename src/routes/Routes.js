import React, { Component, Fragment } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Platform, StatusBar, AsyncStorage, SafeAreaView, ImageBackground } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';

import Signin from '../page/Signin';
import Register from '../page/Register';
import Home from '../page/Home';
import Filter from '../page/Filter';
import Random from '../page/Random';
import Map from '../page/Map';
import Profile from '../page/Profile';

import FoodsDetail from '../page/FoodsDetail';

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
                source={require("../../assets/icon/backappred.png")}
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
                <Stack.Screen name="Filter" component={Filter} options={MainPageOptionNoBack} />      
                <Stack.Screen name="Random" component={Random} options={MainPageOptionNoBack} />      
                <Stack.Screen name="Map" component={Map} options={MainPageOptionNoBack} />      
                <Stack.Screen name="Profile" component={Profile} options={MainPageOptionNoBack} />   

                <Stack.Screen name="FoodsDetail" component={FoodsDetail} options={OptionOnlyArrowBack} />                      
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