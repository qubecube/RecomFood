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
import { foodsAction } from "../_actions";

import Spinner from 'react-native-loading-spinner-overlay';
import ModalLib from 'react-native-modal';


export default class Home extends Component {

    state = {
        loading: true,
        isCheckAlert: null,

        tabBar: 'Category',
        allFoods: [],
        allFoodsByRegion: [],
        Recommend: []
    };

    async componentDidMount() {
        this.onRecommend()
    }

    onRecommend() {
        foodsAction.Recommend().then(e => {
            if (e.status === "success") {
                this.setState({
                    Recommend: e.respond,
                })
                this.onAllFood()
            } else {
                this.onOpenAlert("Err", "เกิดข้อผิดพลาด")
            }
        });
    }

    onAllFood() {
        foodsAction.AllFood().then(e => {
            if (e.status === "success") {
                this.setState({
                    allFoods: e.respond,
                    // loading: false
                })
                this.onReducerData(e.respond)
            } else {
                this.onOpenAlert("Err", "เกิดข้อผิดพลาด")
            }
        });
    }

    onReducerData(data) {
        const groups = data.reduce((groups, history) => {
            var region = history.region
            if (!groups[region]) {
                groups[region] = [];
            }
            groups[region].push(history);
            return groups;
        }, {});

        const groupArrays = Object.keys(groups).map((region) => {
            return {
                region,
                DataGroups: groups[region]
            };
        });
        this.setState({
            allFoodsByRegion: groupArrays,
            loading: false
        })
    }

    onOpenAlert(type, info) {
        alert = (<ModalLib isVisible={true}>
            <View style={ModalStyles.ModalContent}>
                <Text allowFontScaling={false} style={ModalStyles.ModalTitle}>แจ้งเตือน</Text>
                <Text allowFontScaling={false} style={ModalStyles.ModalSubTitle}>{info}</Text>
                <View style={ModalStyles.contentButton}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={ModalStyles.btnOne}
                        onPress={() => this.onCloseAlert()}
                    >
                        <Text allowFontScaling={false} style={ModalStyles.btnOneText}>ตกลง</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ModalLib>)
        this.setState({
            isCheckAlert: alert,
            loading: false,
        });
    }

    onCloseAlert() {
        this.setState({
            isCheckAlert: null,
            loading: false,
        });
    }

    onChangeTabBar(type) {
        this.setState({
            tabBar: type
        })
    }

    onDetailFoods(id) {
        this.props.navigation.navigate('FoodsDetail', {
            dataInScreen: id
        })
    }

    onGetAllFoodsByRegion(allFoods) {
        var allFoodsCard = []
        allFoods.map((key, index) => {
            allFoodsCard.push(
                <TouchableOpacity
                    onPress={() => this.onDetailFoods(allFoods[index].id)}
                    activeOpacity={1}
                >
                    <View style={{
                        width: 170,
                        height: 170,
                        paddingRight: 15,
                        paddingBottom: 20,
                        paddingTop: 5,
                    }}>
                        <ImageBackground
                            source={{ uri: allFoods[index].image }}
                            style={{
                                flex: 1,
                            }}
                            imageStyle={{ borderRadius: 6 }}
                        >
                            <View style={{
                                // backgroundColor: 'rgba(0,0,0,0.3)',
                                width: '100%', height: '100%', borderRadius: 6,
                            }}>
                                <View style={{
                                    position: 'absolute',
                                    width: '100%',
                                    alignItems: 'center',
                                    bottom: 0,
                                    borderBottomRightRadius: 6,
                                    borderBottomLeftRadius: 6,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    padding: 10
                                }}>
                                    <Text style={[MainStyles.Text18, MainStyles.textWhite]} numberOfLines={1} ellipsizeMode="tail">
                                        {allFoods[index].name}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            );
        });
        return allFoodsCard;
    }

    render() {
        const { isCheckAlert, loading, tabBar, allFoodsByRegion, Recommend } = this.state

        var allFoodsByRegionCard = []
        allFoodsByRegion.map((key, index) => {
            allFoodsByRegionCard.push(
                <View>
                    <Text allowFontScaling={false} style={[MainStyles.Text18, MainStyles.textRed]}>{allFoodsByRegion[index].region}</Text>
                    <ScrollView style={[{ flex: 1 }]} horizontal showsHorizontalScrollIndicator={false}>
                        {this.onGetAllFoodsByRegion(allFoodsByRegion[index].DataGroups)}
                    </ScrollView>
                </View>
            );
        });

        var RecommendCard = []
        Recommend.map((key, index) => {
            RecommendCard.push(
                <TouchableOpacity
                    onPress={() => this.onDetailFoods(Recommend[index].id)}
                    activeOpacity={1}
                    style={{ flexDirection: 'column' }}
                >
                    <View style={{
                        width: '100%',
                        height: 200,
                        paddingBottom: 20,
                        paddingTop: 5,
                    }}>
                        <ImageBackground
                            source={{ uri: Recommend[index].image }}
                            style={{
                                flex: 1,
                            }}
                            imageStyle={{ borderRadius: 6 }}
                        >
                            <View style={{
                                // backgroundColor: 'rgba(0,0,0,0.3)',
                                width: '100%', height: '100%', borderRadius: 6,
                            }}>
                                <View style={{
                                    position: 'absolute',
                                    width: '100%',
                                    alignItems: 'center',
                                    bottom: 0,
                                    borderBottomRightRadius: 6,
                                    borderBottomLeftRadius: 6,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    padding: 10
                                }}>
                                    <Text style={[MainStyles.Text18, MainStyles.textWhite]} numberOfLines={1} ellipsizeMode="tail">
                                        {Recommend[index].name}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            );
        });

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

                            {tabBar === "Category" ?
                                <View style={[MainStyles.mt15]} >
                                    {allFoodsByRegionCard}
                                </View>
                                :
                                <View style={[MainStyles.mt15]} >
                                    {RecommendCard}
                                </View>
                            }

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

