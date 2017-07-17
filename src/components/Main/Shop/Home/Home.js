/**
 * Home component:
 * - navigation giữa HomeView, ListProduct, ProductDetail.
 */
import React, { Component } from 'react';
import {
    Navigator,
} from 'react-native';
import HomeView from './HomeView';
import ListProduct from '../ListProduct/ListProduct';
import ProductDetail from '../ProductDetail/ProductDetail';

export default class Home extends Component {
    renderScene(route, navigator) {
        const { types, topProducts } = this.props;
        switch (route.name) {
            case 'HOME_VIEW':
                return <HomeView navigator={navigator} types={types} topProducts={topProducts} />;
            case 'LIST_PRODUCT':
                return <ListProduct navigator={navigator} category={route.category} />;
            case 'PRODUCT_DETAIL':
                return <ProductDetail navigator={navigator} product={route.product} />;
        }
    }
    render() {
        return (
            <Navigator
                initialRoute={{ name: 'HOME_VIEW' }}
                renderScene={this.renderScene.bind(this)}
            />
        );
    };
}
