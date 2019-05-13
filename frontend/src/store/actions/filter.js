import * as actionTypes from './actionTypes';

export const applyFilter = (apply) => {
    return {
        type: actionTypes.APPLY_FILTER,
        apply: apply
    }
}

export const addPlatformFilter = (list) => {
    return {
        type: actionTypes.ADD_PLATFORM,
        list: list
    }
}

export const addTechnologyFilter = (list) => {
    return {
        type: actionTypes.ADD_TECHNOLOGY,
        list: list
    }
}

export const addPriceFilter = (list) => {
    return {
        type: actionTypes.ADD_PRICE,
        list: list
    }
}
