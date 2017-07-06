import baseURL from './connect';

const setUnitOnBill = (productId) => {
    const URL = `${baseURL}/api/setUnitOnBill/${productId}`;
    return fetch(URL)
    .then(res => res.text());
};

export default setUnitOnBill;