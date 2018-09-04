import { Lists, labels } from "../constants";

const loading = 'CI_LOADING';
const loaded = 'CI_LOADED';
const hideLoading = 'CI_HIDELOADING';
const saved = 'CI_SAVED';
const reset = 'CI_RESET';
const error = 'CI_ERROR';
const sliderNext = 'SLIDER_NEXT';
const sliderPrev = 'SLIDER_PREV';
const selectItem = 'SLIDER_SELECTITEM';

const initialState = {
    loading: false,
    rules: [],
    actions: [],
    procedures: [],
    departments: [],
    selectedDate: null,
    error: null,
    saved: false,
    step: 1,
    selectedItems: {}
};

export const actionCreators = {
    showLoading: () => ({ type: loading }),
    hideLoading: () => ({ type: hideLoading }),
    sliderNext: () => ({ type: sliderNext }),
    sliderPrev: () => ({ type: sliderPrev }),
    reset: () => ({ type: reset }),

    selectItem: (list, id) => ({ type: selectItem, list, id }),
    loadAll: () => async (dispatch) => {

        dispatch({ type: loading });

        const promises = {
            rules: await fetch("api/Rules"),
            departments: await fetch("api/Departments"),
            actions: await fetch('api/Actions'),
            procedures: await fetch('api/Procedures')
        };

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
        
        const promise = await fetch('api/Inspections',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
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

    if (action.type === sliderNext) {
        return {
            ...state,
            step: state.step + 1
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
            ...state,
            loading: false,
            rules: action.rules,
            departments: action.departments,
            actions: action.actions,
            procedures: action.procedures
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

    if (action.type === reset) {
        return {
            ...initialState,
            rules: state.rules,
            actions: state.actions,
            departments: state.departments,
            procedures: state.procedures
        };
    }

    return state;
};
