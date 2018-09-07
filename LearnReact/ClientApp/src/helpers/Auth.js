const TOKENNAME = 'USER_TOKEN';
const TOKENEXPIRES = 'USER_EXPIRES';

export const userIsAuthenticated = () => {
    return getToken() !== null;
}

export const getToken = () => {
    const token = localStorage.getItem(TOKENNAME);
    let expires = localStorage.getItem(TOKENNAME);

    if (token == null || expires == null)
        return null;

    expires = new Date(expires).getTime();

    if (expires < new Date().getTime()) {
        logout();
        return null;
    }

    return token;
}

export const login = (token) => {
    localStorage.setItem(TOKENNAME, token.token);
    localStorage.setItem(TOKENEXPIRES, token.expires);
}

export const logout = () => {
    localStorage.removeItem(TOKENNAME);
    localStorage.removeItem(TOKENEXPIRES);
}

export const getFetch = (url, options) => {
    options = options || {};

    options.headers = options.headers || {};

    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    }

    return fetch(url, options);
}

const Auth = {
    userIsAuthenticated,
    getToken,
    login,
    logout,
    getFetch
};

export default Auth;