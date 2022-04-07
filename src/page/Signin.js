
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

import { userAction } from "../_actions";

export default class Signin extends Component {


    state = {
        loading: false,
        isCheckAlert: null,
        Username: "wazowski",
        Password: "11111",
    }

    async componentDidMount() {
        const isLogin = await AsyncStorage.getItem('isLogin');
        if (isLogin === "true") {
            this.props.navigation.navigate('Home');
        }
    }

    handleChange(event, name) {
        var value = event.nativeEvent.text;
        if (name == "Username") {
            this.setState({ Username: value })
        } else if (name == "Password") {
            this.setState({ Password: value })
        }
    }

    validateForm() {
        let formIsValid = true;
        const { Username, Password } = this.state
        if (Username === "") {
            this.onOpenAlert("Err", "กรอกชื่อผู้ใช้")
            formIsValid = false;
        } else if (Password === "") {
            this.onOpenAlert("Err", "กรอกรหัสผ่าน")
            formIsValid = false;
        }
        return formIsValid;
    }

    onSubmit() {
        if (this.validateForm()) {
            this.setState({
                loading: true,
            })
            const { Username, Password } = this.state
            var dataForm = {
                "username": `${Username}`,
                "password": `${Password}`
            }
            userAction.Login(dataForm).then(e => {
                console.log("Login", e)
                if (e.status === "success") {
                    this.onNextToScreen(e.respond)
                } else {
                    this.onOpenAlert("Err", "ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง")
                }
            });
        }
    }

    async onNextToScreen(Data) {
        this.setState({
            isCheckAlert: null,
            loading: false,
        })
        var setProfile = {
            "id": Data.id,
            "fullname": Data.fullname,
            "username": Data.username,
            "image": Data.image
        }
        console.log("setProfile", setProfile)
        await AsyncStorage.setItem('isProfile', JSON.stringify(setProfile));
        await AsyncStorage.setItem('isLogin', 'true');
        this.props.navigation.navigate('Home');
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

    onRegister() {
        this.props.navigation.navigate('Register');
    }

    render() {
        const { isCheckAlert, loading } = this.state
        return (
            <ImageBackground
                style={{ flex: 1, paddingTop: 50 }}
                source={require('../../assets/image/bglogin.png')}
            >
                <View style={[MainStyles.content]}>
                    {loading ? <Spinner visible={true} overlayColor={"rgba(0,0,0, 0.65)"} color={"#DD4A48"} /> : null}
                    {isCheckAlert}
                    <View>
                        <Text allowFontScaling={false} style={[styles.title, MainStyles.textRed]}>เข้าสู่ระบบ</Text>
                        <Text allowFontScaling={false} style={[styles.subtitle, MainStyles.textRedBd]}>เปิดตำราหาอาหารไทย</Text>
                        <View style={InputStyles.contentInputForm}>
                            <Text allowFontScaling={false} style={InputStyles.inputFormTextLight}>ชื่อผู้ใช้งาน</Text>
                            <TextInput
                                clearButtonMode="always"
                                allowFontScaling={false}
                                style={InputStyles.inputForm}
                                placeholder="Username"
                                placeholderTextColor={"#838383"}
                                value={this.state.Username}
                                onChange={e => this.handleChange(e, 'Username')}
                            />
                        </View>
                        <View style={[InputStyles.contentInputForm, { marginTop: 15 }]}>
                            <Text allowFontScaling={false} style={InputStyles.inputFormTextLight}>รหัสผ่าน</Text>
                            <TextInput
                                clearButtonMode="always"
                                allowFontScaling={false}
                                style={InputStyles.inputForm}
                                placeholder="กรอกรหัสผ่าน"
                                placeholderTextColor={"#838383"}
                                value={this.state.Password}
                                onChange={e => this.handleChange(e, 'Password')}
                            />
                        </View>
                        <View style={[MainStyles.btnContent, MainStyles.mt30]}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this.onSubmit()}
                                disabled={this.state.btnSubmit}
                                style={MainStyles.btnRed}
                            >
                                <Text allowFontScaling={false} style={MainStyles.btnBlueText}>เข้าสู่ระบบ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginTop: 20,
                        }}>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={[MainStyles.textGrayBd, { textAlign: 'center' }]}>ยังไม่เป็นสมาชิกใช่หรือไม่ ?</Text>
                            </View>
                            <View style={[MainStyles.btnContent]}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.onRegister()}
                                    style={[MainStyles.btnGray]}
                                >
                                    <Text allowFontScaling={false} style={MainStyles.btnOrangeText}>สมัครสมาชิก</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: Platform.isPad ? 'center' : 'left'
    },
    subtitle: {
        fontSize: 26,
        marginBottom: 20,
        marginTop: -10,
        textAlign: Platform.isPad ? 'center' : 'left'
    },
});