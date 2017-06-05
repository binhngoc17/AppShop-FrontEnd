import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';

const url = 'http://10.0.2.2/api/images/type/';
const { height, width } = Dimensions.get('window');

export default class Category extends Component {
    gotoListProduct(category) {
        this.props.navigator.push({ name: 'LIST_PRODUCT', category });
    }
    render() {
        const { types } = this.props;
        const { wrapper, textStyle, imageStyle, cateTitle } = styles;
        const SwiperJSX = (
            <Swiper showsPagination height={imageHeight} width={imageWidth}>
                {types.map(e => (
                    <TouchableOpacity onPress={() => this.gotoListProduct(e)} key={e.id}>
                        <Image source={{uri: `${url}${e.image}`}} style={imageStyle}>
                            <Text style={cateTitle}>{e.name}</Text>
                        </Image>
                    </TouchableOpacity>
                ))}
            </Swiper>
        );
        return (
            <View style={wrapper}>
                <View style={{ height: 50, justifyContent: 'center' }}>
                    <Text style={textStyle}>LIST OF CATEGORY</Text>
                </View>
                <View style={{ flex: 4, justifyContent: 'flex-end' }}>
                    {types.length ? SwiperJSX : null}
                </View>
            </View>
        );
    };
}

const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;

const styles = StyleSheet.create({
    wrapper: {
        width: width - 20,
        backgroundColor: '#FFF',
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        paddingTop: 0
    },
    textStyle: {
        fontSize: 20,
        color: '#AFAEAF'
    },
    imageStyle: {
        height: imageHeight,
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cateTitle: {
        fontSize: 20,
        fontFamily: 'Avenir',
        color: '#9A9A9A'
    }
});