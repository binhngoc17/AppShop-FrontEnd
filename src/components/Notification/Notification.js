/**
 * Notification component:
 * - Navigation giữa GreenScreen và RedScreen.
 */
import React, { Component } from 'react';
import { View } from 'react-native';

import GreenScreen from './GreenScreen';
import RedScreen from './RedScreen/RedScreen';
import notifyOrder from '../../api/notifyOrder';
import getToken from '../../api/getToken';

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkNavi: 1,
            numDate: null,
        };
    }
    componentDidMount() {
        this.onNotifyOrder();
        // console.log("dang test red screen");
    }
    async onNotifyOrder() {
        try {
            const token = await getToken();
            if (token === '' || token === 'TOKEN_KHONG_HOP_LE') {
                console.log("khong lay duoc token");
                return;
            }
            const res = await notifyOrder(token);
            if (res.msg === "CANH_BAO") {
                this.setState({
                    checkNavi: 0,
                    numDate: res.numDate,
                });
            }
            if (res.msg === "KHONG_CANH_BAO") {
                this.setState({
                    checkNavi: 1,
                    numDate: res.numDate,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const { navigator } = this.props;
        const { numDate } = this.state;
        const mainJSX = this.state.checkNavi ? <GreenScreen navigator={navigator} numDate={numDate} /> : <RedScreen navigator={navigator} numDate={numDate} />;
        return (
            <View style={{ flex: 1 }}>
                {mainJSX}
            </View>
        );
    }
}

