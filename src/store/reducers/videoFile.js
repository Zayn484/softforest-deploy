import * as actionType from '../actions/actionTypes';

const initialState = {
    video: {}
}

const videoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_VIDEO:
            return {
                ...state,
                video: action.video
            }
        default:
            return {
                ...state
            }
    }
}

export default videoReducer;