import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
} from 'react-native';
import TaskListItem from './TaskListItem';
import * as taskListService from './server/TaskListAppServer';

export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
        console.log('this is contructor()');
    }

    componentWillMount() {
        this.fetchData();
        console.log('this is componentWillMount()');
    }

    fetchData() {
        console.log('this is fechData()');
        taskListService.findAll().then(tasks => {
            console.log(tasks);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(tasks)
            });
        });
    }

    render() {
        console.log('this is render()');
        return(
            <ListView style={styles.container}
                      dataSource={this.state.dataSource}
                      renderRow={(rowData) => <TaskListItem navigator={this.props.navigator} data={rowData}/>}
                      enableEmptySections={true}
                      renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                      />
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 20,
    },
    container: {
        flex: 1,
        marginTop: 70,
        backgroundColor: '#FFFFFF',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#AAAAAA',
    }
});