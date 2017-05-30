import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default class TaskListDetails extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.wrapTitle}>
                    <Text style={styles.title}>{this.props.data.title}</Text>
                </View>
                <View style={styles.wrapNote}>
                    <Text style={styles.note}>{this.props.data.note}</Text>
                </View>
                <View style={styles.wrapButton}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
        backgroundColor: '#FFFFFF',
    },
    wrapTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapNote: {
        flex: 3,
    },
    wrapButton: {
        flex: 1,
    },
    title: {
        color: '#858585',
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
    },
    note: {
        color: '#212121',
        fontSize: 10,
        textAlign: 'left',
    }
});