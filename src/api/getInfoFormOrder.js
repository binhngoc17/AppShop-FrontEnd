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