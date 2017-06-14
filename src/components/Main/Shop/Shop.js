import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image, ToastAndroid, ActivityIndicator,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Header from './Header';

import Home from './Home/Home';
import Contact from './Contact/Contact';
import Cart from './Cart/Cart';
import Search from './Search/Search';
import global from '../../global';

import initData from '../../../api/initData';
import saveCart from '../../../api/saveCart';
import getCart from '../../../api/getCart';

import homeIconS from '../../../media/appIcon/home.png';
import homeIcon from '../../../media/appIcon/home0.png';
import cartIconS from '../../../media/appIcon/cart.png';
import cartIcon from '../../../media/appIcon/cart0.png';
import searchIconS from '../../../media/appIcon/search.png';
import searchIcon from '../../../media/appIcon/search0.png';
import contactIconS from '../../../media/appIcon/contact.png';
import contactIcon from '../../../media/appIcon/contact0.png';

export default class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Home',
            types: [],
            topProducts: [],
            cartArray: [],
        };
        global.addProductToCart = this.addProductToCart.bind(this);
        global.incrQuantity = this.incrQuantity.bind(this);
        global.decrQuantity = this.decrQuantity.bind(this);
        global.removeProduct = this.removeProduct.bind(this);
        global.gotoSearch = this.gotoSearch.bind(this);
    }
    componentDidMount() {
        initData()
            .then(resJSON => {
                const { type, product } = resJSON;
                this.setState({
                    types: type,
                    topProducts: product,
                });
            });
        getCart()
            .then(cartArray => this.setState({ cartArray }));
    }
    gotoSearch() {
        this.setState({ selectedTab: 'Search' });
    }
    addProductToCart(product) {
        const isExist = this.state.cartArray.some(e => e.product.id === product.id)
        if (isExist) {
            ToastAndroid.show('Sản phẩm này đã có trong giỏ hàng', ToastAndroid.SHORT);
            return false;
        }
        this.setState(
            { cartArray: [...this.state.cartArray, { product, quantity: 1 }], },
            () => saveCart(this.state.cartArray)
        );
    }
    incrQuantity(productId) {
        const newCart = this.state.cartArray.map(e => {
            if (e.product.id !== productId)
                return e;
            return { product: e.product, quantity: e.quantity + 1 };
        });
        this.setState(
            {
                cartArray: newCart,
            },
            () => saveCart(this.state.cartArray)
        );
    }
    decrQuantity(productId) {
        const newCart = this.state.cartArray.map(e => {
            if (e.product.id !== productId)
                return e;
            if (e.quantity === 1)
                return e;
            return { product: e.product, quantity: e.quantity - 1 };
        });
        this.setState(
            {
                cartArray: newCart,
            },
            () => saveCart(this.state.cartArray)
        );
    }
    removeProduct(productId) {
        const newCart = this.state.cartArray.filter(e => e.product.id !== productId);
        this.setState(
            {
                cartArray: newCart,
            },
            () => saveCart(this.state.cartArray)
        );
    }
    openDrawer() {
        this.props.openDrawer();
    }
    render() {
        const { types, selectedTab, topProducts, cartArray } = this.state;
        const { iconStyle, container } = styles;
        const IndicatorJSX = (
            <ActivityIndicator
                animating
                color="#2ABB9C"
                style={[styles.centering, { height: 80 }]}
                size="large"
            />
        );
        const MainViewJSX = (
            <TabNavigator>
                <TabNavigator.Item
                    selected={selectedTab === 'Home'}
                    title="Trang Chủ"
                    onPress={() => this.setState({ selectedTab: 'Home' })}
                    renderIcon={() => <Image source={homeIcon} style={iconStyle} />}
                    renderSelectedIcon={() => <Image source={homeIconS} style={iconStyle} />}
                    selectedTitleStyle={{ color: '#34B089' }}
                >
                    <Home types={types} topProducts={topProducts} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={selectedTab === 'Cart'}
                    title="Giỏ Hàng"
                    onPress={() => this.setState({ selectedTab: 'Cart' })}
                    renderIcon={() => <Image source={cartIcon} style={iconStyle} />}
                    renderSelectedIcon={() => <Image source={cartIconS} style={iconStyle} />}
                    selectedTitleStyle={{ color: '#34B089' }}
                    badgeText={cartArray.length}
                >
                    <Cart cartArray={cartArray} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={selectedTab === 'Search'}
                    title="Tìm Kiếm"
                    onPress={() => this.setState({ selectedTab: 'Search' })}
                    renderIcon={() => <Image source={searchIcon} style={iconStyle} />}
                    renderSelectedIcon={() => <Image source={searchIconS} style={iconStyle} />}
                    selectedTitleStyle={{ color: '#34B089' }}
                >
                    <Search />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={selectedTab === 'Contact'}
                    title="Liên Hệ"
                    onPress={() => this.setState({ selectedTab: 'Contact' })}
                    renderIcon={() => <Image source={contactIcon} style={iconStyle} />}
                    renderSelectedIcon={() => <Image source={contactIconS} style={iconStyle} />}
                    selectedTitleStyle={{ color: '#34B089' }}
                >
                    <Contact />
                </TabNavigator.Item>
            </TabNavigator>
        );
        return (
            <View style={container}>
                <Header openDrawer={this.openDrawer.bind(this)} />
                {!types.length || !topProducts.length ? IndicatorJSX : MainViewJSX}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    iconStyle: {
        width: 20, height: 20
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});