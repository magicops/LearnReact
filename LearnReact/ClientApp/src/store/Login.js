import * as Auth from '../helpers/Auth';

const loading = 'LOGIN_LOADING';
const loginFailed = 'LOGIN_LOGINFAILED';
const changeField = 'LOGIN_CHANGEFIELD';
const submit = 'LOGIN_SUBMIT';
const loggedIn = 'LOGIN_LOGGEDIN';

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

        Auth.login(token);
        
        dispatch({ type: loggedIn });
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

    if (action.type === loggedIn) {
        return { ...initialState };
    }

    return state;
};
