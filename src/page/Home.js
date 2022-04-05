
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
import moment from 'moment';
import 'moment/locale/th';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { bandicotaAction } from "../_actions";


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isCheckAlert: null,

            isProfile: {},
            getBandicota: [],
        };
        this.refsArray = []; // add this
    }

    async componentDidMount() {
        const isProfile = await AsyncStorage.getItem('isProfile');
        var isProfileDecrypt = JSON.parse(isProfile);
        console.log("isProfileDecrypt", isProfileDecrypt)
        this.setState({
            isProfile: isProfileDecrypt,
        })
        this.onGetBandicota(isProfileDecrypt.id)
        this.props.navigation.addListener('focus', () => {
            this.setState({
                loading: true
            })
            this.onGetBandicota(isProfileDecrypt.id)
        });
    }

    onGetBandicota(id) {
        bandicotaAction.getBandicota(id).then(e => {
            console.log("getBandicota", e)
            if (e.status === "success") {
                this.setState({
                    getBandicota: e.respond,
                    loading: false
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

    onHistoryDetail(status, data) {
        if (status === "Pending") {
            if (data.week_six !== null) {
                this.onOpenAlert("Err", "ข้อมูลรายการนี้ไม่ถูกต้อง")
            } else {
                var setDataInScreen = {
                    "type": data.type === "หนูโต" ? 1 : 2,
                    "parenting": data.parenting === "กรมปศุสัตว์" ? 1 : 2,
                    "id": parseFloat(data.id),
                    "week_one": data.week_one,
                    "week_two": data.week_two,
                    "week_three": data.week_three,
                    "week_four": data.week_four,
                    "week_five": data.week_five,
                    "week_six": data.week_six,
                    "week_seven": data.week_seven,
                    "price": data.price,
                    "weight": data.weight,
                    "body": data.body,
                    "status": data.status,
                }
                console.log("setDataInScreen", setDataInScreen)
                this.props.navigation.navigate('CheckListWeek', {
                    dataInScreen: setDataInScreen
                })
            }
        } else if (status === "Success") {
            this.props.navigation.navigate('HistoryDetail', {
                dataInScreen: data
            })
        }
    }

    onNextToHome() {
        this.props.navigation.navigate('HomeCreate')
    }

    onAskBandicota(id) {
        this.setState({
            loading: true
        })
        this.refsArray[id].close();
        var dataForm = {
            "bandicotas_id": id
        }
        bandicotaAction.deleteBandicota(dataForm).then(e => {
            console.log("deleteBandicota", e)
            if (e.status === "success") {
                this.onSuccessDelete()
            } else {
                this.onOpenAlert("Err", "เกิดข้อผิดพลาด")
            }
        });
    }

    onSuccessDelete() {
        alert = (<ModalLib isVisible={true}>
            <View style={ModalStyles.ModalContent}>
                <Text allowFontScaling={false} style={ModalStyles.ModalTitle}>แจ้งเตือน</Text>
                <Text allowFontScaling={false} style={ModalStyles.ModalSubTitle}>ลบรายการสำเร็จ</Text>
                <View style={ModalStyles.contentButton}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={ModalStyles.btnOne}
                        onPress={() => this.onCloseSuccessDelete()}
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

    onCloseSuccessDelete() {
        this.setState({
            isCheckAlert: null,
            loading: true
        });
        this.componentDidMount()
    }

    render() {
        const { isCheckAlert, loading, getBandicota } = this.state
        var getBandicotaCard = []
        getBandicota.map((key, index) => {
            var createdData = moment(getBandicota[index].created_at, 'YYYY-MM-DD hh:mm:ss').add('y', +543).locale('th').format("ll")
            getBandicotaCard.push(
                <Swipeable
                    ref={ref => {
                        this.refsArray[getBandicota[index].id] = ref; //or this.refsArray[item.id] 
                    }}
                    renderRightActions={(progress, dragx) => {
                        return (
                            <TouchableOpacity
                                style={styles.contentCardDelete}
                                activeOpacity={1}
                                onPress={() => this.onAskBandicota(getBandicota[index].id)}
                            >
                                <Text allowFontScaling={false} style={styles.contentCardDeleteText}>ลบ</Text>
                                <Text allowFontScaling={false} style={styles.contentCardDeleteText}>รายการ</Text>
                            </TouchableOpacity>
                        );
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.onHistoryDetail(getBandicota[index].status, getBandicota[index])}
                        style={MainStyles.Card}
                    >
                        <View style={MainStyles.Card2Col}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray]}>ครั้งที่ {getBandicota[index].id} | {createdData}</Text>
                            <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, getBandicota[index].status === "Pending" ? MainStyles.textYellow : MainStyles.textGreen]}>{getBandicota[index].status}</Text>
                        </View>
                        <View style={[MainStyles.Card2Col]}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray, MainStyles.textOrange, MainStyles.Text26]}>
                                {getBandicota[index].type}
                            </Text>
                        </View>
                        <View style={[MainStyles.Card2Col2]}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray]}>{getBandicota[index].parenting}</Text>
                        </View>
                        <View style={MainStyles.BorderBottomGrayWhite}></View>
                        <View style={MainStyles.Card2Col}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray]}>ราคากรมปศุสัตว์ (กรัม)</Text>
                            <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textGray]}>ตัวละ (บาท)</Text>
                        </View>
                        <View style={MainStyles.Card2Col}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray, MainStyles.textOrange, MainStyles.Text16]}>{getBandicota[index].weight === null ? "-" : getBandicota[index].weight}</Text>
                            <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textOrange, MainStyles.Text16]}>{getBandicota[index].price === null ? "-" : getBandicota[index].price}</Text>
                        </View>
                    </TouchableOpacity>
                </Swipeable>
            );
        });
        return (
            <SafeAreaView style={MainStyles.content} forceInset={{ bottom: 'always', top: 'never' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {isCheckAlert}
                    {loading ? <Spinner visible={true} overlayColor={"rgba(0,0,0, 0.65)"} color={"#ffac2a"} /> : null}
                    {getBandicotaCard}
                </ScrollView>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.onNextToHome()}
                    style={{
                        alignSelf: 'center',
                        marginTop: 10
                    }}
                >
                    <Image
                        resizeMode={'contain'}
                        source={require('../../assets/image/add.png')}
                        style={{
                            height: 60,
                        }}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    contentCardDelete: {
        backgroundColor: '#e81500',
        flexDirection: 'column',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: 5,
        marginLeft: -10,
        marginBottom: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#f3f3f3',
        justifyContent: 'center',
    },
    contentCardDeleteText: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Prompt',
        textAlign: 'center'
    },
});