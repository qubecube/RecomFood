
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

export default class HistoryInside extends Component {

    state = {
        loading: false,
        isCheckAlert: null,
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

    onHistoryDetail(){
        this.props.navigation.navigate('HistoryDetail')
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
                        onPress={() => this.onHistoryDetail()}
                        style={MainStyles.Card}
                    >
                        <View style={MainStyles.Card2Col}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray]}>ครั้งที่ 1</Text>
                            <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textGray]}>3 มีนาคม 2565</Text>
                        </View>
                        <View style={[MainStyles.Card2Col]}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray, MainStyles.textOrange, MainStyles.Text26]}>หนูโต</Text>
                        </View>
                        <View style={MainStyles.BorderBottomGrayWhite}></View>
                        <View style={MainStyles.Card2Col}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray]}>ราคากรมปศุสัตว์ (กรัม)</Text>
                            <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textGray]}>ตัวละ (บาท)</Text>
                        </View>
                        <View style={MainStyles.Card2Col}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray, MainStyles.textOrange, MainStyles.Text16]}>1000</Text>
                            <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textOrange, MainStyles.Text16]}>300</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.onHistoryDetail()}
                        style={MainStyles.Card}
                    >
                        <View style={MainStyles.Card2Col}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray]}>ครั้งที่ 2</Text>
                            <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textGray]}>12 เมษายน 2565</Text>
                        </View>
                        <View style={[MainStyles.Card2Col]}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray, MainStyles.textOrange, MainStyles.Text26]}>ลูกหนู</Text>
                        </View>
                        <View style={MainStyles.BorderBottomGrayWhite}></View>
                        <View style={MainStyles.Card2Col}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray]}>ราคากรมปศุสัตว์ (กรัม)</Text>
                            <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textGray]}>ตัวละ (บาท)</Text>
                        </View>
                        <View style={MainStyles.Card2Col}>
                            <Text allowFontScaling={false} style={[MainStyles.textGray, MainStyles.textOrange, MainStyles.Text16]}>300</Text>
                            <Text allowFontScaling={false} style={[MainStyles.Card2ColRight, MainStyles.textOrange, MainStyles.Text16]}>150</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({

});