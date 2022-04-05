
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

export default class Setting extends Component {

    state = {
        loading: false,
        isCheckAlert: null,
        isProfile: {}
    }

    async componentDidMount() {
        const isProfile = await AsyncStorage.getItem('isProfile');
        var isProfileDecrypt = JSON.parse(isProfile);
        console.log("isProfileDecrypt", isProfileDecrypt)
        this.setState({
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

    async onLogout() {
        await AsyncStorage.setItem('isProfile', "");
        await AsyncStorage.setItem('isLogin', 'false');
        this.props.navigation.navigate('Signin')
    }

    render() {
        const { isCheckAlert, loading, isProfile } = this.state
        return (
            <SafeAreaView style={MainStyles.content} forceInset={{ bottom: 'always', top: 'never' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {isCheckAlert}
                    {loading ? <Spinner visible={true} overlayColor={"rgba(0,0,0, 0.65)"} color={"#ffac2a"} /> : null}
                    <View style={styles.contentProfile}>
                        <Image
                            resizeMode={'contain'}
                            style={styles.contentProfileIcon}
                            source={require('../../assets/icon/user.png')}
                        />
                    </View>
                    <View style={styles.ListContent}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.onGetEngineerById()}
                            style={[MainStyles.Card, MainStyles.py20]}
                        >
                            <View style={MainStyles.Card2Col}>
                                <Text allowFontScaling={false} style={[MainStyles.textGray]}>ชื่อ-นามสกุล</Text>
                                <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textGray]}>{isProfile.fullname}</Text>
                            </View>
                            <View style={[MainStyles.BorderBottomGrayWhite, MainStyles.mt20]}></View>
                            <View style={[MainStyles.Card2Col]}>
                                <Text allowFontScaling={false} style={[MainStyles.textGray]}>ชื่อผู้ใช้</Text>
                                <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textGray]}>{isProfile.username}</Text>
                            </View>
                            {/* <View style={styles.ListContentIcon}>
                                    <Text allowFontScaling={false} style={[styles.ListText, MainStyles.textGray]}>ชื่อ-นามสกุล</Text>
                                </View>
                                <View style={styles.ListContentArrow}>
                                    <Image
                                        resizeMode={'contain'}
                                        style={styles.ListArrow}
                                        source={require('../../assets/icon/arrownextgray.png')}
                                    />
                                </View> */}
                        </TouchableOpacity>
                        <View style={styles.ListLine}></View>
                    </View>
                </ScrollView>
                <View style={[MainStyles.btnContent]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.onLogout()}
                        style={[MainStyles.btnOrange]}
                    >
                        <Text allowFontScaling={false} style={MainStyles.btnOrangeText}>ออกจากระบบ</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    contentProfile: {
        zIndex: 1,
        alignSelf: 'center',
        marginTop: 10,
    },
    contentProfileIcon: {
        width: 100,
        height: 100,
        borderRadius: 50
    },

    ListContent: {
        marginTop: 20,
        marginBottom: 15,
        flexDirection: 'column',
    },
    List: {
        flexDirection: 'row',
    },
    ListContentIcon: {
        width: '60%',
        flexDirection: 'row',
    },
    ListContentArrowVersion: {
        width: '40%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    ListText: {
        fontSize: 14,
        fontFamily: 'Prompt-Regular',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ListContentArrow: {
        width: '30%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    ListArrow: {
        height: 15,
        width: 15,
    },
});