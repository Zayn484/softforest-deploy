import * as actionTypes from './actionTypes';

export const addTag = (value) => {
    return {
        type: actionTypes.ADD_TAG_HANDLER,
        value: value,
    }
}