import React, { Component } from 'react';
import {
    Navigator,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import TaskList from './TaskList';
import TaskListDetails from './TaskListDetails';

export default class TaskListDirectoryApp extends Component {
    renderScene(route, navigator) {
        switch (route.name) {
            case 'task-list':
                return <TaskList navigator={navigator} />
            case 'details':
                return <TaskListDetails navigator={navigator} data={route.data} />
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{ name: 'task-list', title: 'Task List' }}
                renderScene={this.renderScene}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) => {
                                if (route.name === 'task-list') {
                                    return null;
                                } else {
                                    return (
                                        <TouchableOpacity onPress={() => navigator.pop()}>
                                            <Image source={require('./assets/back.png')} style={styles.backButton} />
                                        </TouchableOpacity>
                                    );
                                }
                            },
                            RightButton: (route, navigator, index, navState) => {
                                return null;
                            },
                            Title: (route, navigator, index, navState) => {
                                return (<Text style={styles.title}>{route.title}</Text>);
                            },
                        }}
                        style={styles.navBar}
                    />
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#FAFAFF',
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