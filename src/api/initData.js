import baseURL from './connect';
const URL = `${baseURL}/api`;

const initData = () => (
    fetch(URL)
        .then(res => res.json())
);

export default initData;