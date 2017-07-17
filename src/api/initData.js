/**
 * init:
 * - lấy dữ liệu loại sản phẩm, danh sách sản phẩm nỗi bật.
 * - Output:
 *  +Thành công: danh sách loại sản phẩm, danh sách sản phẩm nổi bật.
 *  +Thất bại: chuỗi text thông báo lỗi.
 */
import baseURL from './connect';
const URL = `${baseURL}/api/init`;

const initData = () => (
    fetch(URL)
        .then(res => res.json())
);

export default initData;