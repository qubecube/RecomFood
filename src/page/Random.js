import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    SafeAreaView,
    TextInput,
    ImageBackground,
    Dimensions,
    Platform,
    AsyncStorage,
    ViewPropTypes,
    ActivityIndicator,
} from 'react-native';
import MainStyles from '../styles/MainStyles';
import InputStyles from '../styles/InputStyles';
import ModalStyles from '../styles/ModalStyles';

import { userAction } from "../_actions";

import Spinner from 'react-native-loading-spinner-overlay';
import ModalLib from 'react-native-modal';


export default class Random extends Component {

    state = {
        loading: false,
        isCheckAlert: null,

        tabBar: 'Category'
    };

    async componentDidMount() {

    }

    onChangeTabBar(type){
        this.setState({
            tabBar: type
        })
    }

    render() {
        const { isCheckAlert, loading, tabBar } = this.state
        return (
            <ImageBackground
                style={{ flex: 1, paddingTop: 50 }}
                source={require('../../assets/image/bghome.jpeg')}
            >
                {loading ? <Spinner visible={true} overlayColor={"rgba(0,0,0, 0.65)"} color={"#DD4A48"} /> : null}
                {isCheckAlert}
                <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'always', top: 'never' }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={[styles.contentScrollView]}>
                        <View style={[MainStyles.content]}>
                            <Text allowFontScaling={false} style={[MainStyles.title, MainStyles.textRedBd]}>เปิดตำราหาอาหารไทย</Text>
                            <View style={[MainStyles.tabBarMenu]}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.onChangeTabBar('Category')}
                                    style={[tabBar === "Category" ? MainStyles.tabBarLeftAcitve : MainStyles.tabBarLeft]}
                                >
                                    <Text allowFontScaling={false} style={tabBar === "Category" ? MainStyles.tabBarTextActive : MainStyles.tabBarText}>หมวดหมู่อาหาร</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.onChangeTabBar('Recommend')}
                                    style={[tabBar === "Recommend" ? MainStyles.tabBarLeftAcitve : MainStyles.tabBarLeft]}
                                >
                                    <Text allowFontScaling={false} style={tabBar === "Recommend" ? MainStyles.tabBarTextActive : MainStyles.tabBarText}>เมนูแนะนำ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView >
            </ImageBackground >
        );
    }
}


const styles = StyleSheet.create({
    contentScrollView: {
        marginTop: 15,
        alignSelf: Platform.isPad ? 'center' : 'flex-start',
        width: Platform.isPad ? '80%' : '100%',
    },

});

