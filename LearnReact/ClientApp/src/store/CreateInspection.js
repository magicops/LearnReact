import { CommonActions, Lists } from '../constants';

const loading = 'CI_LOADING';
const loaded = 'CI_LOADED';
const hideLoading = 'CI_HIDELOADING';

const initialState = {
    loading: false,
    rules: [],
    actions: [],
    stages: [],
    departments: [],
    selectedRule: null,
    selectedAction: null,
    selectedDepartment: null,
    selectedStage: null,
    selectedDate: null
};

export const actionCreators = {
    showLoading: () => (dispatch) => {
        dispatch({ type: loading });
    },
    hideLoading: () => (dispatch) => {
        dispatch({ type: hideLoading });
    },
    loadAll: () => async (dispatch) => {

        dispatch({ type: loading });

        const promises = {
            rules: await fetch("api/Rules"),
            departments: await fetch("api/Departments"),
            actions: await fetch('api/Actions'),
            stages: await fetch('api/Stages')
        };

        const results = {
            rules: await promises.rules.json(),
            departments: await promises.departments.json(),
            actions: await promises.actions.json(),
            stages: await promises.stages.json()
        };

        dispatch({
            type: loaded,
            rules: results.rules,
            departments: results.departments,
            actions: results.actions,
            stages: results.stages
        });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === loading) {
        return {
            ...state,
            loading: true
        };
    }

    if (action.type === hideLoading) {
        return {
            ...state,
            loading: false
        };
    }

    if (action.type === loaded) {
        return {
            ...state,
            loading: false,
            rules: action.rules,
            departments: action.departments,
            actions: action.actions,
            stages: action.stages
        };
    }

    if (action.type === CommonActions.selectItem) {

        switch (action.list) {
            case Lists.departments:
                return {
                    ...state,
                    selectedDepartment: action.id
                };
            case Lists.rules:
                return {
                    ...state,
                    selectedRule: action.id
                };
            case Lists.actions:
                return {
                    ...state,
                    selectedAction: action.id
                };
            case Lists.stages:
                return {
                    ...state,
                    selectedStage: action.id
                };
            default:
                return {
                    ...state
                };

        }
    }

    return state;
};
