import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TextInput,
    ScrollView, TouchableOpacity, Image, ToastAndroid, Picker,
} from 'react-native';

import global from '../../../global';
import getInfoFormOrder from '../../../../api/getInfoFormOrder';
import getToken from '../../../../api/getToken';
import sendOrder from '../../../../api/sendOrder';
import setUnitOnBill from '../../../../api/setUnitOnBill';
import saveCart from '../../../../api/saveCart';

import iconClose from '../../../../media/appIcon/ic_close.png';
import iconUser from '../../../../media/appIcon/ic_user.png';
import iconPhone from '../../../../media/appIcon/ic_phone.png';

export default class FormOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            address: '',
            district: '',
            city: '',
            numMonth: 1,
        };
    }
    componentDidMount() {
        getToken()
            .then(token => getInfoFormOrder(token))
            .then(resJSON => {
                this.setState({
                    user: resJSON.user,
                    address: resJSON.addr.address,
                    district: resJSON.addr.district,
                    city: resJSON.addr.city,
                });
            })
            .catch(err => console.log("error get info form: " + err));
    }
    async onSendOrder() {
        try {
            const token = await getToken();
            const { address, district, city, numMonth } = this.state;
            const { cartArray } = this.props;
            const arrayDetail = cartArray.map(e => ({
                id: e.product.id,
                price: e.product.price,
                quantity: e.quantity
            }));

            const arrProductId = cartArray.map(e => (e.product.id));

            const res = await sendOrder(token, numMonth, address, district, city, arrayDetail);
            if (res === "THEM_THANH_CONG") {
                saveCart([]);
                ToastAndroid.show('Đặt hàng thành công', ToastAndroid.SHORT);
            }
            else {
                ToastAndroid.show('Oh, có lỗi gì đó, vui lòng thử lại sau, chúng tôi xin lỗi bạn', ToastAndroid.SHORT);
            }

            let len = arrProductId.length;
            for (let index = 0; index < len; index++) {
                let productId = arrProductId[index];
                let res = await setUnitOnBill(productId);
            }

        } catch (error) {
            console.log(error);
        }
    }
    gotoBack() {
        this.props.navigator.pop();
    }
    render() {
        const { user, address, district, city, numMonth } = this.state;
        const { container, formWrapper, infoWrapper, titleStyle, inputStyle, bigButton, buttonText, iconStyle, } = styles;
        return (
            <ScrollView style={container}>
                <View style={formWrapper}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end' }} onPress={this.gotoBack.bind(this)} >
                        <Image source={iconClose} style={iconStyle} />
                    </TouchableOpacity>
                    <View style={infoWrapper}>
                        <Text style={titleStyle}>Người đặt hàng:</Text>
                        <View style={{ flexDirection: 'row', padding: 5 }}>
                            <Image source={iconUser} style={[iconStyle, { marginRight: 5 }]} />
                            <Text style={[titleStyle, { color: '#212121' }]}>{user ? user.name : ''}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5 }}>
                            <Image source={iconPhone} style={[iconStyle, { marginRight: 5 }]} />
                            <Text style={[titleStyle, { color: '#212121' }]}>{user ? user.phone : ''}</Text>
                        </View>
                    </View>
                    <View style={infoWrapper}>
                        <Text style={titleStyle}>Địa chỉ giao hàng:</Text>
                        <TextInput
                            style={inputStyle}
                            underlineColorAndroid='#90A4AE'
                            placeholder='Số nhà, đường'
                            value={address}
                            onChangeText={(text) => this.setState({ address: text })}
                        />
                        <TextInput
                            style={inputStyle}
                            underlineColorAndroid='#90A4AE'
                            placeholder='Quận'
                            value={district}
                            onChangeText={(text) => this.setState({ district: text })}
                        />
                        <TextInput
                            style={inputStyle}
                            underlineColorAndroid='#90A4AE'
                            placeholder='Tỉnh/Thành phố'
                            value={city}
                            onChangeText={(text) => this.setState({ city: text })}
                        />
                    </View>
                    <View style={infoWrapper}>
                        <Text style={titleStyle}>Vui lòng cho biết bao lâu bạn sử dụng hết gạo?</Text>
                        <Picker
                            selectedValue={numMonth.toString()}
                            onValueChange={(itemValue, itemIndex) => this.setState({ numMonth: parseInt(itemValue) })}>
                            <Picker.Item label="1 tháng" value='1' />
                            <Picker.Item label="2 tháng" value='2' />
                            <Picker.Item label="3 tháng" value='3' />
                            <Picker.Item label="4 tháng" value='4' />
                            <Picker.Item label="5 tháng" value='5' />
                            <Picker.Item label="6 tháng" value='6' />
                        </Picker>
                    </View>
                    <Text style={[titleStyle, { marginTop: 10 }]}>Bạn sẽ thanh toán khi nhận hàng.</Text>
                </View>
                <TouchableOpacity style={bigButton} onPress={this.onSendOrder.bind(this)}>
                    <Text style={buttonText}>Đặt hàng</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DFDFDF',
    },
    formWrapper: {
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    },
    infoWrapper: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#90A4AE',
    },
    titleStyle: {
        fontSize: 15,
        marginBottom: 10,
    },
    inputStyle: {
        height: 50,
        marginBottom: 10,
    },
    bigButton: {
        margin: 10,
        height: 50,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#2ABB9C',
        backgroundColor: '#2ABB9C',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontWeight: '400'
    },
    iconStyle: { width: 20, height: 20 },
});

/**
 * <TextInput
    style={inputStyle}
    underlineColorAndroid='#90A4AE'
    placeholder='1 tháng'
    value={numMonth}
    onChangeText={(text) => {
        this.setState({ numMonth: parseInt(text) })
    }}
/>
 */