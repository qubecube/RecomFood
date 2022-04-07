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


export default class FoodsDetail extends Component {

    state = {
        loading: true,
        isCheckAlert: null,
        isProfile: {},
        food_id: "",
        detailFood: {},
        isFavorites: false,
    };

    async componentDidMount() {
        const isProfile = await AsyncStorage.getItem('isProfile');
        var isProfileDecrypt = JSON.parse(isProfile);
        var dataInScreen = this.props.route.params.dataInScreen;
        this.setState({
            food_id: dataInScreen,
            isProfile: isProfileDecrypt,
        })
        this.onGetDetailFood(dataInScreen, isProfileDecrypt.id)
    }

    onGetDetailFood(food_id, user_id) {
        foodsAction.DetailFood(food_id).then(e => {
            if (e.status === "success") {
                this.setState({
                    detailFood: e.respond[0],
                })
                this.onGetFavorites(food_id, user_id)
            } else {
                this.onOpenAlert("Err", "เกิดข้อผิดพลาด")
            }
        });
    }

    onGetFavorites(food_id, user_id) {
        foodsAction.GetFavorites(user_id).then(e => {
            if (e.status === "success") {
                var resp = e.respond
                var dataDetailFav = resp.find(o => o.id === food_id);
                this.setState({
                    isFavorites: dataDetailFav === undefined ? false : true,
                    loading: false
                })
            } else {
                this.onOpenAlert("Err", "เกิดข้อผิดพลาด")
            }
        });
    }

    onFavorites(){
        const { isProfile, food_id } = this.state
        var dataForm = {
            "user_id": `${isProfile.id}`,
            "food_id": `${food_id}`
        }
        foodsAction.Favorites(dataForm).then(e => {
            console.log("Favorites", e)
            if (e.status === "success") {
                this.setState({
                    isFavorites: this.state.isFavorites ? false : true,
                })
            } else {
                this.onOpenAlert("Err", "เกิดข้อผิดพลาด")
            }
        });
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

    render() {
        const { isCheckAlert, loading, detailFood, isFavorites } = this.state
        return (
            <View style={{ flex: 1, marginBottom: 25 }}>
                {loading ? <Spinner visible={true} overlayColor={"rgba(0,0,0, 0.65)"} color={"#DD4A48"} /> : null}
                {isCheckAlert}

                <Image
                    resizeMode={'cover'}
                    style={{
                        width: '100%',
                        height: 250
                    }}
                    source={{ uri: detailFood.image }}
                />

                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.card}
                    onPress={() => this.onCheckList()}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <View style={MainStyles.Card2Col}>
                                <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={[MainStyles.Text22, MainStyles.textRedBd]}>{detailFood.name}</Text>
                                <TouchableOpacity 
                                    style={{ flex: 1, alignItems: 'flex-end' }}
                                    activeOpacity={1}
                                    onPress={() => this.onFavorites()}
                                >
                                    <Image
                                        resizeMode={'contain'}
                                        style={{
                                            width: 30,
                                            height: 30,
                                        }}
                                        source={isFavorites ? require('../../assets/icon/heart2.png') : require('../../assets/icon/heart.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={MainStyles.BorderBottomGrayWhite}></View>
                            <View style={MainStyles.Card2Col}>
                                <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.textGray]}>
                                    ประเภท : {detailFood.category}
                                </Text>
                                <View allowFontScaling={false} style={[MainStyles.Card2ColRight]}>

                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[MainStyles.content]}>
                        <Text allowFontScaling={false} style={[MainStyles.Text16, MainStyles.textRedBd]}>เตรียมวัตถุดิบ</Text>
                        <Text allowFontScaling={false} style={[MainStyles.Text14, MainStyles.textGray, MainStyles.mt5]}>
                            {detailFood.ingredients}
                        </Text>
                        <Text allowFontScaling={false} style={[MainStyles.Text16, MainStyles.textRedBd, MainStyles.mt15]}>วิธีการทำอาหาร</Text>
                        <Text allowFontScaling={false} style={[MainStyles.Text14, MainStyles.textGray, MainStyles.mt5]}>
                            {detailFood.cooking_method}
                        </Text>
                    </View>
                </ScrollView>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    contentScrollView: {
        marginTop: 15,
        alignSelf: Platform.isPad ? 'center' : 'flex-start',
        width: Platform.isPad ? '80%' : '100%',
    },
    card: {
        marginTop: -40,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: '#eceef0',
        borderWidth: 0.7,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        padding: 15,
    },

});

