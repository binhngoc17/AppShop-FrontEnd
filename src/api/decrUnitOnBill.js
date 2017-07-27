/**
 * decrUnitOnBill:
 * - Giảm số lượng sản phẩm trên hóa đơn, sử dụng khi đơn hàng trạng thái chưa xử lý bị khách hàng hủy.
 * - input: token, billID.
 * - output: chuổi text thông báo thành công hay có lỗi.
 */
import baseURL from './connect';
const URL = `${baseURL}/api/decrUnitOnBill`;

const decrUnitOnBill = (token, billID) => (
    fetch(URL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token, billID })
    })
        .then(res => res.text())
);

export default decrUnitOnBill;