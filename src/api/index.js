const rp = require('request-promise');
const API_URL = process.env && process.env.VUE_APP_API_URL;
const METHOD_POST = "POST";
const METHOD_GET = "GET";

const getParams = (method, body, headers, uri) => {
    const requestHeader = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers
    };
    return {
        method: method,
        headers: requestHeader,
        body: body,
        uri: uri,
        json: true
    };
};

const request = async (endpoint, method, body, headers) => {
    const fullEndpoint = API_URL + endpoint;
    let params = getParams(method, body, headers, fullEndpoint);
    try {
        return await rp(params);
    } catch (e) {
        throw new Error('Error when request data');
    }
};


export const apiGetListTransactionContract = (contractAddress, page) => {
    return request(`wallet/multisig/get-tx?contract=${contractAddress}&page=${page}`, METHOD_GET);
};

export const apiGetTransactionContract = (contractAddress, index) => {
    return request(`wallet/multisig/get-tx-index?contract=${contractAddress}&index=${index}`, METHOD_GET);
};

export const apiGetNumberNotification = (walletAddress) => {
    return request(`notification/amount-unreadable-notify?address=${walletAddress}`, METHOD_GET);
};

export const apiGetListNotification = (page, walletAddress) => {
    return request(`notification/get-notifications?page=${page}&&address=${walletAddress}`, METHOD_GET);
};

export const apiUpdateNotification = (idNotification, address) => {
    return request(`notification `, METHOD_POST, {idNotification, address});
};

 