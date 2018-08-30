const testAction = 'TEST_ACTION';
const allRules = 'ALLRULES';
const loading = 'LOADING';
const initialState = { test: 'init value' };

export const actionCreators = {
    run: () => ({ type: testAction }),
    load: () => async (dispatch) => {

        dispatch({ type: loading });

        const url = `api/Rules`;
        const response = await fetch(url);
        const rules = await response.json();

        dispatch({ type: allRules, rules });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === testAction) {
        return { ...state, test: "changed value" };
    }

    if (action.type === allRules) {
        return {
            ...state,
            test: "loaded",
            rules: action.rules
        };
    }

    if (action.type === loading) {
        return {
            ...state,
            test: "loading"
        };
    }

    return state;
};
