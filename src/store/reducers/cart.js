import * as actionType from '../actions/actionTypes';

const initialState = {
    check: { id: 0, projects: [] },
    cartAdded: false,
    error: null,
    loading: false
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CART_SUCCESS:
            return {
                ...state,
                check: action.check,
                cartAdded: action.cartAdded,
                loading: false
            }
        case actionType.CART_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
                check: { id: 0, projects: [] }
            }
        default:
            return state;
    }
}

export default cartReducer;