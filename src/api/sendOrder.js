import baseURL from './connect';
const URL = `${baseURL}/api/cart`;

const senOrder = (token, arrayDetail) => (
    fetch(URL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token, arrayDetail })
    })
        .then(res => res.text())
);

export default senOrder;