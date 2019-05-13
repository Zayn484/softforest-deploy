
import * as actionType from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    username: null,
    error: null,
    loading: false,
    signUp: false,
    occupation: null,
    authRedirectPath: '/shop'
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionType.Auth_SignUp_Success:
            return {
                ...state,
                loading: false,
                signUp: true
            }
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                username: action.username,
                occupation: action.occupation,
                loading: false
            };
        case actionType.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionType.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            };
        case actionType.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.authPath
            };
        default:
            return state;
    }
}

export default authReducer;