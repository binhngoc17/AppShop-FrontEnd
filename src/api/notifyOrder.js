/**
 * notifiOrder:
 * - Đếm ngược tới ngày sử dụng hết sản phẩm, nhắc nhỏ mua hàng khi còn nhỏ hơn hoặc bằng 5 ngày nữa.
 * - input: token.
 * - output:
 *  +Thành công: thông báo, số ngày còn lại.
 *  +Thất bại: chuỗi text thông báo lỗi.
 */
import baseURL from './connect';
const URL = `${baseURL}/api/notify_order`;

const notifyOrder = (token) => (
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

export default notifyOrder;