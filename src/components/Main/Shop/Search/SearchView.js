/**
 * SearchView Component:
 * - render màn hình tìm kiếm, hiện danh sách kết quả tìm kiếm.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image, Dimensions, ListView,
} from 'react-native';
import global from '../../../global';

import baseURL from '../../../../api/connect';
const url = `${baseURL}/api/images/product/`;

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default class SearchView extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds,
        };
        global.setArrSearch = this.setArrSearch.bind(this);
    }
    setArrSearch(products) {
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(products) });
    }
    gotoProductDetail(product) {
        this.props.navigator.push({ name: 'PRODUCT_DETAIL', product });
    }
    render() {
        const {
            productStyle, mainRight, txtMaterial, txtColor,
            txtName, txtPrice, productImage,
            txtShowDetail, lastRowInfo, wrapper
        } = styles;
        const { dataSource } = this.state;
        return (
            <View style={wrapper}>
                <ListView
                    dataSource={dataSource}
                    enableEmptySections
                    renderRow={(product) => (
                        <View style={productStyle}>
                            <Image source={{ uri: `${url}${product.images[0]}` }} style={productImage} />
                            <View style={mainRight}>
                                <Text style={txtName}>{toTitleCase(product.name)}</Text>
                                <Text style={txtPrice}>VNĐ {product.price}</Text>
                                <View />
                                <View style={lastRowInfo} >
                                    <View />
                                    <View />
                                    <TouchableOpacity onPress={() => this.gotoProductDetail(product)}>
                                        <Text style={txtShowDetail}>Xem chi tiết</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    };
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#DFDFDF',
        flex: 1
    },
    productStyle: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#34B089',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtColor: {
        paddingLeft: 20,
        color: 'black',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtMaterial: {
        paddingLeft: 20,
        color: 'black',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    lastRowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});