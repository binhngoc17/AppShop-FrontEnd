/**
 * getCart:
 * - Lấy danh sách sản phẩm trong giỏ hàng từ bộ nhớ thiết bị.
 * - Output:
 *  +Thành công: danh sách sản phẩm trong giỏ hàng.
 *  +Thất bại: danh sách rỗng.
 */
import { AsyncStorage } from 'react-native';

const getCart = async () => {
    try {
        const value = await AsyncStorage.getItem('@Cart');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
        console.log("getCartApi:" + error);
        return [];
    }
};

export default getCart;