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