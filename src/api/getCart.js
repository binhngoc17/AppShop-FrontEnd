import { AsyncStorage } from 'react-native';

const getCart = async () => {
    try {
        const value = await AsyncStorage.getItem('@Cart');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
        console.log(error + 'n/co loi roi!!!');
        return [];
    }
};

export default getCart;