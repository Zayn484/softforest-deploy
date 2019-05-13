import * as actionType from '../actions/actionTypes';

const initialState = {
    platformList: null,
    technologyList: null,
    priceList: null,
    applyFilter: false
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_PLATFORM:
            let platformList = state.platformList;
            platformList = [];
            action.list.map(el => {
                platformList.push(el);
            })
            return {
                ...state,
                platformList: platformList
            }
        case actionType.ADD_TECHNOLOGY:
            let technologyList = state.technologyList;
            technologyList = [];
            action.list.map(el => {
                technologyList.push(el);
            })
            return {
                ...state,
                technologyList: technologyList
            }
        case actionType.ADD_PRICE:
            let priceList = state.priceList;
            priceList = [];
            action.list.map(el => {
                priceList.push(el);
            })
            return {
                ...state,
                priceList: priceList
            }
        case actionType.APPLY_FILTER:
            return {
                ...state,
                applyFilter: action.apply
            }

        default:
            return {
                ...state
            }
    }
}

export default filterReducer;