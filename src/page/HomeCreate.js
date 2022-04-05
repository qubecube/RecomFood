
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

export default class HomeCreate extends Component {

    state = {
        loading: false,
        isCheckAlert: null,
    }

    componentDidMount() {
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

    onSelectType(typeRat) {
        alert = (<ModalLib isVisible={true}>
            <View style={[ModalStyles.ModalContent]}>
                <Text allowFontScaling={false} style={ModalStyles.ModalTitle}>ประเภทการเลี้ยง</Text>
                <View>
                    <View style={[ModalStyles.contentButton, MainStyles.mt15]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={ModalStyles.btnOne}
                            onPress={() => this.onSelectTypeIs(typeRat, 1)}
                        >
                            <Text allowFontScaling={false} style={ModalStyles.btnOneText}>กรมปศุสัตว์</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[ModalStyles.contentButton, MainStyles.mt10, MainStyles.mb10]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={ModalStyles.btnOne}
                            onPress={() => this.onSelectTypeIs(typeRat, 2)}
                        >
                            <Text allowFontScaling={false} style={ModalStyles.btnOneText}>เลี้ยงทั่วไป</Text>
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

    onSelectTypeIs(typeRat, type){
        this.setState({
            isCheckAlert: null,
            loading: false,
        });
        var dataInScreen = {
            "type": typeRat,
            "parenting": type
        }
        this.props.navigation.navigate('TutorialCheck',{
            dataInScreen: dataInScreen
        })
    }

    render() {
        const { isCheckAlert, loading } = this.state
        return (
            <SafeAreaView style={MainStyles.content} forceInset={{ bottom: 'always', top: 'never' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {isCheckAlert}
                    {loading ? <Spinner visible={true} overlayColor={"rgba(0,0,0, 0.65)"} color={"#ffac2a"} /> : null}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.onSelectType(1)}
                    >
                        <ImageBackground
                            source={require('../../assets/image/2.jpeg')}
                            style={{
                                height: 200,
                                opacity: 0.8,
                                borderRadius: 6,
                            }}
                            imageStyle={{ borderRadius: 6 }}
                        >
                            <View style={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                bottom: 0,
                                position: 'absolute',
                                width: '100%',
                                padding: 10,
                            }}>
                                <Text style={[MainStyles.textWhite, { fontSize: 20, }]} >หนูโต</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.onSelectType(2)}
                    >
                        <ImageBackground
                            source={require('../../assets/image/1.jpeg')}
                            style={{
                                height: 200,
                                opacity: 0.8,
                                borderRadius: 6,
                                marginTop: 20
                            }}
                            imageStyle={{ borderRadius: 6 }}
                        >
                            <View style={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                bottom: 0,
                                position: 'absolute',
                                width: '100%',
                                padding: 10,
                            }}>
                                <Text style={[MainStyles.textWhite, { fontSize: 20, }]} >ลูกหนู</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({

});