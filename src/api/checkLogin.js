/**
 * checkLogin:
 * - Kiểm tra tình trạng đăng nhập của user.
 * - Input: token.
 * - Output:
 *  +Thành công: token mới, thông tin user hiện tại.
 *  +Thất bại: chuỗi text thông báo lỗi.
 */
import baseURL from './connect';
const URL = `${baseURL}/api/check_login`;

const checkLogin = (token) => (
    fetch(URL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token })
    })
        .then(res => res.json())
);

export default checkLogin;