/**
 * ProductDetail Component:
 * - render màn hình chi tiết sản phẩm.
 */
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    Dimensions, Image, ScrollView,
} from 'react-native';
import global from '../../../global';

import baseURL from '../../../../api/connect';
const url = `${baseURL}/api/images/product/`;

import back from '../../../../media/appIcon/back.png';
import cart from '../../../../media/appIcon/cartfull.png';


export default class ProductDetail extends Component {
    addProductToCart() {
        const { product } = this.props;
        global.addProductToCart(product);
    }
    gotoBack() {
        this.props.navigator.pop();
    }
    render() {
        const {
            wrapper, cardStyle, header,
            footer, backStyle,
            imageContainer, cartStyle, textBlack,
            textSmoke, textHighlight, textMain, titleContainer,
            descContainer, productImageStyle, descStyle, txtMaterial, txtColor
        } = styles;
        const { id, name, nameType, price, description, images, } = this.props.product;
        const SwiperImagesJSX = (
            <ScrollView horizontal >
                {images.map(e => (
                    <Image source={{ uri: `${url}${e}` }} style={productImageStyle} key={e} />
                ))}
            </ScrollView>
        );
        return (
            <View style={wrapper}>
                <View style={cardStyle}>
                    <View style={header}>
                        <TouchableOpacity onPress={this.gotoBack.bind(this)}>
                            <Image style={backStyle} source={back} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.addProductToCart.bind(this)}>
                            <Image style={cartStyle} source={cart} />
                        </TouchableOpacity>
                    </View>
                    <View style={imageContainer}>
                        {images.length ? SwiperImagesJSX : null}
                    </View>
                    <View style={footer}>
                        <View style={titleContainer}>
                            <Text style={textMain}>
                                <Text style={textBlack}>{name.toUpperCase()}</Text>
                                <Text style={textHighlight}> / </Text>
                                <Text style={textSmoke}>VNĐ {price}</Text>
                            </Text>
                        </View>
                        <View style={descContainer}>
                            <ScrollView>
                                <Text style={descStyle}>
                                    {description}
                                </Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const swiperWidth = (width / 1.8) - 30;
const swiperHeight = (swiperWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#D6D6D6',
    },
    cardStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
        alignItems: 'center',
    },
    cartStyle: {
        width: 25,
        height: 25
    },
    backStyle: {
        width: 25,
        height: 25
    },
    productStyle: {
        width: width / 2,
        height: width / 2
    },
    footer: {
        flex: 8
    },
    imageContainer: {
        flex: 4,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 10,
    },
    textMain: {
        paddingLeft: 20,
        marginVertical: 10
    },
    textBlack: {
        fontFamily: 'Avenir',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3F3F46'
    },
    textSmoke: {
        fontFamily: 'Avenir',
        fontSize: 20,
        color: '#B10D65'
    },
    textHighlight: {
        fontFamily: 'Avenir',
        fontSize: 20,
        color: '#7D59C8'
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderColor: '#F6F6F6',
        marginHorizontal: 20,
        paddingBottom: 2
    },
    descContainer: {
        margin: 10,
        paddingTop: 3,
        paddingHorizontal: 10
    },
    descStyle: {
        color: '#AFAFAF'
    },
    linkStyle: {
        color: '#7D59C8'
    },
    productImageStyle: {
        width: swiperWidth,
        height: swiperHeight,
        marginHorizontal: 5
    },
    mainRight: {
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingLeft: 20
    },
    txtColor: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtMaterial: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    }
});