/**
 * getProducts:
 * - Lấy danh sách sản phẩm theo loại sản phẩm.
 * - input: id loại sản phẩm, số trang.
 * - output:
 *  +Thành công: danh sách sản phẩm.
 *  +Thất bại: chuỗi text thông báo lỗi.
 */
import baseURL from './connect';

const getProducts = (idType, page) => {
    const URL = `${baseURL}/api/product_by_type/${idType}/${page}`;
    return fetch(URL)
    .then(res => res.json());
};

export default getProducts;