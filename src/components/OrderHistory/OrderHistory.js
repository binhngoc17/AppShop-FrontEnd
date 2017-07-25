/**
 * OrderHistory component:
 * - render màn hình lịch sử mua hàng.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image, Dimensions, ScrollView, ActivityIndicator, ToastAndroid, Alert
} from 'react-native';
import getOrderHistory from '../../api/getOrderHistory';
import getToken from '../../api/getToken';
import setStatusOrder from '../../api/setStatusOrder';
import decrUnitOnBill from '../../api/decrUnitOnBill';

import backSpecial from '../../media/appIcon/backs.png';
import iconClose from '../../media/appIcon/ic_close.png';

export default class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = { arrOrder: [] };
    }
    componentDidMount() {
        getToken()
            .then(token => getOrderHistory(token))
            .then(resJSON => {
                this.setState({ arrOrder: [...resJSON] });
            })
            .catch(err => console.log(err));
    }
    onRemoveOrder(OrderId, StatusCode) {
        if (StatusCode != 0) {
            ToastAndroid.show('Bạn chỉ có thể hủy đơn hàng có trang thái chưa xử lý', ToastAndroid.LONG);
            return;
        }
        Alert.alert(
            'Thông báo',
            'Bạn muốn hủy đơn hàng này?',
            [
                { text: 'Không', style: 'cancel' },
                { text: 'Có', onPress: () => this.cancelOrder(OrderId) },
            ],
            { cancelable: true }
        )
    }
    async cancelOrder(OrderId) {
        try {
            var DA_HUY = 3;
            const token = await getToken();
            const res = await setStatusOrder(token, OrderId, DA_HUY);
            if (res != "THANH_CONG") return;

            const resDecr = await decrUnitOnBill(token, OrderId);
            if(resDecr != "THANH_CONG") return;

            ToastAndroid.show('Đã hủy đơn hàng', ToastAndroid.SHORT);
            const newArrOrder = this.state.arrOrder.filter(e => e.id !== OrderId);
            this.setState({ arrOrder: newArrOrder });
        } catch (error) {
            console.log(error);
        }
    }
    goBacktoMain() {
        this.props.navigator.pop();
    }
    render() {
        const { wrapper, header, headerTitle, backIconStyle, body, orderRow, iconStyle } = styles;
        const { arrOrder } = this.state;
        const IndicatorJSX = (
            <ActivityIndicator
                animating
                color="#2ABB9C"
                style={[styles.centering, { height: 80 }]}
                size="large"
            />
        );
        const arrStatus = ["Chưa xử lý", "Đang giao hàng", "Hoàn thành", "Đã hủy"];
        const OrdersJSX = (
            <ScrollView>
                {arrOrder.map(e => (
                    <View style={orderRow} key={e.id}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <View />
                            <TouchableOpacity onPress={() => this.onRemoveOrder(e.id, e.status)}>
                                <Image source={iconClose} style={iconStyle} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Mã đơn hàng:</Text>
                            <Text style={{ color: '#2ABB9C' }}>ORD{e.id}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Ngày đặt::</Text>
                            <Text style={{ color: '#C21C70' }}>{new Date(e.date_order).toDateString()}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tình trạng:</Text>
                            <Text style={{ color: '#2ABB9C' }}>{arrStatus[e.status]}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tổng tiền:</Text>
                            <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{e.total} VNĐ</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        );
        return (
            <View style={wrapper}>
                <View style={header}>
                    <View />
                    <Text style={headerTitle}>Lịch sử đơn hàng</Text>
                    <TouchableOpacity onPress={this.goBacktoMain.bind(this)}>
                        <Image source={backSpecial} style={backIconStyle} />
                    </TouchableOpacity>
                </View>
                <View style={body}>
                    {!arrOrder.length ? IndicatorJSX : OrdersJSX}
                </View>
            </View>
        );
    }
}

//{arrOrder.length ? OrdersJSX : IndicatorJSX}
//e.status ? "Hoàn thành" : "Đang xử lý"

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#DFDFDF' },
    header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
    backIconStyle: { width: 30, height: 30 },
    iconStyle: { width: 25, height: 25 },
    body: { flex: 10, backgroundColor: '#DFDFDF' },
    orderRow: {
        height: width / 2.5,
        backgroundColor: '#FFF',
        margin: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#DFDFDF',
        shadowOpacity: 0.2,
        padding: 10,
        borderRadius: 2,
        justifyContent: 'space-around'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});