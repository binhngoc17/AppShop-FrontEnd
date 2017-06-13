import baseURL from './connect';
const URL = `${baseURL}/api/register`;

const register = (email, name, password) => (
    fetch(URL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email, name, password })
    })
        .then(res => res.text())
);

export default register;