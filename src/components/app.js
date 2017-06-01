import React, {Component} from 'react';
import {
    Navigator,
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
                return <ChangeInfo navigator={navigator} user={route.user}/>
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