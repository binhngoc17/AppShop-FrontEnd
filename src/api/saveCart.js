/**
 * saveCart:
 * - Lưu danh sách sản phẩm trong giỏ hàng xuống bộ nhớ thiết bị.
 * - input: danh sách sản phẩm trong giỏ hàng.
 */
import { AsyncStorage } from 'react-native';

const saveCart = async (cartArray) => {
    try {
        await AsyncStorage.setItem('@Cart', JSON.stringify(cartArray));
    } catch (error) {
        console.log("saveCart: " + error);
    }
};

export default saveCart;