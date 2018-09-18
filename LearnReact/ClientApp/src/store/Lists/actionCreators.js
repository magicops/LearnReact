import { Lists, labels } from "../../constants";
import * as Auth from '../../helpers/Auth';
import actionTypes from './actionTypes';

export const actionCreators = {
    showLoading: () => ({ type: actionTypes.LISTS_LOADING }),
    hideLoading: () => ({ type: actionTypes.LISTS_HIDE_LOADING }),
    dismissError: () => ({ type: actionTypes.LISTS_DISMISS_ERROR }),

    //createInspectioon
    sliderNext: () => (dispatch, getState) => {
        const { step, selectedItems, selectedDate } = getState().lists;

        let listTitle = '';
        switch (step) {
            case 1:
                if (!selectedDate) {
                    dispatch({ type: actionTypes.LISTS_ERROR, message: labels.selectADate });
                    return;
                }

                dispatch({ type: actionTypes.SLIDER_NEXT });
                return;
            case 2: listTitle = Lists.departments; break;
            case 3: listTitle = Lists.rules; break;
            case 4: listTitle = Lists.procedures; break;
            default: listTitle = Lists.actions; break;
        }

        if (!selectedItems[listTitle]) {
            dispatch({ type: actionTypes.LISTS_ERROR, message: labels.select__List.replace('__', listTitle) });
            return;
        }

        dispatch({ type: actionTypes.SLIDER_NEXT });
    },
    sliderPrev: () => ({ type: actionTypes.SLIDER_PREV }),
    reset: () => ({ type: actionTypes.SLIDER_RESET }),
    selectItem: (list, id) => ({ type: actionTypes.SLIDER_SELECTITEM, list, id }),
    sliderSelectDate: (date) => ({ type: actionTypes.SLIDER_SELECT_DATE, date }),
    loadAll: () => async (dispatch, getState) => {

        if (getState().lists.loaded)
            return;

        dispatch({ type: actionTypes.LISTS_LOADING });

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
            dispatch({ type: actionTypes.LISTS_HIDE_LOADING });
            dispatch({ type: actionTypes.LISTS_ERROR, message: labels.loadFaild });
            return;
        }

        const results = {
            rules: await promises.rules.json(),
            departments: await promises.departments.json(),
            actions: await promises.actions.json(),
            procedures: await promises.procedures.json()
        };

        dispatch({
            type: actionTypes.LISTS_LOADED,
            rules: results.rules,
            departments: results.departments,
            actions: results.actions,
            procedures: results.procedures
        });
    },
    save: (lists, selectedItems, selectedDate) => async (dispatch) => {

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
            dispatch({ type: actionTypes.LISTS_ERROR, message: labels.select__List.replace('__', emptyListTitle) });
            return;
        }

        dispatch({ type: actionTypes.LISTS_LOADING });

        const inspection = {
            date: selectedDate,
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
            dispatch({ type: actionTypes.LISTS_HIDE_LOADING });
            dispatch({ type: actionTypes.LISTS_ERROR, message: labels.saveFaild });
            return;
        }

        await promise.json();
        dispatch({ type: actionTypes.SLIDER_SAVED });
    },

    //baseData
    changeSelectedList: (list) => ({ type: actionTypes.BASEDATA_CHANGE_SELCTED_LIST, list }),
    hideModal: () => ({ type: actionTypes.BASEDATA_HIDE_MODAL }),
    addNewItem: () => ({ type: actionTypes.BASEDATA_ADD_NEW_ITEM }),
    updateItem: (id, title) => ({ type: actionTypes.BASEDATA_UPDATE_ITEM, id, title }),
    setItemTitle: (title) => ({ type: actionTypes.BASEDATA_SET_ITEM_TITLE, title }),
    submitItemTitle: (id, title, selectedListName, selectedList) => async (dispatch) => {

        let isNew = id === 0;

        if (title === '') {
            dispatch({ type: actionTypes.LISTS_ERROR, message: labels.enterTitleError });
            return;
        }

        if (selectedList.filter(l => l.title === title && id !== l.id).length > 0) {
            dispatch({ type: actionTypes.LISTS_ERROR, message: labels.titleExists });
            return;
        }

        let selectedItem = selectedList.filter(l => id === l.id)[0];

        //same title while editing an item
        if (selectedItem && selectedItem.title === title) {
            return;
        }

        dispatch({ type: actionTypes.LISTS_LOADING });

        let url = '';

        switch (selectedListName) {
            case Lists.departments:
                url = 'api/Departments';
                break;
            case Lists.rules:
                url = 'api/Rules';
                break;
            case Lists.procedures:
                url = 'api/Procedures';
                break;
            case Lists.actions:
                url = 'api/Actions';
                break;
            default:
                break;
        }

        if (!isNew)
            url += `/${id}`

        let promise = await Auth.getFetch(url, {
            method: isNew ? 'POST' : 'PUT',
            body: JSON.stringify({
                id,
                title
            })
        });

        if (!promise.ok) {
            dispatch({ type: actionTypes.LISTS_HIDE_LOADING });
            dispatch({ type: actionTypes.BASEDATA_HIDE_MODAL });
            dispatch({ type: actionTypes.LISTS_ERROR, message: labels.saveFaild });
            return;
        }

        if (isNew) {
            const newItem = await promise.json();
            id = newItem.id;
        }


        dispatch({ type: actionTypes.LISTS_HIDE_LOADING });
        dispatch({ type: actionTypes.BASEDATA_HIDE_MODAL });
        dispatch({
            type: isNew ? actionTypes.BASEDATA_SAVE_NEW_ITEM : actionTypes.BASEDATA_SAVE_UPDATE_ITEM,
            selectedListName,
            id,
            title
        });
    },
    hideDeleteModal: () => ({ type: actionTypes.BASEDATA_HIDE_DELETE_MODAL }),
    showDeleteModal: id => ({ type: actionTypes.BASEDATA_SHOW_DELETE_MODAL, id }),
    deleteItem: (id, selectedListName) => async (dispatch) => {
        dispatch({ type: actionTypes.LISTS_LOADING });

        let url = '';
        switch (selectedListName) {
            case Lists.departments:
                url = 'api/Departments';
                break;
            case Lists.rules:
                url = 'api/Rules';
                break;
            case Lists.procedures:
                url = 'api/Procedures';
                break;
            case Lists.actions:
                url = 'api/Actions';
                break;
            default:
                break;
        }

        const promise = await Auth.getFetch(`${url}/${id}`, {
            method: 'DELETE'
        });

        dispatch({ type: actionTypes.LISTS_HIDE_LOADING });
        dispatch({ type: actionTypes.BASEDATA_HIDE_DELETE_MODAL });

        if (!promise.ok) {
            dispatch({ type: actionTypes.LISTS_ERROR, message: labels.saveFaild });
            return;
        }

        dispatch({ type: actionTypes.BASEDATA_DELETE_ITEM, id, selectedListName });
    },

    //inspections

};