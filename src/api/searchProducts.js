import baseURL from './connect';

const searchProducts = (key) => {
    const URL = `${baseURL}/api/search/${key}`;
    return fetch(URL)
    .then(res => res.json());
};

export default searchProducts;