/**
 * setStatusOrder:
 * - Thực hiện thay đổi trạng thái của đơn hàng.
 * - input: token, billID, statusCode
 * - output: chuỗi text thông báo thực hiện thành công hay có lỗi.
 * - statusCode:
 *  + 0: chưa xử lý.
 *  + 1: đang giao hàng.
 *  + 2: hoàn thành.
 *  + 3: đã hủy.
 */
import baseURL from './connect';
const URL = `${baseURL}/api/setBillStatus`;

const setStatusOrder = (token, billID, statusCode) => (
    fetch(URL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token, billID, statusCode })
    })
        .then(res => res.text())
);

export default setStatusOrder;