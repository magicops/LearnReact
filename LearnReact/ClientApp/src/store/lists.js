import { Lists, labels } from "../constants";
import * as Auth from '../helpers/Auth';

const loading = 'LISTS_LOADING';
const loaded = 'LISTS_LOADED';
const hideLoading = 'LISTS_HIDELOADING';
const saved = 'LISTS_SAVED';
const reset = 'LISTS_RESET';
const error = 'LISTS_ERROR';

const sliderNext = 'SLIDER_NEXT';
const sliderPrev = 'SLIDER_PREV';
const selectItem = 'SLIDER_SELECTITEM';
const dismissError = 'SLIDER_DISMISSERROR';

const BASEDATA_CHANGE_SELCTED_LIST = 'BASEDATA_CHANGE_SELCTED_LIST';

const initialState = {
    loading: false,
    error: null,
    loaded: false,
    rules: [],
    actions: [],
    procedures: [],
    departments: [],

    selectedDate: null,
    selectedList: Lists.departments,
    saved: false,
    step: 1,
    selectedItems: {}
};

export const actionCreators = {
    showLoading: () => ({ type: loading }),
    hideLoading: () => ({ type: hideLoading }),
    sliderNext: () => (dispatch, getState) => {
        const { step, selectedItems } = getState().lists;

        let listTitle = '';
        switch (step) {
            case 1: listTitle = Lists.departments; break;
            case 2: listTitle = Lists.rules; break;
            case 3: listTitle = Lists.procedures; break;
            default: listTitle = Lists.actions; break;
        }

        if (!selectedItems[listTitle]) {
            dispatch({ type: error, message: labels.select__List.replace('__', listTitle) });
            return;
        }

        dispatch({ type: sliderNext });
    },
    sliderPrev: () => ({ type: sliderPrev }),
    reset: () => ({ type: reset }),
    dismissError: () => ({ type: dismissError }),

    selectItem: (list, id) => ({ type: selectItem, list, id }),
    loadAll: () => async (dispatch, getState) => {

        if (getState().lists.loaded)
            return;

        dispatch({ type: loading });

        const promises = {
            rules: await Auth.getFetch("api/Rules"),
            departments: await Auth.getFetch("api/Departments"),
            actions: await Auth.getFetch('api/Actions'),
            procedures: await Auth.getFetch('api/Procedures')
        };

        if (!promises.rules.ok ||
            !promises.departments.ok ||
            !promises.actions.ok ||
            !promises.procedures.ok) {
            dispatch({ type: hideLoading });
            dispatch({ type: error, message: labels.loadFaild });
            return;
        }

        const results = {
            rules: await promises.rules.json(),
            departments: await promises.departments.json(),
            actions: await promises.actions.json(),
            procedures: await promises.procedures.json()
        };

        dispatch({
            type: loaded,
            rules: results.rules,
            departments: results.departments,
            actions: results.actions,
            procedures: results.procedures
        });
    },
    save: (lists, selectedItems) => async (dispatch) => {

        let isValid = true,
            emptyListTitle = '';

        lists.forEach(l => {
            if (!selectedItems[l.title]) {
                isValid = false;
                emptyListTitle = l.title;
                return false;
            }
        });

        if (!isValid) {
            dispatch({ type: error, message: labels.select__List.replace('__', emptyListTitle) });
            return;
        }

        dispatch({ type: loading });

        const inspection = {
            date: new Date().toJSON(),
            departmentId: selectedItems[Lists.departments],
            ruleId: selectedItems[Lists.rules],
            actionId: selectedItems[Lists.actions],
            procedureId: selectedItems[Lists.procedures],
        };

        const promise = await Auth.getFetch('api/Inspections',
            {
                method: 'POST',
                body: JSON.stringify(inspection)
            });

        if (!promise.ok) {
            dispatch({ type: hideLoading });
            dispatch({
                type: error,
                message: labels.saveFaild
            });
            return;
        }

        await promise.json();
        dispatch({ type: saved });
    },

    changeSelectedList: (list) => ({ type: BASEDATA_CHANGE_SELCTED_LIST, list })
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

    if (action.type === sliderNext) {
        return {
            ...state,
            step: state.step + 1,
            error: null
        };
    }

    if (action.type === sliderPrev) {
        return {
            ...state,
            step: state.step - 1
        };
    }

    if (action.type === selectItem) {
        const selectedItems = Object.assign({}, state.selectedItems);
        selectedItems[action.list] = action.id;

        return {
            ...state,
            selectedItems: selectedItems
        };
    }

    if (action.type === loaded) {
        return {
            ...initialState,
            rules: action.rules,
            departments: action.departments,
            actions: action.actions,
            procedures: action.procedures,
            loaded: true
        };
    }

    if (action.type === saved) {
        return {
            ...state,
            loading: false,
            saved: true,
            error: null
        };
    }

    if (action.type === error) {
        return {
            ...state,
            loading: false,
            error: action.message
        };
    }

    if (action.type === dismissError) {
        return {
            ...state,
            error: null
        };
    }

    if (action.type === reset) {
        return {
            ...initialState,
            rules: state.rules,
            actions: state.actions,
            departments: state.departments,
            procedures: state.procedures,
            loaded: true
        };
    }

    if (action.type === BASEDATA_CHANGE_SELCTED_LIST) {
        return {
            ...state,
            selectedList: action.list
        };
    }

    return state;
};
