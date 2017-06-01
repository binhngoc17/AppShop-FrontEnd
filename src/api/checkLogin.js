const baseURL = 'http://10.0.2.2/api/check_login.php';

const checkLogin = (token) => (
    fetch(baseURL, {
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