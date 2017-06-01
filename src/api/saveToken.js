import { AsyncStorage } from 'react-native';

const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('@Token', token);
    } catch (error) {
        console.log(error + 'n/Khong save duoc!');
    }
};

export default saveToken;