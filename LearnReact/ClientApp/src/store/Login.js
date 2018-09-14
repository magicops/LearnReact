import * as Auth from '../helpers/Auth';

const LOGIN_LOADING = 'LOGIN_LOADING';
const LOGIN_LOGIN_FAILED = 'LOGIN_LOGIN_FAILED';
const LOGIN_CHANGE_FIELD = 'LOGIN_CHANGE_FIELD';
const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
const LOGIN_LOGGEDIN = 'LOGIN_LOGGEDIN';

const initialState = {
    loading: false,
    username: '',
    password: '',
    error: '',
    submitted: false
};

export const actionCreators = {
    login: (username, password) => async (dispatch) => {
        
        dispatch({ type: LOGIN_SUBMIT });

        if (username === '' || password === '')
            return;

        dispatch({ type: LOGIN_LOADING });

        const response = await fetch("api/Auth/Login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            dispatch({ type: LOGIN_LOGIN_FAILED, message: "Login failed." });
            return;
        }

        const token = await response.json();

        Auth.login(token);
        
        dispatch({ type: LOGIN_LOGGEDIN });
    },
    changeField: (name, value) => ({ type: LOGIN_CHANGE_FIELD, name, value })
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === LOGIN_LOADING) {
        return { ...state, loading: true };
    }

    if (action.type === LOGIN_SUBMIT) {
        return { ...state, submitted: true };
    }

    if (action.type === LOGIN_LOGIN_FAILED) {
        return {
            ...state,
            loading: false,
            error: action.message
        };
    }

    if (action.type === LOGIN_CHANGE_FIELD) {
        return {
            ...state,
            [action.name]: action.value
        };
    }

    if (action.type === LOGIN_LOGGEDIN) {
        return { ...initialState };
    }

    return state;
};
