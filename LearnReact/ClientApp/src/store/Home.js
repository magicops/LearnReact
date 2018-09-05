import { createBrowserHistory } from 'history';

const loading = 'HOME_LOADING';
const loginFailed = 'HOME_LOGINFAILED';
const changeField = 'HOME_CHANGEFIELD';
const submit = 'HOME_SUBMIT';

const initialState = {
    loading: false,
    username: '',
    password: '',
    error: '',
    submitted: false
};

export const actionCreators = {
    login: (username, password) => async (dispatch) => {

        dispatch({ type: submit });

        if (username === '' || password === '')
            return;

        dispatch({ type: loading });

        const response = await fetch("api/Auth/Login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            dispatch({ type: loginFailed, message: "Login failed." });
            return;
        }

        const token = await response.json();

        localStorage.setItem('user', token.token);
        //createBrowserHistory().push('/form');
        window.location.href = '/form';
    },
    changeField: (name, value) => ({ type: changeField, name, value })
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === loading) {
        return { ...state, loading: true };
    }

    if (action.type === submit) {
        return { ...state, submitted: true };
    }

    if (action.type === loginFailed) {
        return {
            ...state,
            loading: false,
            error: action.message
        };
    }

    if (action.type === changeField) {
        return {
            ...state,
            [action.name]: action.value
        };
    }

    return state;
};
