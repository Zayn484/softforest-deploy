import * as actionTypes from './actionTypes';

export const search = (search) => {
    return {
        type: actionTypes.SEARCH,
        search: search
    }
}