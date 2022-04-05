
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

import dataTable from './dataTable.json'
import { bandicotaAction } from "../_actions";

export default class CheckListWeek extends Component {

    state = {
        loading: false,
        isCheckAlert: null,

        dataInScreen: {},
        isWeek: 1,
        setPrepare01: false,
        setPrepare02: false,
        setPrepare03: false,
        setPrepare04: false,
        setPrepare05: false,
        setPrepare06: false,
        setPrepare07: false,

        dataCheckWeek: {},
        setDataTableWeek: "",
        setDataTableWeekData: [],
        setDayTable: [
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ],
        weight: "",

        onOpenInput: false,
        isProfile: {}
    }

    async componentDidMount() {
        const isProfile = await AsyncStorage.getItem('isProfile');
        var isProfileDecrypt = JSON.parse(isProfile);
        // console.log("isProfileDecrypt", isProfileDecrypt)
        this.setState({
            isProfile: isProfileDecrypt,
        })
        var dataInScreen = this.props.route.params.dataInScreen;
        console.log("dataInScreen", dataInScreen)
        this.setState({
            dataInScreen: dataInScreen,
        })
        this.onCheckDataTable(dataInScreen)
    }

    onCheckDataTable(dataInScreen) {
        console.log("onCheckDataTable", dataInScreen)
        // สมบูรณ์ , ผอม , อ้วน
        // "กรมปศุสัตว์" ? 1 : 2,
        // "หนูโต" ? 1 : 2
        console.log("dataInScreen.parenting", dataInScreen.parenting)
        if (dataInScreen.parenting === "กรมปศุสัตว์") {
            var setDataParenting = dataTable.typeCommon
        } else {
            var setDataParenting = dataTable.typeNormal
        }

        console.log("dataInScreen.type", dataInScreen.type)
        if (dataInScreen.type === "หนูโต") {
            var setDataBandicotaType = setDataParenting.big
        } else {
            var setDataBandicotaType = setDataParenting.baby
        }

        console.log("dataInScreen.body", dataInScreen.body)
        if (dataInScreen.body === "ผอม") {
            var setDataTable = setDataBandicotaType.ratSmall
        } else if (dataInScreen.body === "สมบูรณ์") {
            var setDataTable = setDataBandicotaType.ratNormal
        } else if (dataInScreen.body === "อ้วน") {
            var setDataTable = setDataBandicotaType.ratBig
        }

        if (dataInScreen.week_one === null) {
            var setDataTableWeek = "1"
            var setDataTableWeekData = setDataTable.week1
            var setDayTable = dataInScreen.week_one
        } else if (dataInScreen.week_two === null) {
            var setDataTableWeek = "2"
            var setDataTableWeekData = setDataTable.week2
            var setDayTable = dataInScreen.week_two
        } else if (dataInScreen.week_three === null) {
            var setDataTableWeek = "3"
            var setDataTableWeekData = setDataTable.week3
            var setDayTable = dataInScreen.week_three
        } else if (dataInScreen.week_four === null) {
            var setDataTableWeek = "4"
            var setDataTableWeekData = setDataTable.week4
            var setDayTable = dataInScreen.week_four
        } else if (dataInScreen.week_five === null) {
            var setDataTableWeek = "5"
            var setDataTableWeekData = setDataTable.week5
            var setDayTable = dataInScreen.week_five
        } else if (dataInScreen.week_six === null) {
            var setDataTableWeek = "6"
            var setDataTableWeekData = setDataTable.week6
            var setDayTable = dataInScreen.week_six
        } else if (dataInScreen.week_seven === null) {
            var setDataTableWeek = "7"
            var setDataTableWeekData = setDataTable.week7
            var setDayTable = dataInScreen.week_seven
        }
        this.setState({
            setDataTableWeek: setDataTableWeek,
            setDataTableWeekData: setDataTableWeekData,
            dataInScreen: dataInScreen,
            // setDayTable: setDayTable
        })
        console.log("setDataTableWeekData", setDataTableWeekData)
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
            onOpenInput: false,
            loading: false,
        });
    }

    onCloseAlert() {
        this.setState({
            isCheckAlert: null,
            loading: false,
        });
    }

    onCheckList(day) {
        const { setDayTable } = this.state
        // console.log("day", day)
        if (day === "1") {
            setDayTable[0] = 1
        } else if (day === "2") {
            setDayTable[1] = 1
        } else if (day === "3") {
            setDayTable[2] = 1
        } else if (day === "4") {
            setDayTable[3] = 1
        } else if (day === "5") {
            setDayTable[4] = 1
        } else if (day === "6") {
            setDayTable[5] = 1
        } else if (day === "7") {
            setDayTable[6] = 1
        }
        this.setState({
            setDayTable: setDayTable
        })
    }


    handleChange(event, name) {
        var value = event.nativeEvent.text;
        this.setState({ weight: value })
    }

    onOpenInput() {
        this.setState({
            onOpenInput: true,
            loading: false,
        });
    }

    onCloseInput() {
        if (this.state.weight === "") {
            this.onOpenAlert("Err", "กรอกน้ำหนัก")
        } else {
            this.setState({
                onOpenInput: false,
                loading: false,
            });
            this.onSubmit()
        }
    }

    onSubmit() {
        const { dataInScreen, weight, setDayTable, setDataTableWeek, isProfile } = this.state
        // console.log("dataInScreen",dataInScreen.id)
        // console.log("setDataTableWeek",setDataTableWeek)
        // console.log("setDayTable",setDayTable)
        var dataForm = {
            "id": dataInScreen.id,
            "user_id": `${isProfile.id}`,
            "type": `${dataInScreen.type}`,
            "parenting": `${dataInScreen.parenting}`,
            "status": `${dataInScreen.status}`,
            "week_one": setDataTableWeek === "1" ? setDayTable : dataInScreen.week_one,
            "week_two": setDataTableWeek === "2" ? setDayTable : dataInScreen.week_two,
            "week_three": setDataTableWeek === "3" ? setDayTable : dataInScreen.week_three,
            "week_four": setDataTableWeek === "4" ? setDayTable : dataInScreen.week_four,
            "week_five": setDataTableWeek === "5" ? setDayTable : dataInScreen.week_five,
            "week_six": setDataTableWeek === "6" ? setDayTable : dataInScreen.week_six,
            "price": 0,
            "weight": weight
        }
        console.log("dataForm", dataForm)
        bandicotaAction.UpdateBandicota(dataForm).then(e => {
            console.log("UpdateBandicota", e)
            if (e.status === "success") {
                this.onCheckIsWeekShowResult(e.respond[0])
            } else {
                this.onOpenAlert("Err", "เกิดช้อผิดพลาด")
            }
        });
    }

    onCheckIsWeekShowResult(respond) {
        this.setState({
            isCheckAlert: null,
            loading: false,
        });
        const { dataInScreen, setDataTableWeek } = this.state
        if (dataInScreen.type === "หนูโต") {
            if (setDataTableWeek === "3") {
                this.onOpenCheckPrepareLast(respond)
            } else {
                this.onOpenCheckPrepare(respond)
            }
        } else {
            if (setDataTableWeek === "6") {
                this.onOpenCheckPrepareLast(respond)
            } else {
                this.onOpenCheckPrepare(respond)
            }
        } 
    }

    onOpenCheckPrepare(respond) {
        alert = (<ModalLib isVisible={true}>
            <View style={ModalStyles.ModalContent}>
                <Text allowFontScaling={false} style={[ModalStyles.ModalTitle]}>{respond.weight} กรัม</Text>
                <Text allowFontScaling={false} style={ModalStyles.ModalSubTitle}>ผลลัพธ์ : {respond.body}</Text>
                <View style={ModalStyles.contentButton}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={ModalStyles.btnOne}
                        onPress={() => this.onCheckIsWeek(respond)}
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

    onOpenCheckPrepareLast(respond) {
        alert = (<ModalLib isVisible={true}>
            <View style={ModalStyles.ModalContent}>
                <Text allowFontScaling={false} style={ModalStyles.ModalTitle}>{respond.weight} กรัม</Text>
                <Text allowFontScaling={false} style={ModalStyles.ModalSubTitle2}>ผลลัพธ์ : {respond.body}</Text>
                <Text allowFontScaling={false} style={ModalStyles.ModalSubTitle3}>ราคากรมปศุสัตว์ : ตัวละ {respond.price} บาท</Text>
                <View style={ModalStyles.contentButton}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={ModalStyles.btnOne}
                        onPress={() => this.onCheckIsWeek(respond)}
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


    onCheckIsWeek(respond) {
        this.setState({
            isCheckAlert: null,
            loading: false,
        })
        const { dataInScreen, setDataTableWeek } = this.state
        if (dataInScreen.type === "หนูโต") {
            if (setDataTableWeek === "3") {
                this.onCheckStatus()
            } else {
                this.setState({
                    setDayTable: [0, 0, 0, 0, 0, 0, 0],
                    weight: ""
                })
                this.onCheckDataTable(respond)
            }
        } else {
            if (setDataTableWeek === "6") {
                this.onCheckStatus()
            } else {
                this.setState({
                    setDayTable: [0, 0, 0, 0, 0, 0, 0],
                    weight: ""
                })
                this.onCheckDataTable(respond)
            }
        } 
    }

    onCheckStatus() {
        this.setState({
            isCheckAlert: null,
            loading: false,
        });
        const { dataInScreen } = this.state
        this.props.navigation.navigate('Home', {
            dataInScreen: dataInScreen
        })
    }

    render() {
        const { onOpenInput, setDayTable, isCheckAlert, loading, setDataTableWeek, setDataTableWeekData, isWeek, setPrepare01, setPrepare02, setPrepare03 } = this.state
        var dataWeekRatCard = []
        setDataTableWeekData.map((key, index) => {
            dataWeekRatCard.push(
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.card}
                    onPress={() => this.onCheckList(setDataTableWeekData[index].day)}
                >
                    <View style={styles.cardContent}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text20, MainStyles.textOrange]}>
                                    วันที่ {setDataTableWeekData[index].day}
                                </Text>
                                <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text14, MainStyles.textGrayLight]}>
                                    {setDataTableWeekData[index].eat1}
                                </Text>
                                <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text14, MainStyles.textGrayLight]}>
                                    {setDataTableWeekData[index].eat2}
                                </Text>
                                <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text14, MainStyles.textGrayLight]}>
                                    {setDataTableWeekData[index].eat3}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}
                                activeOpacity={1}
                                onPress={() => this.onCheckList(setDataTableWeekData[index].day)}
                            >
                                <Image
                                    resizeMode={'contain'}
                                    style={{
                                        width: 30,
                                        height: 30
                                    }}
                                    source={setDayTable[index] === 1 ? require('../../assets/icon/correct2.png') : require('../../assets/icon/correctgray.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        });

        return (
            <SafeAreaView style={MainStyles.content} forceInset={{ bottom: 'always', top: 'never' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {isCheckAlert}
                    {loading ? <Spinner visible={true} overlayColor={"rgba(0,0,0, 0.65)"} color={"#ffac2a"} /> : null}
                    <Modal visible={onOpenInput}>
                        <View style={[ModalStyles.ModalContent, { marginTop: 50 }]}>
                            <View style={InputStyles.contentInputForm}>
                                <Text allowFontScaling={false} style={[InputStyles.inputFormTextLight, { marginBottom: 10 }]}>ใส่น้ำหนัก (กรัม)</Text>
                                <TextInput
                                    clearButtonMode="always"
                                    allowFontScaling={false}
                                    style={InputStyles.inputForm}
                                    placeholder="กรอกน้ำหนัก"
                                    placeholderTextColor={"#838383"}
                                    value={this.state.weight}
                                    onChange={e => this.handleChange(e, 'weight')}
                                    keyboardType="number-pad"
                                />
                            </View>
                            <View style={[ModalStyles.contentButton, { marginTop: 20 }]}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={ModalStyles.btnOne}
                                    onPress={() => this.onCloseInput()}
                                >
                                    <Text allowFontScaling={false} style={ModalStyles.btnOneText}>ตกลง</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Text allowFontScaling={false} numberOfLines={2} style={[MainStyles.Text20, MainStyles.textOrange, MainStyles.textAlignCenter, MainStyles.mb15]}>
                        สัปดาห์ที่ {setDataTableWeek}
                    </Text>
                    {dataWeekRatCard}

                </ScrollView>
                <View style={[MainStyles.btnContent]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.onOpenInput()}
                        style={[MainStyles.btnOrange]}
                    >
                        <Text allowFontScaling={false} style={MainStyles.btnOrangeText}>น้ำหนักต่อสัปดาห์</Text>
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