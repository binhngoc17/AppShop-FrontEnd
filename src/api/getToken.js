/**
 * getToken:
 * - lấy token từ bộ nhớ điện thoại.
 * - output:
 *  +Thành công: chuỗi token.
 *  +Thất bại: chuỗi rỗng.
 */
import { AsyncStorage } from 'react-native';

const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@Token');
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        console.log("getToken:" + error);
        return '';
    }
};

export default getToken;