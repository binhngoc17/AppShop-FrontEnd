/**
 * saveToken:
 * - Lưu token xuống bộ nhớ thiết bị.
 * - input: token.
 */
import { AsyncStorage } from 'react-native';

const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('@Token', token);
    } catch (error) {
        console.log("saveToken: " + error);
    }
};

export default saveToken;