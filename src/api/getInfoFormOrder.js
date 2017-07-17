/**
 * getInfoFormOrder:
 * - Lấy thông tin user, đơn hàng, chi tiết đơn hàng mới nhất.
 * - input: token.
 * - output: 
 *  +Thành công: thông tin user, địa chỉ, danh sách sản phẩm đã mua theo đơn hàng mới nhất.
 *  +Thất bại: chuỗi text thông báo lỗi.
 */
import baseURL from './connect';
const URL = `${baseURL}/api/get_info_form`;

const getInfoFormOrder = (token) => (
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

export default getInfoFormOrder;