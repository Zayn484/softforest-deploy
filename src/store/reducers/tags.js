import * as actionType from '../actions/actionTypes';

const initialState = {
    tags: []
};

const tagReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_TAG_HANDLER:
            let addTag = [
                ...state.tags
            ];
            addTag.push(action.value);
            return {
                ...state,
                tags: addTag
            }
        default:
            return {
                ...state
            }
    }
}

export default tagReducer;