const baseURL = 'http://10.0.2.2/api/login.php';

const login = (email, password) => (
    fetch(baseURL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
);

export default login;