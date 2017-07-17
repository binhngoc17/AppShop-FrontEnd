/**
 * GreenScreen Component:
 * - render màn hình chào.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, } from 'react-native';

import iconLogo from '../../media/appIcon/ic_logo.png';

export default class GreenScreen extends Component {
    gotoMain() {
        this.props.navigator.push({ name: 'Main' });
    }
    render() {
        const { numDate } = this.props;
        const { container, textStyle, bigButton, buttonText, iconStyle, titleStyle, wrapperNotify } = styles;
        const mainJSX = (
            <View style={wrapperNotify}>
                <Text style={textStyle}>Gạo sẽ hết sau {numDate} ngày nữa</Text>
            </View>
        );
        return (
            <View style={container}>
                <View />
                <View style={{ alignItems: 'center' }}>
                    <Image source={iconLogo} style={iconStyle} />
                    <Text style={titleStyle}>Gạo Ngon & Rẻ</Text>
                </View>
                {numDate ? mainJSX : null}
                <TouchableOpacity style={bigButton} onPress={this.gotoMain.bind(this)}>
                    <Text style={buttonText}>Tiếp tục mua sắm</Text>
                </TouchableOpacity>
                <View />
            </View>
        );
    }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34B089',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrapperNotify: {
        height: 70,
        width: width,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconStyle: { width: 100, height: 100 },
    titleStyle: {
        marginTop: 5,
        fontSize: 30,
        color: '#FAFAFA',
    },
    textStyle: {
        fontSize: 20,
        color: '#FAFAFA',
        fontWeight: '400',
    },
    bigButton: {
        height: 50,
        width: width / 3 * 2,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontWeight: '400'
    },
});