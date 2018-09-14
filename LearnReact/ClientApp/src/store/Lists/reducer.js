import { Lists, labels } from "../../constants";
import actionTypes from './actionTypes';

const initialState = {
    loading: false,
    error: null,
    loaded: false,
    rules: [],
    actions: [],
    procedures: [],
    departments: [],

    //baseData
    selectedList: Lists.departments,
    showModal: false,
    modalTitle: '',
    itemTitle: '',
    itemId: 0,
    deleteModal: false,

    //form
    selectedDate: null,
    saved: false,
    step: 1,
    selectedItems: {}
};


const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === actionTypes.LISTS_LOADING) {
        return {
            ...state,
            loading: true
        };
    }

    if (action.type === actionTypes.LISTS_HIDE_LOADING) {
        return {
            ...state,
            loading: false
        };
    }

    if (action.type === actionTypes.SLIDER_NEXT) {
        return {
            ...state,
            step: state.step + 1,
            error: null
        };
    }

    if (action.type === actionTypes.SLIDER_PREV) {
        return {
            ...state,
            step: state.step - 1
        };
    }

    if (action.type === actionTypes.SLIDER_SELECTITEM) {
        const selectedItems = Object.assign({}, state.selectedItems);
        selectedItems[action.list] = action.id;

        return {
            ...state,
            selectedItems: selectedItems
        };
    }

    if (action.type === actionTypes.LISTS_LOADED) {
        return {
            ...initialState,
            rules: action.rules,
            departments: action.departments,
            actions: action.actions,
            procedures: action.procedures,
            loaded: true
        };
    }

    if (action.type === actionTypes.SLIDER_SAVED) {
        return {
            ...state,
            loading: false,
            saved: true,
            error: null
        };
    }

    if (action.type === actionTypes.LISTS_ERROR) {
        return {
            ...state,
            loading: false,
            error: action.message
        };
    }

    if (action.type === actionTypes.LISTS_DISMISS_ERROR) {
        return {
            ...state,
            error: null
        };
    }

    if (action.type === actionTypes.SLIDER_RESET) {
        return {
            ...initialState,
            rules: state.rules,
            actions: state.actions,
            departments: state.departments,
            procedures: state.procedures,
            loaded: true
        };
    }

    if (action.type === actionTypes.BASEDATA_CHANGE_SELCTED_LIST) {
        return {
            ...state,
            selectedList: action.list
        };
    }

    if (action.type === actionTypes.BASEDATA_HIDE_MODAL) {
        return {
            ...state,
            showModal: false
        };
    }

    if (action.type === actionTypes.BASEDATA_ADD_NEW_ITEM) {
        return {
            ...state,
            showModal: true,
            itemId: 0,
            itemTitle: '',
            modalTitle: labels.addNew__.replace('__', state.selectedList)
        };
    }

    if (action.type === actionTypes.BASEDATA_UPDATE_ITEM) {
        return {
            ...state,
            showModal: true,
            itemId: action.id,
            itemTitle: action.title,
            modalTitle: labels.Edit__.replace('__', state.selectedList)
        };
    }

    if (action.type === actionTypes.BASEDATA_SET_ITEM_TITLE) {
        return {
            ...state,
            itemTitle: action.title
        };
    }

    if (action.type === actionTypes.BASEDATA_SAVE_NEW_ITEM) {

        let selectedList = null;
        switch (action.selectedListName) {
            case Lists.departments:
                selectedList = state.departments;
                selectedList.push({ id: action.id, title: action.title });
                return {
                    ...state,
                    departments: selectedList
                };
            case Lists.rules:
                selectedList = state.rules;
                selectedList.push({ id: action.id, title: action.title });
                return {
                    ...state,
                    rules: selectedList
                };
            case Lists.procedures:
                selectedList = state.procedures;
                selectedList.push({ id: action.id, title: action.title });
                return {
                    ...state,
                    procedures: selectedList
                };
            case Lists.actions:
            default:
                selectedList = state.actions;
                selectedList.push({ id: action.id, title: action.title });
                return {
                    ...state,
                    actions: selectedList
                };
        }
    }

    if (action.type === actionTypes.BASEDATA_SAVE_UPDATE_ITEM) {

        let selectedList = null;
        switch (action.selectedListName) {
            case Lists.departments:
                selectedList = state.departments.map(i => Object.assign({}, i));
                selectedList.filter(l => l.id === action.id)[0].title = action.title;
                return {
                    ...state,
                    departments: selectedList
                };
            case Lists.rules:
                selectedList = state.rules.map(i => Object.assign({}, i));
                selectedList.filter(l => l.id === action.id)[0].title = action.title;
                return {
                    ...state,
                    rules: selectedList
                };
            case Lists.procedures:
                selectedList = state.procedures.map(i => Object.assign({}, i));
                selectedList.filter(l => l.id === action.id)[0].title = action.title;
                return {
                    ...state,
                    procedures: selectedList
                };
            case Lists.actions:
            default:
                selectedList = state.actions.map(i => Object.assign({}, i));
                selectedList.filter(l => l.id === action.id)[0].title = action.title;
                return {
                    ...state,
                    actions: selectedList
                };
        }
    }

    if (action.type === actionTypes.BASEDATA_SHOW_DELETE_MODAL) {
        return {
            ...state,
            deleteModal: true,
            itemId: action.id
        };
    }

    if (action.type === actionTypes.BASEDATA_HIDE_DELETE_MODAL) {
        return {
            ...state,
            deleteModal: false
        };
    }

    if (action.type === actionTypes.BASEDATA_DELETE_ITEM) {
        let selectedList = null,
            index = -1;
        switch (action.selectedListName) {
            case Lists.departments:
                selectedList = state.departments.map(i => Object.assign({}, i));
                index = selectedList.indexOf(selectedList.filter(i => i.id === action.id)[0]);
                selectedList.splice(index, 1);
                return {
                    ...state,
                    departments: selectedList
                };
            case Lists.rules:
                selectedList = state.rules.map(i => Object.assign({}, i));
                index = selectedList.indexOf(selectedList.filter(i => i.id === action.id)[0]);
                selectedList.splice(index, 1);
                return {
                    ...state,
                    rules: selectedList
                };
            case Lists.procedures:
                selectedList = state.procedures.map(i => Object.assign({}, i));
                index = selectedList.indexOf(selectedList.filter(i => i.id === action.id)[0]);
                selectedList.splice(index, 1);
                return {
                    ...state,
                    procedures: selectedList
                };
            case Lists.actions:
            default:
                selectedList = state.actions.map(i => Object.assign({}, i));
                index = selectedList.indexOf(selectedList.filter(i => i.id === action.id)[0]);
                selectedList.splice(index, 1);
                return {
                    ...state,
                    actions: selectedList
                };
        }
    }

    return state;
};

export default reducer;