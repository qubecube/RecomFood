
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

export default class HistoryDetail extends Component {

    state = {
        loading: false,
        isCheckAlert: null,

        dataInScreen: {},
        dataWeek1: "",
        dataWeek2: "",
        dataWeek3: "",
        dataWeek4: "",
        dataWeek5: "",
        dataWeek6: "",
    }

    componentDidMount() {
        var dataInScreen = this.props.route.params.dataInScreen;
        this.setState({
            dataInScreen: dataInScreen,
        })
        console.log("dataInScreen", dataInScreen)
        if (dataInScreen.week_one === null) {
            var dataWeek1 = "ไม่ได้ทำรายการ"
        } else {
            var week_one = dataInScreen.week_one
            if (week_one.indexOf("0") !== -1) {
                var dataWeek1 = "ครบ"
            } else {
                if (week_one[0] === 0) {
                    var dataWeek1day1 = "1, "
                } else {
                    var dataWeek1day1 = ""
                }
                if (week_one[1] === 0) {
                    var dataWeek1day2 = "2, "
                } else {
                    var dataWeek1day2 = ""
                }
                if (week_one[2] === 0) {
                    var dataWeek1day3 = "3, "
                } else {
                    var dataWeek1day3 = ""
                }
                if (week_one[3] === 0) {
                    var dataWeek1day4 = "4, "
                } else {
                    var dataWeek1day4 = ""
                }
                if (week_one[4] === 0) {
                    var dataWeek1day5 = "5, "
                } else {
                    var dataWeek1day5 = ""
                }
                if (week_one[5] === 0) {
                    var dataWeek1day6 = "6"
                } else {
                    var dataWeek1day6 = ""
                }
                var dataWeek1 = "ขาดวันที่ " + dataWeek1day1 + dataWeek1day2 + dataWeek1day3 + dataWeek1day4 + dataWeek1day5 + dataWeek1day6
            }
        }
        if (dataInScreen.week_two === null) {
            var dataWeek2 = "ไม่ได้ทำรายการ"
        } else {
            var week_two = dataInScreen.week_two
            if (week_two.indexOf("0") !== -1) {
                var dataWeek2 = "ครบ"
            } else {
                if (week_two[0] === 0) {
                    var dataWeek2day1 = "1, "
                } else {
                    var dataWeek2day1 = ""
                }
                if (week_two[1] === 0) {
                    var dataWeek2day2 = "2, "
                } else {
                    var dataWeek2day2 = ""
                }
                if (week_two[2] === 0) {
                    var dataWeek2day3 = "3, "
                } else {
                    var dataWeek2day3 = ""
                }
                if (week_two[3] === 0) {
                    var dataWeek2day4 = "4, "
                } else {
                    var dataWeek2day4 = ""
                }
                if (week_two[4] === 0) {
                    var dataWeek2day5 = "5, "
                } else {
                    var dataWeek2day5 = ""
                }
                if (week_two[5] === 0) {
                    var dataWeek2day6 = "6"
                } else {
                    var dataWeek2day6 = ""
                }
                var dataWeek2 = "ขาดวันที่ " + dataWeek2day1 + dataWeek2day2 + dataWeek2day3 + dataWeek2day4 + dataWeek2day5 + dataWeek2day6
            }
        }
        if (dataInScreen.week_three === null) {
            var dataWeek3 = "ไม่ได้ทำรายการ"
        } else {
            var week_three = dataInScreen.week_three
            if (week_three.indexOf("0") !== -1) {
                var dataWeek3 = "ครบ"
            } else {
                if (week_three[0] === 0) {
                    var dataWeek3day1 = "1, "
                } else {
                    var dataWeek3day1 = ""
                }
                if (week_three[1] === 0) {
                    var dataWeek3day2 = "2, "
                } else {
                    var dataWeek3day2 = ""
                }
                if (week_three[2] === 0) {
                    var dataWeek3day3 = "3, "
                } else {
                    var dataWeek3day3 = ""
                }
                if (week_three[3] === 0) {
                    var dataWeek3day4 = "4, "
                } else {
                    var dataWeek3day4 = ""
                }
                if (week_three[4] === 0) {
                    var dataWeek3day5 = "5, "
                } else {
                    var dataWeek3day5 = ""
                }
                if (week_three[5] === 0) {
                    var dataWeek3day6 = "6"
                } else {
                    var dataWeek3day6 = ""
                }
                var dataWeek3 = "ขาดวันที่ " + dataWeek3day1 + dataWeek3day2 + dataWeek3day3 + dataWeek3day4 + dataWeek3day5 + dataWeek3day6
            }
        }
        if (dataInScreen.week_four === null) {
            var dataWeek4 = "ไม่ได้ทำรายการ"
        } else {
            var week_four = dataInScreen.week_four
            if (week_four.indexOf("0") !== -1) {
                var dataWeek4 = "ครบ"
            } else {
                if (week_four[0] === 0) {
                    var dataWeek4day1 = "1, "
                } else {
                    var dataWeek4day1 = ""
                }
                if (week_four[1] === 0) {
                    var dataWeek4day2 = "2, "
                } else {
                    var dataWeek4day2 = ""
                }
                if (week_four[2] === 0) {
                    var dataWeek4day3 = "3, "
                } else {
                    var dataWeek4day3 = ""
                }
                if (week_four[3] === 0) {
                    var dataWeek4day4 = "4, "
                } else {
                    var dataWeek4day4 = ""
                }
                if (week_four[4] === 0) {
                    var dataWeek4day5 = "5, "
                } else {
                    var dataWeek4day5 = ""
                }
                if (week_four[5] === 0) {
                    var dataWeek4day6 = "6"
                } else {
                    var dataWeek4day6 = ""
                }
                var dataWeek4 = "ขาดวันที่ " + dataWeek4day1 + dataWeek4day2 + dataWeek4day3 + dataWeek4day4 + dataWeek4day5 + dataWeek4day6
            }
        }
        if (dataInScreen.week_five === null) {
            var dataWeek5 = "ไม่ได้ทำรายการ"
        } else {
            var week_five = dataInScreen.week_five
            if (week_five.indexOf("0") !== -1) {
                var dataWeek5 = "ครบ"
            } else {
                if (week_five[0] === 0) {
                    var dataWeek5day1 = "1, "
                } else {
                    var dataWeek5day1 = ""
                }
                if (week_five[1] === 0) {
                    var dataWeek5day2 = "2, "
                } else {
                    var dataWeek5day2 = ""
                }
                if (week_five[2] === 0) {
                    var dataWeek5day3 = "3, "
                } else {
                    var dataWeek5day3 = ""
                }
                if (week_five[3] === 0) {
                    var dataWeek5day4 = "4, "
                } else {
                    var dataWeek5day4 = ""
                }
                if (week_five[4] === 0) {
                    var dataWeek5day5 = "5, "
                } else {
                    var dataWeek5day5 = ""
                }
                if (week_five[5] === 0) {
                    var dataWeek5day6 = "6"
                } else {
                    var dataWeek5day6 = ""
                }
                var dataWeek5 = "ขาดวันที่ " + dataWeek5day1 + dataWeek5day2 + dataWeek5day3 + dataWeek5day4 + dataWeek5day5 + dataWeek5day6
            }
        }
        if (dataInScreen.week_six === null) {
            var dataWeek6 = "ไม่ได้ทำรายการ"
        } else {
            var week_six = dataInScreen.week_six
            if (week_six.indexOf("0") !== -1) {
                var dataWeek6 = "ครบ"
            } else {
                if (week_six[0] === 0) {
                    var dataWeek6day1 = "1, "
                } else {
                    var dataWeek6day1 = ""
                }
                if (week_six[1] === 0) {
                    var dataWeek6day2 = "2, "
                } else {
                    var dataWeek6day2 = ""
                }
                if (week_six[2] === 0) {
                    var dataWeek6day3 = "3, "
                } else {
                    var dataWeek6day3 = ""
                }
                if (week_six[3] === 0) {
                    var dataWeek6day4 = "4, "
                } else {
                    var dataWeek6day4 = ""
                }
                if (week_six[4] === 0) {
                    var dataWeek6day5 = "5, "
                } else {
                    var dataWeek6day5 = ""
                }
                if (week_six[5] === 0) {
                    var dataWeek6day6 = "6"
                } else {
                    var dataWeek6day6 = ""
                }
                var dataWeek6 = "ขาดวันที่ " + dataWeek6day1 + dataWeek6day2 + dataWeek6day3 + dataWeek6day4 + dataWeek6day5 + dataWeek6day6
            }
        }
        this.setState({
            dataWeek1: dataWeek1,
            dataWeek2: dataWeek2,
            dataWeek3: dataWeek3,
            dataWeek4: dataWeek4,
            dataWeek5: dataWeek5,
            dataWeek6: dataWeek6,
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

    onBackToMain() {
        this.props.navigation.navigate('Home')
    }

    render() {
        const { dataWeek1, dataWeek2, dataWeek3, dataWeek4, dataWeek5, dataWeek6, isCheckAlert, loading, dataInScreen } = this.state

        return (
            <SafeAreaView style={MainStyles.content} forceInset={{ bottom: 'always', top: 'never' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {isCheckAlert}
                    {loading ? <Spinner visible={true} overlayColor={"rgba(0,0,0, 0.65)"} color={"#ffac2a"} /> : null}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={MainStyles.Card}
                    >
                        <View style={MainStyles.Card2Col}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray]}>ราคากรมปศุสัตว์</Text>
                        </View>
                        <View style={[MainStyles.Card2Col]}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray, MainStyles.textOrange, MainStyles.Text22]}>{dataInScreen.weight === null ? "-" : dataInScreen.weight} กรัม</Text>
                            <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textOrange, MainStyles.Text22]}>ตัวละ {dataInScreen.price === null ? "-" : dataInScreen.price}</Text>
                        </View>
                        <View style={MainStyles.BorderBottomGrayWhite}></View>
                        <View style={MainStyles.Card2Col}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray]}>สัปดาห์ที่ 1</Text>
                            <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textGray, MainStyles.Text16]}>
                                {dataWeek1}
                            </Text>
                        </View>
                        <View style={MainStyles.Card2Col}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray]}>สัปดาห์ที่ 2</Text>
                            <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textGray, MainStyles.Text16]}>
                                {dataWeek2}
                            </Text>
                        </View>
                        <View style={MainStyles.Card2Col}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray]}>สัปดาห์ที่ 3</Text>
                            <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textGray, MainStyles.Text16]}>
                                {dataWeek3}
                            </Text>
                        </View>
                        {dataInScreen.type === "หนูโต" ? null :
                            <View>
                                <View style={MainStyles.Card2Col}>
                                    <Text allowFontScaling={false} style={[MainStyles.textGray]}>สัปดาห์ที่ 4</Text>
                                    <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textGray, MainStyles.Text16]}>
                                        {dataWeek4}
                                    </Text>
                                </View>
                                <View style={MainStyles.Card2Col}>
                                    <Text allowFontScaling={false} style={[MainStyles.textGray]}>สัปดาห์ที่ 5</Text>
                                    <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textGray, MainStyles.Text16]}>
                                        {dataWeek5}
                                    </Text>
                                </View>
                                <View style={MainStyles.Card2Col}>
                                    <Text allowFontScaling={false} style={[MainStyles.textGray]}>สัปดาห์ที่ 6</Text>
                                    <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textGray, MainStyles.Text16]}>
                                        {dataWeek6}
                                    </Text>
                                </View>
                            </View>
                        }
                    </TouchableOpacity>
                </ScrollView>
                <View style={[MainStyles.btnContent]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.onBackToMain()}
                        style={[MainStyles.btnGray]}
                    >
                        <Text allowFontScaling={false} style={MainStyles.btnOrangeText}>กลับสู่หน้าหลัก</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({

});