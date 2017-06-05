const searchProducts = (key) => {
    const baseUrl = `http://10.0.2.2/api/search.php?key=${key}`;
    return fetch(baseUrl)
    .then(res => res.json());
};

export default searchProducts;