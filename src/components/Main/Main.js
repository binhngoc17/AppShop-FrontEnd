import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Drawer from 'react-native-drawer';
import Menu from './Menu';
import Shop from './Shop/Shop';

export default class Main extends Component {
    closeControlPanel = () => {
        this.drawer.close();
    };
    openControlPanel = () => {
        this.drawer.open();
    };
    render() {
        const { navigator } = this.props;
        return(
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<Menu navigator={navigator}/>}
                tapToClose
                openDrawerOffset={0.4}
            >
                <Shop openDrawer={this.openControlPanel.bind(this)}/>
            </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF3D00',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
});