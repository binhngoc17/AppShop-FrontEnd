import baseURL from './connect';
const URL = `${baseURL}/api/init`; //them /init voi AppGao_services

const initData = () => (
    fetch(URL)
        .then(res => res.json())
);

export default initData;