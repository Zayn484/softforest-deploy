import * as actionType from '../actions/actionTypes';

const initialState = {
    file: {}
}

const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_SOURCE_FILE:
            return {
                ...state,
                file: action.file
            }
        default:
            return {
                ...state
            }
    }
}

export default fileReducer;