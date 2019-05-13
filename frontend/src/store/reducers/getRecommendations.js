import * as actionTypes from '../actions/actionTypes';

const initialState = {
    step: 0,
    disabled: true,
    categories: [],
    technologies: [],
    knowledge: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.DISABLE_BUTTON_HANDLER:
            return {
                ...state,
                disabled: false
            };

        case actionTypes.NEXT_STEP_HANDLER:
            return {
                ...state,
                step: state.step + 1
            };

        case actionTypes.PREV_STEP_HANDLER:
            return {
                ...state,
                step: state.step - 1,
            };

        case actionTypes.RESET_STEP_HANDLER:
            return {
                ...state,
                step: 0,
                categories: [],
                technologies: [],
                knowledge: []
            };

        case actionTypes.ADD_CATEGORY_START:
            return {
                ...state,
                categories: []
            };

        case actionTypes.ADD_CATEGORY_HANDLER:
            // Look for existing element in @categories and removes
            let categoryExists = state.categories.indexOf(action.payload) > -1;
            let categories = state.categories.slice();

            if (categoryExists) {
                categories = categories.filter(id => id != action.payload);
            }
            else {
                categories.push(action.payload);
            }
            return {
                ...state,
                categories,
                disabled: false
            }

        case actionTypes.ADD_TECHNOLOGY_START:
            return {
                ...state,
                technologies: []
            };


        case actionTypes.ADD_TECHNOLOGY_HANDLER:
            // Look for existing element in @technologies and removes
            let technologyExists = state.technologies.indexOf(action.payload) > -1;
            let technologies = state.technologies.slice();

            if (technologyExists) {
                technologies = technologies.filter(id => id != action.payload);
            }
            else {
                technologies.push(action.payload);
            }
            return {
                ...state,
                technologies,
                disabled: false
            }

        case actionTypes.ADD_KNOWLEDGE_START:
            return {
                ...state,
                knowledge: []
            };


        case actionTypes.ADD_KNOWLEDGE_HANDLER:
            // Look for existing element in @knowledge and removes
            let knowledgeExists = state.knowledge.indexOf(action.payload) > -1;
            let knowledge = state.knowledge.slice();

            if (knowledgeExists) {
                knowledge = knowledge.filter(id => id != action.payload);
            }
            else {
                knowledge.push(action.payload);
            }
            return {
                ...state,
                knowledge,
                disabled: false
            }

        default:
            return state;
    }
};

export default reducer;