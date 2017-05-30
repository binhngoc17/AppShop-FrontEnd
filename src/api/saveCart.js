import { AsyncStorage } from 'react-native';

const saveCart = async (cartArray) => {
    try {
        await AsyncStorage.setItem('@Cart', JSON.stringify(cartArray));
    } catch (error) {
        console.log(error + 'n/Khong save duoc!');
    }
};

export default saveCart;