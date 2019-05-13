import * as actionType from '../actions/actionTypes';

const initialState = {
    snapshots: []
}

const snapShotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_FILE:
            let addSnapshot = [
                ...state.snapshots
            ];
            addSnapshot = [];

            for (let el in action.fileList) {

                addSnapshot.push(action.fileList[el])
            }

            return {
                ...state,
                snapshots: addSnapshot
            }
        default:
            return {
                ...state
            }
    }
}

export default snapShotsReducer;