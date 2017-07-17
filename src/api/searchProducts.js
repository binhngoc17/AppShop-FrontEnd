/**
 * searchProducts:
 * - Tìm kiếm sản phẩm theo tên sản phẩm.
 * - input: từ khóa tìm kiếm.
 * - output:
 *  +Thành công: danh sách sản phẩm theo từ khóa tìm kiếm.
 *  +Thất bại: danh sách rỗng.
 */
import baseURL from './connect';

const searchProducts = (key) => {
    const URL = `${baseURL}/api/search/${key}`;
    return fetch(URL)
    .then(res => res.json());
};

export default searchProducts;