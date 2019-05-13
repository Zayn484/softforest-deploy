import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const cartStart = () => {
    return {
        type: actionTypes.CART_START
    };
}

export const cartSuccess = (cartData, cart) => {
    return {
        type: actionTypes.CART_SUCCESS,
        check: cartData,
        cartAdded: cart
    }
}

export const cartError = (error) => {
    return {
        type: actionTypes.CART_ERROR,
        error: error
    }
}

export const checkToCart = (userId, softwareId) => {
    return dispatch => {
        dispatch(cartStart());
        axios.get(`/cart/${userId}/`)
            .then(res => {
                const match = res.data.projects.filter(item => item === softwareId);
                let added = false;
                if (match != '') {
                    added = true
                    dispatch(cartSuccess(res.data, added));
                }
                dispatch(cartSuccess(res.data, added));
            })
            .catch(err => {
                dispatch(cartError(err.response));
            })
    }
}

export const addToCart = (check, userId, id) => {
    return dispatch => {
        dispatch(cartStart());
        if (check.id > 0 && userId) {
            let project = [...check.projects];
            project.push(id);
            const data = {
                ...check,
                projects: project
            }
            axios.patch(`/cart/${userId}/`, data)
                .then(res => {
                    const added = true;
                    dispatch(cartSuccess(res.data, added));
                })
                .catch(err => {
                    dispatch(cartError(err.response.data));
                })
        }
        else if (check.id == 0 && userId) {
            const request = {
                user: userId,
                projects: [id]
            }
            axios.post(`/cart/`, request)
                .then(res => {
                    const added = true;
                    dispatch(cartSuccess(res.data, added));
                })
                .catch(err => {
                    dispatch(cartError(err.response.data));
                })
        }
    }
}