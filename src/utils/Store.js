const USER_WALLET = "USER_WALLET";
const USER_CONTRACT = "USER_CONTRACT";

export const setWallet = (wallet) => {
    localStorage.setItem(USER_WALLET, JSON.stringify(wallet));
};

export const getWallet = () => {
    return localStorage.getItem(USER_WALLET);
};

export const removeWallet = () => {
    localStorage.removeItem(USER_WALLET);
};

export const setListContract = (contract) => {
    localStorage.setItem(USER_CONTRACT, JSON.stringify(contract));
};

export const getListContract = () => {
    return localStorage.getItem(USER_CONTRACT);
};

export const removeListContract = () => {
    localStorage.removeItem(USER_CONTRACT);
};
