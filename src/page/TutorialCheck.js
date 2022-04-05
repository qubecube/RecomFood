
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
    AsyncStorage,
    Animated,
    KeyboardAvoidingView,
    Alert,
    Modal,
    ActivityIndicator,
    Platform,
    Dimensions,
    Linking,
    AppState
} from 'react-native';
import MainStyles from '../styles/MainStyles';
import InputStyles from '../styles/InputStyles';
import ModalStyles from '../styles/ModalStyles';

import Spinner from 'react-native-loading-spinner-overlay';
import ModalLib from 'react-native-modal';

import { bandicotaAction } from "../_actions";

export default class TutorialCheck extends Component {

    state = {
        loading: false,
        isCheckAlert: null,

        dataInScreen: {},
        setPrepare01: false,
        setPrepare02: false,
        setPrepare03: false,

        isProfile: {}
    }


    async componentDidMount() {
        const isProfile = await AsyncStorage.getItem('isProfile');
        var isProfileDecrypt = JSON.parse(isProfile);
        console.log("isProfileDecrypt", isProfileDecrypt)
        var dataInScreen = this.props.route.params.dataInScreen;
        console.log("dataInScreen",dataInScreen)
        this.setState({
            dataInScreen: dataInScreen,
            isProfile: isProfileDecrypt,
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

    onCheckList(Prepare) {
        if (Prepare === 1) {
            this.setState({ setPrepare01: !this.state.setPrepare01 })
        } else if (Prepare === 2) {
            this.setState({ setPrepare02: !this.state.setPrepare02 })
        } else if (Prepare === 3) {
            this.setState({ setPrepare03: !this.state.setPrepare03 })
        }
    }

    onSubmit() {
        const { setPrepare01, setPrepare02, setPrepare03 } = this.state
        if (setPrepare01 === false) {
            this.onOpenAlert("err", "กรุณาเตรียมบ่อ")
        } else if (setPrepare02 === false) {
            this.onOpenAlert("err", "กรุณาเตรียมอาหาร")
        } else if (setPrepare03 === false) {
            this.onOpenAlert("err", "กรุณาเตรียมหนู")
        } else {
            this.setState({
                loading: true
            })
            this.onCheckStatus()
        }
    }

    onCheckStatus() {
        const { dataInScreen, isProfile } = this.state
        var dataForm = {
            "user_id" : isProfile.id,
            "bandicota_type" : dataInScreen.type,
            "parenting_id" : dataInScreen.parenting
        }
        bandicotaAction.createBandicota(dataForm).then(e => {
            console.log("createBandicota", e)
            if (e.status === "success") {
                this.onCreateBandicotaSuccess(e.respond)
            } else {
                this.onOpenAlert("Err", "เกิดช้อผิดพลาด")
            }
        });
   
    }

    onCreateBandicotaSuccess(dataResp){
        this.setState({
            loading: false
        })
        var setDataInScreen = {
            "type": dataResp.type === 1 ? "หนูโต" : "ลูกหนู",
            "parenting": dataResp.parenting === 1 ? "กรมปศุสัตว์" : "เลี้ยงทั่วไป",
            "id": dataResp.id,
            "week_one": null,
            "week_two": null,
            "week_three": null,
            "week_four": null,
            "week_five": null,
            "week_six": null,
            "week_seven": null,
            "price": null,
            "weight": null,
            "body": "สมบูรณ์",
            "status": "Pending",
        }
        this.props.navigation.navigate('CheckListWeek', {
            dataInScreen: setDataInScreen
        })
    }

    render() {
        const { isCheckAlert, loading, setPrepare01, setPrepare02, setPrepare03 } = this.state
        return (
            <SafeAreaView style={MainStyles.content} forceInset={{ bottom: 'always', top: 'never' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {isCheckAlert}
                    {loading ? <Spinner visible={true} overlayColor={"rgba(0,0,0, 0.65)"} color={"#ffac2a"} /> : null}
                    <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text20, MainStyles.textOrange, MainStyles.textAlignCenter, MainStyles.mb15]}>
                        72:00:00 น.
                    </Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.card}
                        onPress={() => this.onCheckList(1)}
                    >
                        <Image
                            resizeMode={'cover'}
                            style={styles.cardImage}
                            source={require('../../assets/image/tutorial01.jpeg')}
                        />
                        <View style={styles.cardContent}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text20, MainStyles.textOrange]}>
                                        การเตรียมบ่อ
                                    </Text>
                                    <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text14, MainStyles.textGrayLight]}>
                                        บ่อปูน 100 x 100
                                    </Text>
                                    <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text14, MainStyles.textGrayLight]}>
                                        ฝาบ่อปูน 100 x 100
                                    </Text>
                                    <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text14, MainStyles.textGrayLight]}>
                                        ฝาปิดพื้นบ่อปูน 100 x 100
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}
                                    activeOpacity={1}
                                    onPress={() => this.onCheckList(1)}
                                >
                                    <Image
                                        resizeMode={'contain'}
                                        style={{
                                            width: 30,
                                            height: 30
                                        }}
                                        source={setPrepare01 ? require('../../assets/icon/correct2.png') : require('../../assets/icon/correctgray.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.card}
                        onPress={() => this.onCheckList(2)}
                    >
                        <Image
                            resizeMode={'cover'}
                            style={styles.cardImage}
                            source={require('../../assets/image/tutorial03.jpeg')}
                        />
                        <View style={styles.cardContent}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text20, MainStyles.textOrange]}>
                                        อาหาร
                                    </Text>
                                    <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text14, MainStyles.textGrayLight]}>
                                        ข้าวโพด
                                    </Text>
                                    <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text14, MainStyles.textGrayLight]}>
                                        หัวอาหารหมูโปรตีน 25%
                                    </Text>
                                    <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text14, MainStyles.textGrayLight]}>
                                        น้ำ
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}
                                    activeOpacity={1}
                                    onPress={() => this.onCheckList(2)}
                                >
                                    <Image
                                        resizeMode={'contain'}
                                        style={{
                                            width: 30,
                                            height: 30
                                        }}
                                        source={setPrepare02 ? require('../../assets/icon/correct2.png') : require('../../assets/icon/correctgray.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.card}
                        onPress={() => this.onCheckList(3)}
                    >
                        <Image
                            resizeMode={'cover'}
                            source={require('../../assets/image/tutorial02.jpeg')}
                            style={styles.cardImage}
                        />
                        <View style={styles.cardContent}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text20, MainStyles.textOrange]}>
                                        หนู
                                    </Text>
                                    <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text14, MainStyles.textGrayLight]}>
                                        หนู 7 ตัว
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}
                                    activeOpacity={1}
                                    onPress={() => this.onCheckList(3)}
                                >
                                    <Image
                                        resizeMode={'contain'}
                                        style={{
                                            width: 30,
                                            height: 30
                                        }}
                                        source={setPrepare03 ? require('../../assets/icon/correct2.png') : require('../../assets/icon/correctgray.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <View style={[MainStyles.btnContent]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.onSubmit()}
                        style={[MainStyles.btnOrange]}
                    >
                        <Text allowFontScaling={false} style={MainStyles.btnOrangeText}>ยืนยัน</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    card: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: '#eceef0',
        borderWidth: 0.7,
        borderRadius: 10,
    },
    cardImage: {
        width: '100%',
        height: 160,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardContent: {
        padding: 13,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
});