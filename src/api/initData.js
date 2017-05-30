const baseURL = 'http://10.0.2.2/api/';
const initData = () => (
    fetch(baseURL)
        .then(res => res.json())
);

export default initData;