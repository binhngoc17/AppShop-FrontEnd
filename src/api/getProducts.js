import baseURL from './connect';

const getProducts = (idType, page) => {
    const URL = `${baseURL}/api/product_by_type/${idType}/${page}`;
    return fetch(URL)
    .then(res => res.json());
};

export default getProducts;