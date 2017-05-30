import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default class TaskListItem extends Component {
    showDetails() {
        this.props.navigator.push({name: 'details', data: this.props.data})
    }

    render() {
        return(
            <TouchableOpacity onPress={this.showDetails.bind(this)} underlayColor={'#EEEEEE'}>
                <Text style={styles.title}>{this.props.data.title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#858585',
        fontWeight: '400',
        textAlign: 'left',
    }
});