import { CommonActions } from '../constants';

const selectItem = 'SLIDER_SELECTITEM';
const next = 'SLIDER_NEXT';
const prev = 'SLIDER_PREV';
const error = 'SLIDER_ERROR';

const initialState = {
    step: 1,
    selectedItems: {},
    errorMessage: null
};

export const actionCreators = {
    next: () => ({ type: next }),
    prev: () => ({ type: prev }),
    selectItem: (list, id) => ({ type: selectItem, list, id }),
    error: (message) => ({ type: error, message }),
    save: (selectedItems) => (dispatch) => {
        dispatch({
            type: CommonActions.saveInspection,
            selectedItems
        })
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === next) {
        return {
            ...state,
            step: state.step + 1
        };
    }

    if (action.type === prev) {
        return {
            ...state,
            step: state.step - 1
        };
    }

    if (action.type === error) {
        return {
            ...state,
            errorMessage: action.message
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

    return state;
};
