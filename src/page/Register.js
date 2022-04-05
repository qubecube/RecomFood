
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

export default class Register extends Component {

    state = {
        loading: false,
        isCheckAlert: null,
        username: "",
        password: "",
        fullname: "",
    }

    handleChange(event, name) {
        var value = event.nativeEvent.text;
        if (name == "username") {
            this.setState({ username: value })
        } else if (name == "password") {
            this.setState({ password: value })
        } else if (name == "fullname") {
            this.setState({ fullname: value })
        }
    }

    validateForm() {
        let formIsValid = true;
        const { username, Password, fullname } = this.state
        if (username === "") {
            this.onOpenAlert("Err", "กรอกชื่อผู้ใช้")
            formIsValid = false;
        } else if (Password === "") {
            this.onOpenAlert("Err", "กรอกรหัสผ่าน")
            formIsValid = false;
        } else if (fullname === "") {
            this.onOpenAlert("Err", "กรอกชื่อ-นามสกุล")
            formIsValid = false;
        }
        return formIsValid;
    }

    onSubmit() {
        if (this.validateForm()) {
            this.setState({
                loading: true,
            })
            const { username, password, fullname } = this.state
            var dataForm = {
                "fullname": `${fullname}`,
                "username": `${username}`,
                "password": `${password}`,
            }
            userAction.Regsiter(dataForm).then(e => {
                console.log("Regsiter", e)
                if (e.status === "success") {
                    this.onLoginSuccess(e.respond)
                } else if(e === "ErrorApi") {
                    this.onOpenAlert("Err", "ขออภัย มีชื่อผู้ใช้นี้ในระบบแล้ว")
                } else {
                    this.onOpenAlert("Err", "สมัครสมาชิกไม่สำเร็จ")
                }
            });
        }
    }

    onLoginSuccess(Data) {
        alert = (<ModalLib isVisible={true}>
            <View style={ModalStyles.ModalContent}>
                <Text allowFontScaling={false} style={ModalStyles.ModalTitle}>แจ้งเตือน</Text>
                <Text allowFontScaling={false} style={ModalStyles.ModalSubTitle}>สมัครสมาชิกสำเร็จ</Text>
                <View style={ModalStyles.contentButton}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={ModalStyles.btnOne}
                        onPress={() => this.onNextToScreen(Data)}
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

    async onNextToScreen(Data) {
        this.setState({
            isCheckAlert: null,
            loading: false,
        })
        var setProfile = {
            "id": Data.id,
            "fullname": Data.fullname,
            "username": Data.username,
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

    onSignin() {
        this.props.navigation.navigate('Signin');
    }

    render() {
        const { isCheckAlert, loading } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#DD4A48', }}>
                {isCheckAlert}
                {loading ? <Spinner visible={true} overlayColor={"rgba(0,0,0, 0.65)"} color={"#DD4A48"} /> : null}
                <View style={{
                    backgroundColor: '#DD4A48',
                    height: 220,
                    marginTop: 40
                }}>
                    <View style={{
                        marginLeft: 15,
                        marginRight: 15,
                    }}>
                        <Text style={[MainStyles.textWhiteBd,MainStyles.titleMain, { marginTop: 60, color: '#ffffff', fontSize: 30 }]}>สมัครสมาชิก</Text>
                    </View>
                </View>
                <View style={[styles.cardSignin]}>
                    <View style={{ marginTop: 15, backgroundColor: '#DD4A48' }}>
                        <View style={InputStyles.contentInputForm}>
                            <TextInput
                                clearButtonMode="always"
                                allowFontScaling={false}
                                style={[InputStyles.inputForm, {backgroundColor: '#FD5D5D' , color:'#fff'}]}
                                placeholder="ชื่อผู้ใช้"
                                placeholderTextColor={"#fff"}
                                value={this.state.username}
                                onChange={e => this.handleChange(e, 'username')}
                            />
                        </View>
                        <View style={[InputStyles.contentInputForm,{marginTop: 15}]}>
                            <TextInput
                                clearButtonMode="always"
                                allowFontScaling={false}
                                style={[InputStyles.inputForm, {backgroundColor: '#FD5D5D' , color:'#fff'}]}
                                placeholder="รหัสผ่าน"
                                placeholderTextColor={"#fff"}
                                value={this.state.password}
                                onChange={e => this.handleChange(e, 'password')}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={[InputStyles.contentInputForm,{marginTop: 15}]}>
                            <TextInput
                                clearButtonMode="always"
                                allowFontScaling={false}
                                style={[InputStyles.inputForm, {backgroundColor: '#FD5D5D' , color:'#fff'}]}
                                placeholder="ชื่อนามสกุล"
                                placeholderTextColor={"#fff"}
                                value={this.state.fullname}
                                onChange={e => this.handleChange(e, 'fullname')}
                            />
                        </View>
                        <View style={[MainStyles.btnContent,{marginTop: 15}]}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this.onSubmit()}
                                style={[MainStyles.btnRed]}
                            >
                                <Text allowFontScaling={false} style={MainStyles.btnRedText}>ยืนยัน</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.5, backgroundColor: '#DD4A48' }}>
                    <View style={{
                        marginTop: 0,
                        backgroundColor: '#DD4A48',
                        marginLeft: 35,
                        marginRight: 35,
                    }}>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={[MainStyles.textWhite, { textAlign: 'center' , fontWeight:'bold' }]}>หรือ</Text>
                        </View>
                        <View style={[MainStyles.btnContent]}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this.onSignin()}
                                style={[MainStyles.btnGray]}
                            >
                                <Text allowFontScaling={false} style={MainStyles.btnOrangeText}>เข้าสู่ระบบ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    cardSignin: {
        backgroundColor: '#DD4A48',
        marginTop: -100,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 15,
        shadowColor: "#000",
        shadowOffset: { height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        borderWidth: 2,
        borderColor: '#DD4A48',
    },
});