import { CommonActions } from '../constants';

const next = 'SLIDER_NEXT';
const prev = 'SLIDER_PREV';

const initialState = {
    step: 1,
    selectedItems: {}
};

export const actionCreators = {
    next: () => ({ type: next }),
    prev: () => ({ type: prev }),
    selectItem: (list, id) => (dispatch) => {
        dispatch({
            type: CommonActions.selectItem,
            list,
            id
        });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === next) {
        return { ...state, step: state.step + 1 };
    }

    if (action.type === prev) {
        return { ...state, step: state.step - 1 };
    }

    if (action.type === CommonActions.selectItem) {
        const selectedItems = Object.assign({}, state.selectedItems);
        selectedItems[action.list] = action.id;

        return {
            ...state,
            selectedItems: selectedItems
        };
    }

    return state;
};
