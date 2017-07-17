/**
 * setUnitOnBill:
 * - cập nhật tổng số lượng một sản phẩm trên tất cả các đơn hàng.
 * - input: id sản phẩm.
 * - Output: chuỗi text thông báo thành công hoặc có lỗi.
 */
import baseURL from './connect';

const setUnitOnBill = (productId) => {
    const URL = `${baseURL}/api/setUnitOnBill/${productId}`;
    return fetch(URL)
    .then(res => res.text());
};

export default setUnitOnBill;