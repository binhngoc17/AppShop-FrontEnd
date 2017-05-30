const baseURL = 'http://10.0.2.2:3000/api';

export let findAll = () => fetch(baseURL)
    .then((response) => response.json());