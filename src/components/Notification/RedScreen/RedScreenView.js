import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

import iconWarning from '../../../media/appIcon/ic_warning.png';

export default class RedScreenView extends Component {
    gotoFormFastOrder() {
        this.props.gotoFormFastOrder();
    }
    render() {
        const { numDate } = this.props;
        const { container, wrapperNotify, textStyle, bigButton, buttonText, iconStyle } = styles;
        return (
            <View style={container}>
                <View />
                <Image source={iconWarning} style={iconStyle} />
                <View style={wrapperNotify}>
                    <Text style={textStyle}>Gạo sẽ hết sau {numDate} ngày nữa</Text>
                </View>
                <TouchableOpacity style={bigButton} onPress={this.gotoFormFastOrder.bind(this)}>
                    <Text style={buttonText}>Đặt hàng nhanh</Text>
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
        backgroundColor: '#b71c1c',
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
    iconStyle: { width: 250, height: 250 },
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