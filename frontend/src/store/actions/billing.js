import * as actionTypes from './actionTypes';
import axios from 'axios';

export const billingSuccess=data=>{
    return{
        type:actionTypes.BILLING_SUCCESS,
        data:data
    }
}

export const billingError=error=>{
    return{
        type:actionTypes.BILLING_ERROR,
        error:error
    }
}


export const billing=(userId)=>{
    return dispatch=>{
        axios.get(`http://127.0.0.1:8000/api/billing/${this.props.userId}/`)
        .then(res=>{
           dispatch(billingSuccess(res.data));
        })
        .catch(err=>{
            dispatch(billingError(err.response));
        })
    }
}