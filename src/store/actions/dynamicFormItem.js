import * as actionTypes from './actionTypes';

export const addModule = (value, index) => {
    return {
        type: actionTypes.ADD_MODULES_HANDLER,
        value: value,
        index: index
    }
}

export const removeModule = (index) => {
    return {
        type: actionTypes.REMOVE_MODULES_HANDLER,
        index: index
    }
}

export const addTechnology = (value, index) => {
    return {
        type: actionTypes.ADD_TECHNOLOGIES_HANDLER,
        value: value,
        index: index
    }
}

export const removeTechnology = (index) => {
    return {
        type: actionTypes.REMOVE_TECHNOLOGIES_HANDLER,
        index: index
    }
}


export const addRequirement = (value, index) => {
    return {
        type: actionTypes.ADD_REQUIREMENTS_HANDLER,
        value: value,
        index: index
    }
}

export const removeRequirement = (index) => {
    return {
        type: actionTypes.REMOVE_REQUIREMENTS_HANDLER,
        index: index
    }
}
