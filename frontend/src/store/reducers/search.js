import * as actionType from '../actions/actionTypes';

const initialState = {
    search: false
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SEARCH:
            return {
                ...state,
                search: action.search
            }
        default:
            return {
                ...state
            }
    }
}

export default searchReducer;