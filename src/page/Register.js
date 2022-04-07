
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';

import { userAction } from "../_actions";

export default class Register extends Component {

    state = {
        loading: false,
        isCheckAlert: null,
        username: "wazowski",
        password: "11111",
        fullname: "Nuttayapon ponthittakul",

        getImagePhoto: "",
        getPhoto: false,
        checkHaveAddImage: false
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

    onConvertImage(){
        const { getImagePhoto } = this.state
        ImgToBase64.getBase64String(getImagePhoto)
        .then((base64String) => {
            // const URL = "data:image/png;base64,"+base64String;
            this.onSubmit(base64String)
        })
        .catch((err) => {
            this.onOpenAlert("Err", err)
        });
    }

    onSubmit(imageBase64) {
        if (this.validateForm()) {
            this.setState({
                loading: true,
            })
            const { username, password, fullname } = this.state
            var dataForm = {
                "fullname": `${fullname}`,
                "username": `${username}`,
                "password": `${password}`,
                "image": imageBase64
            }
            console.log("Regsiter dataForm", dataForm)
            userAction.Regsiter(dataForm).then(e => {
                console.log("Regsiter", e)
                if (e.status === "success") {
                    this.onLoginSuccess(e.respond)
                } else if (e === "ErrorApi") {
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

    onAskChoose(){
        alert = (<ModalLib isVisible={true}>
            <View style={ModalStyles.ModalContent}>
                <TouchableOpacity 
                    style={[ModalStyles.ModalContentClose]}
                    activeOpacity={1}
                    onPress={() => this.onCloseAlert()}
                >
                    <Image
                        resizeMode={'contain'}
                        style={[ModalStyles.ModalContentCloseIconSmall]}
                        source={require('../../assets/icon/close.png')}
                    />
                </TouchableOpacity>
                <Text allowFontScaling={false} style={ModalStyles.ModalTitle}>แจ้งเตือน</Text>
                <View style={[MainStyles.my15]}>
                    <View style={[ModalStyles.contentButton, MainStyles.my10]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={ModalStyles.btnOne}
                            onPress={() => this.handleCameraPhoto()}
                        > 
                            <Text allowFontScaling={false} style={ModalStyles.btnOneText}>ถ่ายรูปภาพ</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ModalStyles.contentButton}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={ModalStyles.btnOne}
                            onPress={() => this.handleChoosePhoto()}
                        > 
                            <Text allowFontScaling={false} style={ModalStyles.btnOneText}>เลือกจากคลังภาพ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ModalLib>)
        this.setState({ 
            isCheckAlert: alert,
            loading: false,
        }); 
    }

    handleCameraPhoto(){
        const { lang } = this.state
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
                maxWidth: 250, 
                maxHeight: 250, 
                AccountImage: "",
                dataProfile: "",
            },
            title: 'เลือก',
            takePhotoButtonTitle: "ถ่ายรูปภาพ",
            chooseFromLibraryButtonTitle: "เลือกจากคลังภาพ",
            cancelButtonTitle: 'ยกเลิก',
        };
        launchCamera(options , response => {
                if (response.didCancel) {
                    if(this.state.getImagePhoto == ""){
                        this.setState({
                            getImagePhoto: "",
                            getPhoto: false,
                            checkHaveAddImage: false,
                            isCheckAlert: null,
                        });
                    }
                } else {
                    this.setState({
                        getImagePhoto: response.uri,
                        getPhoto: true,
                        checkHaveAddImage: true,
                        isCheckAlert: null,
                    });
                    // this.onResizeImage(response.uri)
                }
        });
    }

    handleChoosePhoto(){
        const { lang } = this.state
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
                maxWidth: 250, 
                maxHeight: 250, 
                AccountImage: "",
                dataProfile: "",
            },
            title: 'เลือก',
            takePhotoButtonTitle: "ถ่ายรูปภาพ",
            chooseFromLibraryButtonTitle: "เลือกจากคลังภาพ",
            cancelButtonTitle: 'ยกเลิก',
        };
        launchImageLibrary(options , response => {
            console.log("responsesdfsdf", response.assets[0])
                if (response.didCancel) {
                    if(this.state.getImagePhoto == ""){
                        this.setState({
                            getImagePhoto: "",
                            getPhoto: false,
                            checkHaveAddImage: false,
                            isCheckAlert: null,
                        });
                    }
                } else {
                    this.setState({
                        getImagePhoto: response.assets[0].uri,
                        getPhoto: true,
                        checkHaveAddImage: true,
                        isCheckAlert: null,
                    });
                    // this.onResizeImage(response.uri)
                }
        });
    }

    render() {
        const { isCheckAlert, loading } = this.state
        return (
            <ImageBackground
                style={{ flex: 1, paddingTop: 50 }}
                source={require('../../assets/image/bglogin.png')}
            >
                <KeyboardAvoidingView
                    behavior={(Platform.OS === 'ios') ? "padding" : null}
                    enabled
                    keyboardVerticalOffset={100}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={[MainStyles.content]}>
                            {loading ? <Spinner visible={true} overlayColor={"rgba(0,0,0, 0.65)"} color={"#DD4A48"} /> : null}
                            {isCheckAlert}
                            <Text allowFontScaling={false} style={[styles.title, MainStyles.textRed]}>สมัครสมาชิก</Text>
                            <Text allowFontScaling={false} style={[styles.subtitle, MainStyles.textRedBd]}>เปิดตำราหาอาหารไทย</Text>
                            <View style={InputStyles.contentInputForm}>
                                <Text allowFontScaling={false} style={InputStyles.inputFormTextLight}>รหัสผ่าน</Text>
                                <TextInput
                                    clearButtonMode="always"
                                    allowFontScaling={false}
                                    style={[InputStyles.inputForm]}
                                    placeholder="ชื่อผู้ใช้"
                                    placeholderTextColor={"#838383"}
                                    value={this.state.username}
                                    onChange={e => this.handleChange(e, 'username')}
                                />
                            </View>
                            <View style={InputStyles.contentInputForm}>
                                <Text allowFontScaling={false} style={InputStyles.inputFormTextLight}>รหัสผ่าน</Text>
                                <TextInput
                                    clearButtonMode="always"
                                    allowFontScaling={false}
                                    style={[InputStyles.inputForm]}
                                    placeholder="รหัสผ่าน"
                                    placeholderTextColor={"#838383"}
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e, 'password')}
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={InputStyles.contentInputForm}>
                                <Text allowFontScaling={false} style={InputStyles.inputFormTextLight}>รหัสผ่าน</Text>
                                <TextInput
                                    clearButtonMode="always"
                                    allowFontScaling={false}
                                    style={[InputStyles.inputForm]}
                                    placeholder="ชื่อนามสกุล"
                                    placeholderTextColor={"#838383"}
                                    value={this.state.fullname}
                                    onChange={e => this.handleChange(e, 'fullname')}
                                />
                            </View>
                            <View style={[InputStyles.contentInputForm, { marginTop: 15 }]}>
                                <Text allowFontScaling={false} style={InputStyles.inputFormTextLight}>รูปภาพ</Text>
                                {this.state.getPhoto ?
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => this.onAskChoose()}
                                    >
                                        <Image
                                            resizeMode={'contain'}
                                            style={{
                                                height: 400,
                                                width: '100%',
                                            }}
                                            source={this.state.getPhoto ? { uri: this.state.getImagePhoto } : ""}
                                        />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        style={styles.AddMore}
                                        activeOpacity={1}
                                        onPress={() => this.onAskChoose()}
                                    >
                                        <Image
                                            resizeMode={'contain'}
                                            style={{ width: 25, height: 25, alignSelf: 'center' }}
                                            source={require('../../assets/icon/cameraa.png')}
                                        />
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={[MainStyles.btnContent, MainStyles.mt30]}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.onConvertImage()}
                                    disabled={this.state.btnSubmit}
                                    style={MainStyles.btnRed}
                                >
                                    <Text allowFontScaling={false} style={MainStyles.btnBlueText}>สมัครสมาชิก</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                marginTop: 20,
                            }}>
                                <View style={{ marginBottom: 15 }}>
                                    <Text style={[MainStyles.textGrayBd, { textAlign: 'center' }]}>เป็นสมาชิกแล้วใช่หรือไม่ ?</Text>
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
                    </ScrollView>
                </KeyboardAvoidingView>
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
    AddMore: {
        flexDirection: 'column',
        flex: 1,
        marginTop: 10,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: "#c3c3c3",
        borderRadius: 10,
        width: '35%',
        padding: 50,
        justifyContent: 'center'
    },
});