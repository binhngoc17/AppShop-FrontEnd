const getProducts = (idType, page) => {
    const baseUrl = `http://10.0.2.2/api/product_by_type.php?id_type=${idType}&page=${page}`;
    return fetch(baseUrl)
    .then(res => res.json());
};

export default getProducts;