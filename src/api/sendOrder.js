/**
 * sendOrder:
 * - tạo đơn hàng.
 * - input: token, khoảng thời gian dự tính sử dụng hết sản phẩm, địa chỉ, danh sách sản phẩm.
 * - output: chuỗi text thông báo thành công hoặc có lỗi.
 */
import baseURL from './connect';
const URL = `${baseURL}/api/cart`;

const sendOrder = (token, numMonth, address, district, city, arrayDetail) => (
    fetch(URL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token, numMonth, address, district, city, arrayDetail })
    })
        .then(res => res.text())
);

export default sendOrder;