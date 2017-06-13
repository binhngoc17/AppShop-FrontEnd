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