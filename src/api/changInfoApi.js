/**
 * changeInfoApi:
 * - thực hiện thay đổi thông tin user của khách hàng.
 * -input: token, name, address, phone
 * -output: 
 *  +Thành công: JSON thông tin user hiện tại.
 *  +Có lỗi: chuổi text thông báo lỗi.
 */
import baseURL from './connect';
const URL = `${baseURL}/api/change_info`;

const changeInfoApi = (token, name, address, phone) => (
    fetch(URL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token, name, address, phone })
    })
        .then(res => res.json())
);

export default changeInfoApi;