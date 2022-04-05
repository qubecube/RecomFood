
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
        Username: "",
        Password: "",
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
            <View style={{ flex: 1, backgroundColor: '#DD4A48'}}>
                {loading ? <Spinner visible={true} overlayColor={"rgba(0,0,0, 0.65)"} color={"#DD4A48"} /> : null}
                {isCheckAlert}
                <View style={{
                    backgroundColor: '#DD4A48',
                    height: 270,
                    marginTop: 90
                }}>
                    <View style={{
                        marginLeft: 15,
                        marginRight: 15,
                    }}>
                        <Text style={[MainStyles.textWhiteBd,MainStyles.titleMain, { marginTop: 60, color: '#ffffff', fontSize: 30 }]}>ยินดีต้อนรับ</Text>
                    </View>
                </View>
                <View style={[styles.cardSignin]}>
                    <View style={{ marginTop: 25 }}>
                        <View style={InputStyles.contentInputForm}>
                            <TextInput
                                clearButtonMode="always"
                                allowFontScaling={false}
                                style={[InputStyles.inputForm, {backgroundColor: '#FD5D5D' , color:'#fff'}]}
                                placeholder="ชื่อผู้ใช้"
                                placeholderTextColor={"#fff"}
                                value={this.state.Username}
                                onChange={e => this.handleChange(e, 'Username')}
                            />
                        </View>
                        <View style={[InputStyles.contentInputForm,{marginTop: 15}]}>
                            <TextInput
                                clearButtonMode="always"
                                allowFontScaling={false}
                                style={[InputStyles.inputForm, {backgroundColor: '#FD5D5D' , color:'#fff'}]}
                                placeholder="รหัสผ่าน"
                                placeholderTextColor={"#fff"}
                                value={this.state.Password}
                                onChange={e => this.handleChange(e, 'Password')}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={InputStyles.contentInputForm}>
                            <Text style={{ textAlign: 'right' , color : '#fff' , fontFamily: 'Prompt-Regular' , marginEnd: 10 , marginTop:-5}}>ลืมรหัสผ่าน?</Text>
                        </View>

                        <View style={[MainStyles.btnContent]}>  
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this.onSubmit()}
                                style={this.state.btnSubmit ? MainStyles.btnDisabled : MainStyles.btnRed}
                            >
                                <Text allowFontScaling={false} style={MainStyles.btnRedText}>เข้าสู่ระบบ</Text>
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
                                onPress={() => this.onRegister()}
                                style={[MainStyles.btnGray]}
                            >
                                <Text allowFontScaling={false} style={[MainStyles.btnOrangeText, {fontWeight:'bold' , color:'#fff'}]}>สมัครสมาชิก</Text>
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
        marginTop: -150,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
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