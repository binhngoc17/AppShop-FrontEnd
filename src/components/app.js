import React, {Component} from 'react';
import {
    Navigator,
    StyleSheet,
} from 'react-native';
import Authentication from './Authentication/Authentication';
import ChangeInfo from './ChangeInfo/ChangeInfo';
import Main from './Main/Main';
import OrderHistory from './OrderHistory/OrderHistory';

export default class App extends Component {
    renderScene(route, navigator) {
        switch (route.name) {
            case 'Authentication':
                return <Authentication navigator={navigator}/>
            case 'ChangeInfo':
                return <ChangeInfo navigator={navigator}/>
            case 'Main':
                return <Main navigator={navigator}/>
            case 'OrderHistory':
                return <OrderHistory navigator={navigator}/>
        }
    }
    render() {
        return (
            <Navigator
                initialRoute={{ name: 'Main', title: 'Main' }}
                renderScene={this.renderScene}
                configureScene={route => {
                    if(route.name === 'Authentication')
                        return Navigator.SceneConfigs.FloatFromRight;
                    return Navigator.SceneConfigs.FloatFromLeft;
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: 'green',
        height: 60,
    },
    backButton: {
        marginTop: 8,
        marginLeft: 12,
        height: 24,
        width: 24
    },
    title: {
        padding: 8,
        fontSize: 16,
        fontWeight: 'bold'
    }
});