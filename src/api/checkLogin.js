import baseURL from './connect';
const URL = `${baseURL}/api/check_login`;

const checkLogin = (token) => (
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

export default checkLogin;