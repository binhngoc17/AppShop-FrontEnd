/**
 * getNewToken:
 * - lấy token mới.
 * - input:token.
 * - output:
 *  +Thành công: token mới.
 *  +Thất bại: chuỗi text thông báo lỗi.
 * 
 * refreshToken:
 * - lưu token mới xuống bộ nhớ thiết bị.
 */
import getToken from './getToken';
import saveToken from './saveToken';
import baseURL from './connect';

const URL = `${baseURL}/api/refresh_token`;

const getNewToken = (token) => (
    fetch(URL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token })
    })
        .then(res => res.text())
);

const refreshToken = async () => {
    try {
        const token = await getToken();
        if (token === '' || token === 'TOKEN_KHONG_HOP_LE') {
            console.log('khong lay duoc token');
        }
        const newToken = await getNewToken(token);
        await saveToken(newToken);
        console.log('Token moi:' + newToken);
    } catch (error) {
        console.log("refreshToken: " + error);
    }
};

export default refreshToken;