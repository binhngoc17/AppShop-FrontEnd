import React, { Component } from 'react';
import { View } from 'react-native';

import RedScreenView from './RedScreenView';
import FormFastOrder from './FormFastOrder';

export default class RedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: 1,
        };
    }
    gotoFormFastOrder() {
        this.setState({ check: 0 });
    }
    render() {
        const { navigator, numDate } = this.props;
        const mainJSX = this.state.check ? <RedScreenView gotoFormFastOrder={this.gotoFormFastOrder.bind(this)} numDate={numDate} /> : <FormFastOrder navigator={navigator} />;
        return (
            <View style={{ flex: 1 }}>
                {mainJSX}
            </View>
        );
    }
}