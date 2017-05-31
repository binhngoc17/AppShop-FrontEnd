import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';

import iconBack from '../../media/appIcon/back_white.png';
import iconLogo from '../../media/appIcon/ic_logo.png';

export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignIn: false,
        };
        // console.log("this is constructor");
        // console.log(this.state.isSignIn);
    }
    gotoSignIn() {
        this.setState({
            isSignIn: true,
        });
    }

    signIn() {
        this.setState({
            isSignIn: true,
        });
        // console.log("this is func signIn");
        // console.log(this.state.isSignIn);
    }

    signUp() {
        this.setState({
            isSignIn: false,
        });
        // console.log("this is func signUp");
        // console.log(this.state.isSignIn);
    }

    goBacktoMain() {
        this.props.navigator.pop();
    }

    render() {
        const { container, row1, iconStyle, titleStyle,
            controlStyle, signInStyle, signUpStyle,
            inactiveStyle, activeStyle
        } = styles;
        const { isSignIn } = this.state;
        const mainJSX = isSignIn ? <SignIn goBacktoMain={this.goBacktoMain.bind(this)}/> : <SignUp gotoSignIn={this.gotoSignIn.bind(this)} />;
        return (
            <View style={container}>
                <View style={row1}>
                    <TouchableOpacity onPress={this.goBacktoMain.bind(this)}>
                        <Image source={iconBack} style={iconStyle} />
                    </TouchableOpacity>
                    <Text style={titleStyle}>Wearing a Dress</Text>
                    <Image source={iconLogo} style={iconStyle} />
                </View>
                {mainJSX}
                <View style={controlStyle}>
                    <TouchableOpacity style={signInStyle} onPress={this.signIn.bind(this)}>
                        <Text style={isSignIn ? activeStyle : inactiveStyle}>SIGN IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={signUpStyle} onPress={this.signUp.bind(this)}>
                        <Text style={!isSignIn ? activeStyle : inactiveStyle}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34B089',
        padding: 20,
        justifyContent: 'space-between',
    },
    row1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: 25 },
    iconStyle: { width: 30, height: 30 },
    controlStyle: {
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    signInStyle: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 15,
        flex: 1,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        marginRight: 1
    },
    signUpStyle: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        alignItems: 'center',
        flex: 1,
        marginLeft: 1,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20
    },
    inactiveStyle: {
        color: '#D7D7D7'
    },
    activeStyle: {
        color: '#3EBA77'
    },
});