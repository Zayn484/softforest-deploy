import * as actionType from '../actions/actionTypes';

const initialState={
    billingProfile:null,
    error:null
}

const billingReducer=(state=initialState,action)=>{
    switch(action.type){
        case actionType.BILLING_SUCCESS:
            return{
                ...state,
                billingProfile:action.data
            }
        case actionType.BILLING_ERROR:
            return{
                ...state,
                error:action.error
            }
    }
}
export default billingReducer;