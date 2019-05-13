import * as actionTypes from './actionTypes';

export const addFile = (fileList) => {
    return {
        type: actionTypes.ADD_FILE,
        fileList: fileList
    }
}
