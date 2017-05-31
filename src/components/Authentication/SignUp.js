import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, } from 'react-native';
import register from '../../api/register';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            rePassword: '',
        };
    }
    onSuccess() {
        Alert.alert(
            'Notice',
            'Sign up successfully',
            [
                { text: 'OK', onPress: () => this.props.gotoSignIn() },
            ],
            { cancelable: false }
        )
    }
    onFail() {
        Alert.alert(
            'Notice',
            'Email have been used by other',
            [
                { text: 'OK', onPress: () => this.removeEmail() },
            ],
            { cancelable: false }
        )
    }
    removeEmail() {
        this.setState({ email: '' });
    }
    checkRePass() {
        const { password, rePassword } = this.state;
        console.log(password);
        console.log(rePassword);
        if (password !== rePassword)
            Alert.alert(
                'Notice',
                'Password is not correct',
                [
                    { text: 'OK', onPress: () => this.setState({ rePassword: '' }) },
                ],
                { cancelable: false }
            );
    }
    registerUser() {
        const { name, email, password } = this.state;
        register(email, name, password)
            .then(resText => {
                if (resText === 'THANH_CONG') return this.onSuccess();
                return this.onFail();
            });
    }
    render() {
        const { inputStyle, bigButton, buttonText } = styles;
        const { name, email, password, rePassword } = this.state;
        return (
            <View>
                <TextInput
                    style={inputStyle}
                    underlineColorAndroid='transparent'
                    placeholder='Enter your name'
                    onChangeText={(text) => this.setState({ name: text })}
                    value={name}
                />
                <TextInput
                    style={inputStyle}
                    underlineColorAndroid='transparent'
                    placeholder='Enter your email'
                    onChangeText={(text) => this.setState({ email: text })}
                    value={email}
                />
                <TextInput
                    style={inputStyle}
                    underlineColorAndroid='transparent'
                    placeholder='Enter your password'
                    secureTextEntry
                    onChangeText={(text) => this.setState({ password: text })}
                    value={password}
                />
                <TextInput
                    style={inputStyle}
                    underlineColorAndroid='transparent'
                    placeholder='Re-enter your password'
                    secureTextEntry
                    onChangeText={(text) => this.setState({ rePassword: text })}
                    value={rePassword}
                    onEndEditing={this.checkRePass.bind(this)}
                />
                <TouchableOpacity style={bigButton} onPress={this.registerUser.bind(this)}>
                    <Text style={buttonText}>SIGN UP NOW</Text>
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
    alertRePassStyle: {
        height: 50,
        color: '#f44336',
        marginBottom: 2,
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

/*
componentDidMount() {
    const { name, email, password, rePassword } = this.state;
    console.log('componentDidMount');
    console.log('*************');
    console.log(name);
    console.log(email);
    console.log(password);
    console.log('*************');
}
shouldComponentUpdate(nextState) {
    if (nextState !== this.state)
        return true;
    return false;
}
componentDidUpdate() {
    const { name, email, password, rePassword } = this.state;
    console.log('componentDidUpdate');
    console.log('*************');
    console.log(name);
    console.log(email);
    console.log(password);
    console.log('*************');
}
*/