import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Platform, StatusBar, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';

import MainStyles from '../styles/MainStyles';

import Home from '../page/Home';
import Filter from '../page/Filter';
import Random from '../page/Random';
import Map from '../page/Map';
import Profile from '../page/Profile';


const Tab = createBottomTabNavigator();
const TabBar = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarComponent="TabBarTop"
            tabBarPosition="top"
            tabBarOptions={{
                showLabel: false,
                style: {
                    borderTopWidth: 0,
                    elevation: 2,
                    shadowColor: '#000000',
                    shadowOffset: { height: 5 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    height: 60,
                },
            }}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                   
                    tabBarIcon: ({ focused }) => (
                        <Image
                            resizeMode={'contain'}
                            source={ focused ? { uri : 'https://qubecube.com/RecommentFood/Frontend/assets/tabbar/home2.png' } : { uri : 'https://qubecube.com/RecommentFood/Frontend/assets/tabbar/home.png' }}
                            style={ focused ? { height: 25, width: '100%' } : { height: 25, width: '100%' } }
                        />
                    )
                }}
                hideTabBar={true}
            />
            <Tab.Screen
                name="Filter"
                component={Filter}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            resizeMode={'contain'}
                            source={ focused ? { uri : 'https://qubecube.com/RecommentFood/Frontend/assets/tabbar/search2.png' } : { uri : 'https://qubecube.com/RecommentFood/Frontend/assets/tabbar/search.png' }}
                            style={ focused ? { height: 25, width: '100%' } : { height: 25, width: '100%' } }
                        />
                    )
                }}
                hideTabBar={true}
            />
            <Tab.Screen
                name="Random"
                component={Random}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            resizeMode={'contain'}
                            source={ focused ? { uri : 'https://qubecube.com/RecommentFood/Frontend/assets/tabbar/plus2.png' } : { uri : 'https://qubecube.com/RecommentFood/Frontend/assets/tabbar/plus.png' }}
                            style={ focused ? { height: 25, width: '100%' } : { height: 25, width: '100%' } }
                        />
                    )
                }}
                hideTabBar={true}
            />
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            resizeMode={'contain'}
                            source={ focused ? { uri : 'https://qubecube.com/RecommentFood/Frontend/assets/tabbar/location2.png' } : { uri : 'https://qubecube.com/RecommentFood/Frontend/assets/tabbar/location.png' }}
                            style={ focused ? { height: 25, width: '100%' } : { height: 25, width: '100%' } }
                        />
                    )
                }}
                hideTabBar={true}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            resizeMode={'contain'}
                            source={ focused ? { uri : 'https://qubecube.com/RecommentFood/Frontend/assets/tabbar/profile2.png' } : { uri : 'https://qubecube.com/RecommentFood/Frontend/assets/tabbar/profile.png' }}
                            style={ focused ? { height: 25, width: '100%' } : { height: 25, width: '100%' } }
                        />
                    )
                }}
                hideTabBar={true}
            />
        </Tab.Navigator>
    );
}
export default TabBar;