/**
 * SignIn Component
 * - render màn hình đăng nhập.
 */
import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid, } from 'react-native';
import login from '../../api/login';
import global from '../global';
import saveToken from '../../api/saveToken';
import getToken from '../../api/getToken';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    onFail() {
        Alert.alert(
            'Thông báo',
            'Đăng nhập không thành công, hãy nhập lại mật khẩu',
            [
                { text: 'OK', onPress: () => this.removePassword() },
            ],
            { cancelable: false }
        )
    }
    removePassword() {
        this.setState({ password: '' });
    }
    onSignIn() {
        const { email, password } = this.state;
        if(email === '' || password === '') {
            ToastAndroid.show('Xin đừng để trống email và mật khẩu', ToastAndroid.SHORT);
            return false;
        }
        login(email, password)
            .then(resJSON => {
                // console.log(resJSON);
                global.onSignIn(resJSON.user);
                saveToken(resJSON.token);
                ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
                this.props.goBacktoMain();
            })
            .catch(err => {
                console.log(err);
                this.onFail();
            });
    }
    render() {
        const { inputStyle, bigButton, buttonText } = styles;
        const { email, password } = this.state;
        return (
            <View>
                <TextInput
                    style={inputStyle}
                    underlineColorAndroid='transparent'
                    placeholder='Nhập email của bạn'
                    keyboardType='email-address'
                    onChangeText={(text) => this.setState({ email: text })}
                    value={email}
                />
                <TextInput
                    style={inputStyle}
                    underlineColorAndroid='transparent'
                    placeholder='Nhập mật khẩu của bạn'
                    secureTextEntry
                    onChangeText={(text) => this.setState({ password: text })}
                    value={password}
                />
                <TouchableOpacity style={bigButton} onPress={this.onSignIn.bind(this)}>
                    <Text style={buttonText}>Đăng nhập ngay</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30
    },
    bigButton: {
        height: 50,
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
    }
});