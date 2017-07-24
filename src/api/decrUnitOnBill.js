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