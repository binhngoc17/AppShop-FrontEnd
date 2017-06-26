import React, { Component } from 'react';
import {
    Navigator,
} from 'react-native';
import Authentication from './Authentication/Authentication';
import ChangeInfo from './ChangeInfo/ChangeInfo';
import Main from './Main/Main';
import OrderHistory from './OrderHistory/OrderHistory';
import Notification from './Notification/Notification';

import refreshToken from '../api/refreshToken';

export default class App extends Component {
    componentDidMount() {
        setInterval(refreshToken, 30000);
    }
    renderScene(route, navigator) {
        switch (route.name) {
            case 'Authentication':
                return <Authentication navigator={navigator} />
            case 'ChangeInfo':
                return <ChangeInfo navigator={navigator} user={route.user} />
            case 'Main':
                return <Main navigator={navigator} />
            case 'OrderHistory':
                return <OrderHistory navigator={navigator} />
            case 'Notification':
                return <Notification navigator={navigator} />
        }
    }
    render() {
        return (
            <Navigator
                initialRoute={{ name: 'Notification', title: 'Main' }}
                renderScene={this.renderScene}
                configureScene={route => {
                    if (route.name === 'Authentication')
                        return Navigator.SceneConfigs.FloatFromRight;
                    return Navigator.SceneConfigs.FloatFromLeft;
                }}
            />
        )
    }
}