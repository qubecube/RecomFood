
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

export default class Recommend extends Component {

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

    onGroup(type) {
        if (type === 1) {
            Linking.openURL("https://web.facebook.com/groups/351042252432873/");
        } else {
            Linking.openURL("https://web.facebook.com/groups/849983811864776/");
        }
    }

    render() {
        const { isCheckAlert, loading } = this.state
        return (
            <SafeAreaView style={MainStyles.content} forceInset={{ bottom: 'always', top: 'never' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {isCheckAlert}
                    {loading ? <Spinner visible={true} overlayColor={"rgba(0,0,0, 0.65)"} color={"#ffac2a"} /> : null}
                    <Text style={[MainStyles.textGrayBd]}>
                        1. พ่อแม่พันธุ์ของหนูพุกสามารถหาได้จากแหล่งธรรมชาติ เช่น ท้องนา หรือสวน แต่ถ้าผู้เลี้ยงไม่มีความเชี่ยวชาญในการจับและต้องการความสะดวก สามารถหาซื้อพ่อแม่พันธุ์จากฟาร์มที่น่าเชื่อถือ มาเพาะพันธุ์ โดยอายุที่เริ่มผสมพันธุ์อยู่ที่ 4 เดือนขึ้นไป ในส่วนของราคาของพ่อแม่พันธุ์จะค่อนข้างสูง เนื่องจากฟาร์มต้องคัดและเลือกพ่อพันธุ์แม่พันธุ์หนูพุกที่มีการผสมพันธุ์และมีการคลอดลูกหนูก่อนหนึ่งคอก จึงจะนำมาจำหน่ายเป็นพ่อพันธุ์และแม่พันธุ์ได้
                    </Text>
                    <Text style={[MainStyles.textGrayBd, MainStyles.mt10]}>
                        2. อายุเฉลี่ยของพ่อแม่พันธุ์หนูนั้นจะอยู่ประมาณ 2 ปี และจะมีการคัดเลือกลูกหนูในฟาร์มที่มีลักษณะที่ดี หางใหญ่ ตัวใหญ่กว่าหนูรุ่นเดียวกัน มีการเจริญเติบโตที่ดี กินอาหารเก่ง มีความสมบูรณ์ที่สุด จะถูกเลือกมาเป็นพ่อแม่พันธุ์
                    </Text>
                    <Text style={[MainStyles.textGrayBd, MainStyles.mt10]}>
                        3. แม่พันธุ์ที่สมบูรณ์จะสามารถคลอดลูกได้ครั้งละ 7-10 ตัว โดยแม่พันธุ์ที่ให้นมลูกและเลี้ยงลูกหนูนาครบ 1 เดือนแล้วสามารถนำไปผสมพันธุ์ต่อได้
                    </Text>
                    <Text style={[MainStyles.textGrayBd, MainStyles.mt10]}>
                        4. หากเลี้ยงในท่อแบบท่อเดียวให้ใช้อัตราในการผสมอยู่ที่ 1:1 หากเลี้ยงแบบท่อต่อกัน 2-3 ท่อ ก็สามารถผสมพันธุ์ได้ถึง 7-8 คู่ สามารถใส่ตัวผู้และตัวเมียเท่ากันหรือจะแบ่งเป็นตัวผู้ 3 ตัวเมีย 6-7 ตัวก็ได้
                    </Text>
                    <Text style={[MainStyles.textGrayBd, MainStyles.mt10]}>
                        5. เมื่อแม่พันธุ์เริ่มตั้งท้องให้จับแม่หนูพุกแยกออกจากบ่อ เพราะหนูพุกตัวผู้จะกินลูกหนูที่พึ่งคลอดเพราะผิดกลิ่น
                    </Text>
                    <Text style={[MainStyles.textGrayBd, MainStyles.mt10]}>
                        6. หนูพุกจะใช้เวลาตั้งท้องอยู่ที่ 1 เดือนก็จะคลอดลูก ให้แม่หนูเลี้ยงลูกหนูพุกด้วยนมอีกประมาณ 1 เดือนค่อยจับแม่พันธุ์แยกออกมา
                    </Text>
                    <Text style={[MainStyles.textGrayBd, MainStyles.mt10]}>
                        7. เทคนิคการดูเพศหนูพุก คือให้หงายท้องหนูพุกขึ้น ถ้าเป็นตัวผู้จะสังเกตเห็นลูกอัณฑะอย่างชัดเจนและพบรูทวาร แต่ถ้าเป็นตัวเมียจะสังเกตเห็นนมซึ่งสามารถเห็นได้อย่างชัดเจน จะพบช่องคลอดอยู่บริเวณหน้าท้อง และพบรูทวาร (ถ้าหนูอายุประมาณ 1 เดือน จะแยกเพศยาก เพราะอวัยวะเพศยังไม่ชัด และมีขนมาปกคลุม แนะนำให้แยกอีกครั้งตอนหนูอายุ 2 เดือน ให้สังเกตบริเวณใต้หาง ตัวผู้จะมีรูเดียว และมีอัณฑะ ส่วนตัวเมียจะมี 2 รู จะเป็นรูถ่าย และอวัยวะเพศ)
                    </Text>
                    <Text style={[MainStyles.textGrayBd, MainStyles.mt10]}>
                        8. หนูจะเริ่มขายได้เมื่ออายุ 2 เดือนครึ่ง ถึง 3 เดือน จะเป็นช่วงที่ขายแล้วได้กำไร ได้น้ำหนักประมาณ 4-6 ขีด
                    </Text>
                    <Text style={[MainStyles.textGrayBd, MainStyles.mt10]}>
                        9. อาหารสำหรับหนูพุก  ได้แก่ หัวอาหารหมูนม ท่อนอ้อย มันสำปะหลัง ข้าวสาร หญ้า หอยเชอรี่ น้ำเปล่า เวลาที่ให้อาหารก็คือช่วงตอนเย็นทุกวัน เพราะตามนิสัยของหนูจะออกหากินในเวลากลางคืน
                    </Text>
                    <Text style={[MainStyles.textGrayBd, MainStyles.mt10]}>
                        10. ระหว่างที่แม่หนูออกลูก ซึ่งใช้เวลาไม่เกิน 24 ชม. ช่วงนี้งดให้อาหารห้ามเปิดฝา ห้ามรบกวน เพราะถ้าพ่อแม่พันธุ์ตกใจจะกัดลูก
                    </Text>
                </ScrollView>
                <View style={[MainStyles.btnContent]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.onGroup(1)}
                        style={[MainStyles.btnOrange]}
                    >
                        <Text allowFontScaling={false} style={MainStyles.btnOrangeText}>กลุ่มซื้อขายหนูเนื้อ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.onGroup(2)}
                        style={[MainStyles.btnOrange, { marginTop: 10 }]}
                    >
                        <Text allowFontScaling={false} style={MainStyles.btnOrangeText}>กลุ่มเพาะพันธุ์หนูเพื่อบริโภคและธุรกิจ</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({

});