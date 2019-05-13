import * as actionTypes from './actionTypes';

export const addSourceFile = (file) => {
    return {
        type: actionTypes.ADD_SOURCE_FILE,
        file: file
    }
}
