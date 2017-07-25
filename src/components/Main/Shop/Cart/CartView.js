/**
 * cartview component:
 * - render màn hình giỏ hàng.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView, ToastAndroid,
} from 'react-native';
import global from '../../../global';
import getToken from '../../../../api/getToken';

import baseURL from '../../../../api/connect';
const url = `${baseURL}/api/images/product/`;

import iconAdd from '../../../../media/appIcon/ic_add.png';
import iconMinus from '../../../../media/appIcon/ic_minus.png';
import iconClose from '../../../../media/appIcon/ic_close.png';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default class CartView extends Component {
    incrQuantity(productId, number) {
        global.incrQuantity(productId, number);
    }
    decrQuantity(productId, number) {
        global.decrQuantity(productId, number);
    }
    removeProduct(productId) {
        global.removeProduct(productId);
    }
    gotoProductDetail(product) {
        this.props.navigator.push({ name: 'PRODUCT_DETAIL', product });
    }
    gotoFormOrder() {
        getToken()
            .then(token => {
                if (token === '' || token === 'TOKEN_KHONG_HOP_LE') {
                    ToastAndroid.show('Vui lòng đăng nhập để tiếp tục', ToastAndroid.SHORT);
                    return;
                }
                if (this.props.cartArray.length == 0) {
                    ToastAndroid.show('Giỏ hàng chưa có sản phẩm', ToastAndroid.SHORT);
                    return;
                }
                this.props.navigator.push({ name: 'FORM_ORDER' });
            })
            .catch(err => console.log(err));
    }
    render() {
        const { main, checkoutButton, checkoutTitle, wrapper,
            productStyle, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer, txtQuantity, iconStyle } = styles;
        const { cartArray } = this.props;
        const arrTotalMoneyonProduct = cartArray.map(e => e.product.price * e.quantity);
        const TotalMoneyonBill = arrTotalMoneyonProduct.length ? arrTotalMoneyonProduct.reduce((a, b) => a + b) : 0;
        return (
            <View style={wrapper}>
                <ListView
                    contentContainerStyle={main}
                    enableEmptySections
                    dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => { r1 !== r2 } }).cloneWithRows(cartArray)}
                    renderRow={(cartItem) => (
                        <View style={productStyle}>
                            <Image source={{ uri: `${url}${cartItem.product.images[0]}` }} style={productImage} />
                            <View style={mainRight}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={txtName}>{toTitleCase(cartItem.product.name)}</Text>
                                    <TouchableOpacity onPress={() => this.removeProduct(cartItem.product.id)}>
                                        <Image source={iconClose} style={iconStyle} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={txtPrice}>VNĐ {cartItem.product.price}</Text>
                                </View>
                                <View style={productController}>
                                    <View style={numberOfProduct}>
                                        <TouchableOpacity
                                            onPress={() => this.incrQuantity(cartItem.product.id)}
                                            onLongPress={() => this.incrQuantity(cartItem.product.id, 5)}
                                        >
                                            <Image source={iconAdd} style={iconStyle} />
                                        </TouchableOpacity>
                                        <Text style={txtQuantity}>{cartItem.quantity} kg</Text>
                                        <TouchableOpacity
                                            onPress={() => this.decrQuantity(cartItem.product.id)}
                                            onLongPress={() => this.decrQuantity(cartItem.product.id, 5)}
                                        >
                                            <Image source={iconMinus} style={iconStyle} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={showDetailContainer} onPress={() => this.gotoProductDetail(cartItem.product)}>
                                        <Text style={txtShowDetail}>Xem chi tiết</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
                <TouchableOpacity style={checkoutButton} onPress={this.gotoFormOrder.bind(this)}>
                    <Text style={checkoutTitle}>TỔNG VNĐ {TotalMoneyonBill} - THANH TOÁN</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#DFDFDF'
    },
    iconStyle: { width: 25, height: 25 },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    productStyle: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#34B089',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    txtQuantity: {
        color: '#34B089',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});