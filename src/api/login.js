/**
 * login:
 * - đăng nhập vào ứng dụng mua hàng.
 * - input: email, password.
 * - output:
 *  +Thành công: token mới, thông tin user.
 *  +Thất bại: chuỗi text thông báo lỗi.
 */
import baseURL from './connect';
const URL = `${baseURL}/api/login`;

const login = (email, password) => (
    fetch(URL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
);

export default login;