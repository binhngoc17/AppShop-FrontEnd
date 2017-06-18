import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, } from 'react-native';

import iconClose from '../../../../media/appIcon/ic_close.png';
import global from '../../../global';

export default class FormOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }
    gotoBack() {
        this.props.navigator.pop();
    }
    render() {
        const { user } = this.state;
        const { container, formWrapper, infoWrapper, textStyle, inputStyle, bigButton, buttonText, iconStyle, } = styles;
        return (
            <ScrollView style={container}>
                <View style={formWrapper}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end' }} onPress={this.gotoBack.bind(this)} >
                        <Image source={iconClose} style={iconStyle} />
                    </TouchableOpacity>
                    <View style={infoWrapper}>
                        <Text style={textStyle}>Thông tin người nhận:</Text>
                        <Text style={[textStyle, { marginLeft: 10 }]}>{user ? user.email : ''}</Text>
                        <Text style={[textStyle, { marginLeft: 10 }]}>{user ? user.name : ''}</Text>
                    </View>
                    <View style={infoWrapper}>
                        <Text style={textStyle}>Địa chỉ giao hàng:</Text>
                        <TextInput
                            style={inputStyle}
                            underlineColorAndroid='#90A4AE'
                            placeholder='Số nhà, đường'
                        />
                        <TextInput
                            style={inputStyle}
                            underlineColorAndroid='#90A4AE'
                            placeholder='Quận'
                        />
                        <TextInput
                            style={inputStyle}
                            underlineColorAndroid='#90A4AE'
                            placeholder='Tỉnh/Thành phố'
                        />
                    </View>
                    <View style={infoWrapper}>
                        <Text style={textStyle}>Vui lòng cho biết bao lâu bạn sử dụng hết gạo?</Text>
                        <TextInput
                            style={inputStyle}
                            underlineColorAndroid='#90A4AE'
                            placeholder='1 tháng'
                        />
                    </View>
                    <Text style={[textStyle, { marginTop: 10 }]}>Bạn sẽ thanh toán khi nhận hàng.</Text>
                </View>
                <TouchableOpacity style={bigButton} >
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
    textStyle: {
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
    iconStyle: { width: 15, height: 15 },
});

/**
 * <TextInput
    style={inputStyle}
    underlineColorAndroid='transparent'
    placeholder='Nhập tên của bạn'
/>
<TextInput
    style={inputStyle}
    underlineColorAndroid='transparent'
    placeholder='Nhập email của bạn'
/>
 */