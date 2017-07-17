/**
 * register:
 * - đăng ký tài khoản khách hàng.
 * - input: email, name, password.
 * - output:
 *  +Thành công: chuỗi text thông báo thành công.
 *  +Thất bại: chuỗi text thông báo lỗi.
 */
import baseURL from './connect';
const URL = `${baseURL}/api/register`;

const register = (email, name, password) => (
    fetch(URL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email, name, password })
    })
        .then(res => res.text())
);

export default register;