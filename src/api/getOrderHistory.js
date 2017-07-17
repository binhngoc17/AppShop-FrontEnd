/**
 * getOrderHistory:
 * - lấy danh sách đơn hàng.
 * - input: token.
 * - output:
 *  +Thành công: danh sách đơn hàng.
 *  +Thất bại: chuỗi text thông báo lỗi.
 */
import baseURL from './connect';
const URL = `${baseURL}/api/order_history`;

const getOrderHistory = (token) => (
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

export default getOrderHistory;