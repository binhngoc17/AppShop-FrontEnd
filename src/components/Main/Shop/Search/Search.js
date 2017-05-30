import React, { Component } from 'react';
import {
    Navigator,
} from 'react-native';
import SearchView from './SearchView';
import ProductDetail from '../ProductDetail/ProductDetail';

export default class Search extends Component {
    renderScene(route, navigator) {
        switch (route.name) {
            case 'SEARCH_VIEW':
                return <SearchView navigator={navigator} />;
            case 'PRODUCT_DETAIL':
                return <ProductDetail navigator={navigator} />;
        }

    }
    render() {
        return (
            <Navigator
                initialRoute={{ name: 'SEARCH_VIEW' }}
                renderScene={this.renderScene.bind(this)}
            />
        );
    };
}