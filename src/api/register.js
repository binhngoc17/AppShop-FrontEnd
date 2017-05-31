const baseURL = 'http://10.0.2.2/api/register.php';

const register = (email, name, password) => (
    fetch(baseURL, {
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