import * as actionType from '../actions/actionTypes';

const initialState = {
    modules: [],
    technologies: [],
    requirements: []
};

const dynamicFormItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_MODULES_HANDLER:
            let addModule = [
                ...state.modules
            ];
            addModule.push(action.value);

            return {
                ...state,
                modules: addModule
            }

        case actionType.REMOVE_MODULES_HANDLER:
            let removeModule = [
                ...state.modules
            ];
            delete removeModule[action.index]
            return {
                ...state,
                modules: removeModule
            }
        case actionType.ADD_TECHNOLOGIES_HANDLER:
            let addTechnology = [
                ...state.technologies
            ];
            addTechnology.push(action.value);

            return {
                ...state,
                technologies: addTechnology
            }
        case actionType.REMOVE_TECHNOLOGIES_HANDLER:
            let removeTechnology = [
                ...state.technologies
            ];
            delete removeTechnology[action.index]
            return {
                ...state,
                technologies: removeTechnology
            }
        case actionType.ADD_REQUIREMENTS_HANDLER:
            let addRequirement = [
                ...state.requirements
            ];
            addRequirement.push(action.value);

            return {
                ...state,
                requirements: addRequirement
            }
        case actionType.REMOVE_REQUIREMENTS_HANDLER:
            let removeRequirement = [
                ...state.requirements
            ];
            delete removeRequirement[action.index]
            return {
                ...state,
                requirements: removeRequirement
            }


        default:
            return {
                ...state
            }
    }
}

export default dynamicFormItemReducer;