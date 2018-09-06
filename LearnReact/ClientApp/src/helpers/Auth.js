const TOKENNAME = 'USER_TOKEN';

export const userIsAuthenticated = () => {
    return localStorage.getItem(TOKENNAME) !== null;
}

export const getToken = () => {
    return localStorage.getItem(TOKENNAME);
}

export const login = (token) => {
    localStorage.setItem(TOKENNAME, token);
}

export const logout = () => {
    localStorage.removeItem(TOKENNAME);
}

const Auth = {
    userIsAuthenticated,
    getToken,
    login,
    logout
};

export default Auth;