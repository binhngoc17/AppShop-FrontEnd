import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Picker, ScrollView, TextInput, ToastAndroid, Alert } from 'react-native';

import getToken from '../../../api/getToken';
import getInfoFormOrder from '../../../api/getInfoFormOrder';
import sendOrder from '../../../api/sendOrder';

import iconClose from '../../../media/appIcon/ic_close.png';
import iconAdd from '../../../media/appIcon/ic_add.png';
import iconMinus from '../../../media/appIcon/ic_minus.png';
import iconUser from '../../../media/appIcon/ic_user.png';
import iconPhone from '../../../media/appIcon/ic_phone.png';

export default class FormFastOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            address: '',
            district: '',
            city: '',
            numMonth: 1,
            cartArray: [],
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
                    cartArray: [...resJSON.arrayDetail],
                });
            })
            .catch(err => console.log("error get info form: " + err));
    }
    async onSendOrder() {
        try {
            const token = await getToken();
            const { address, district, city, numMonth, cartArray } = this.state;
            const arrayDetail = cartArray.map(e => ({
                id: e.id,
                price: e.price,
                quantity: e.quantity
            }));
            const res = await sendOrder(token, numMonth, address, district, city, arrayDetail);
            if (res === "THEM_THANH_CONG") {
                ToastAndroid.show('Đặt hàng thành công', ToastAndroid.SHORT);
            }
            else {
                ToastAndroid.show('Oh, có lỗi gì đó, vui lòng thử lại sau, chúng tôi xin lỗi bạn', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log(error);
        }
    }
    incrQuantity(productId) {
        const newCart = this.state.cartArray.map(e => {
            if (e.id !== productId)
                return e;
            return { id: e.id, name: e.name, price: e.price, quantity: e.quantity + 1 };
        });
        this.setState({ cartArray: newCart });
    }
    decrQuantity(productId) {
        const newCart = this.state.cartArray.map(e => {
            if (e.id !== productId)
                return e;
            if (e.quantity === 1)
                return e;
            return { id: e.id, name: e.name, price: e.price, quantity: e.quantity - 1 };
        });
        this.setState({ cartArray: newCart });
    }
    gotoMain() {
        Alert.alert(
            'Thông báo',
            'Bạn không muốn đặt hàng nhanh theo đơn hàng cũ. Lựa chọn sản phẩm khác?',
            [
                { text: 'OK', onPress: () => this.props.navigator.push({ name: 'Main' }) },
            ],
            { cancelable: false }
        )
    }
    render() {
        const { user, address, district, city, numMonth, cartArray } = this.state;
        const { container, formWrapper, infoWrapper, productWrapper, titleStyle,
            inputStyle, bigButton, buttonText, iconStyle, numberOfProduct, txtPriceStyle } = styles;
        const arrTotalMoneyonProduct = cartArray.map(e => e.price * e.quantity);
        const TotalMoneyonBill = arrTotalMoneyonProduct.length ? arrTotalMoneyonProduct.reduce((a, b) => a + b) : 0;
        const productsJSX = (
            <View style={infoWrapper}>
                <Text style={titleStyle}>Sản phẩm theo đơn hàng mới nhất:</Text>
                {cartArray.map(e => (
                    <View style={productWrapper} key={e.id}>
                        <View style={numberOfProduct}>
                            <View />
                            <Text style={titleStyle}>{e.name}</Text>
                            <View />
                        </View>
                        <View style={numberOfProduct}>
                            <View />
                            <Text style={titleStyle}>VNĐ {e.price}</Text>
                            <View />
                        </View>
                        <View style={numberOfProduct}>
                            <TouchableOpacity onPress={() => this.incrQuantity(e.id)}>
                                <Image source={iconAdd} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                            <Text style={titleStyle}>{e.quantity} kg</Text>
                            <TouchableOpacity onPress={() => this.decrQuantity(e.id)}>
                                <Image source={iconMinus} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                <View style={productWrapper}>
                    <Text style={txtPriceStyle}>Tổng: VNĐ {TotalMoneyonBill}</Text>
                </View>
            </View>
        );
        return (
            <ScrollView style={container}>
                <View style={formWrapper}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end' }} onPress={this.gotoMain.bind(this)} >
                        <Image source={iconClose} style={iconStyle} />
                    </TouchableOpacity>
                    {cartArray.length ? productsJSX : null}
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
    productWrapper: {
        borderColor: '#90A4AE',
        borderTopWidth: 0.5,
        padding: 5,
    },
    numberOfProduct: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    txtPriceStyle: {
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
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