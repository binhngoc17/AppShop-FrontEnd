const baseURL = 'http://10.0.2.2/api/cart.php';

const senOrder = (token, arrayDetail) => (
    fetch(baseURL, {
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