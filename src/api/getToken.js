import { AsyncStorage } from 'react-native';

const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@Token');
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        console.log(error + 'n/co loi roi!!!');
        return '';
    }
};

export default getToken;