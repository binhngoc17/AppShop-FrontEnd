import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    TouchableOpacity,
    Image,
    ListView,
    RefreshControl, ActivityIndicator,
} from 'react-native';
import getProducts from '../../../../api/getProducts';

import backList from '../../../../media/appIcon/backList.png';
import baseURL from '../../../../api/connect';
const url = `${baseURL}/api/images/product/`;

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default class ListProduct extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds,
            refreshing: false,
            page: 2,
        };
        this.arr = [];
    }
    componentDidMount() {
        const { id } = this.props.category;
        getProducts(id, 1)
            .then(products => {
                this.arr = [...products];
                this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.arr) });
            });
    }
    onRefresh() {
        this.setState({ refreshing: true });
        const { id } = this.props.category;
        const { page } = this.state;
        getProducts(id, page)
            .then(products => {
                this.arr = [...products, ...this.arr];
                this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.arr) });
            })
            .then(() => this.setState({ refreshing: false, page: page + 1 }))
            .catch(err => {
                console.log(err);
                this.setState({ refreshing: false });
            });
    }
    gotoBack() {
        this.props.navigator.pop();
    }
    gotoProductDetail(product) {
        this.props.navigator.push({ name: 'PRODUCT_DETAIL', product });
    }
    render() {
        const {
            container, header, wrapper, backStyle, titleStyle,
            productContainer, productImage, productInfo, lastRowInfo,
            txtName, txtPrice, txtMaterial, txtColor, txtShowDetail
         } = styles;
        const { category } = this.props;
        const { dataSource } = this.state;
        const IndicatorJSX = (
            <ActivityIndicator
                animating
                color="#2ABB9C"
                style={[styles.centering, { height: 80 }]}
                size="large"
            />
        );
        const MainViewJSX = (
            <ListView
                removeClippedSubviews={false}
                enableEmptySections
                dataSource={dataSource}
                renderRow={(product) => (
                    <View style={productContainer}>
                        <Image style={productImage} source={{ uri: `${url}${product.images[0]}` }} />
                        <View style={productInfo}>
                            <Text style={txtName}>{toTitleCase(product.name)}</Text>
                            <Text style={txtPrice}>{product.price}đ</Text>
                            <Text style={txtMaterial}>null</Text>
                            <View style={lastRowInfo}>
                                <Text style={txtColor}>null</Text>
                                <View />
                                <TouchableOpacity onPress={() => this.gotoProductDetail(product)}>
                                    <Text style={txtShowDetail}>Xem chi tiết</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                    />
                }
            />
        );
        return (
            <View style={styles.container}>
                <View style={wrapper}>
                    <View style={header}>
                        <TouchableOpacity onPress={this.gotoBack.bind(this)}>
                            <Image source={backList} style={backStyle} />
                        </TouchableOpacity>
                        <Text style={titleStyle}>{category.name}</Text>
                        <View style={{ width: 30 }} />
                    </View>
                    {!this.arr.length ? IndicatorJSX : MainViewJSX}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DBDBD8',
        paddingBottom: 30
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    wrapper: {
        backgroundColor: '#fff',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        margin: 10,
        paddingHorizontal: 10
    },
    backStyle: {
        width: 30,
        height: 30
    },
    productContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderTopColor: '#F0F0F0',
        borderBottomColor: '#FFF',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF',
        borderWidth: 1
    },
    titleStyle: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 20
    },
    productImage: {
        width: 90,
        height: (90 * 452) / 361
    },
    productInfo: {
        justifyContent: 'space-between',
        marginLeft: 15,
        flex: 1
    },
    lastRowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtName: {
        fontFamily: 'Avenir',
        color: '#34B089',
        fontSize: 20,
        fontWeight: '400'
    },
    txtPrice: {
        fontFamily: 'Avenir',
        color: '#B10D65',
    },
    txtMaterial: {
        fontFamily: 'Avenir'
    },
    txtColor: {
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 13
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});