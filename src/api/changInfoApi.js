const baseURL = 'http://10.0.2.2/api/change_info.php';

const changeInfoApi = (token, name, address, phone) => (
    fetch(baseURL, {
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