import React, { Component } from 'react'

import { connect } from 'react-redux';

import RadioButton from '../../../../../components/UI/RadioButton/RadioButton';
import * as actionTypes from '../../../../../store/actions/actionTypes';

class BackgroundKnowledge extends Component {

    state = {
        knowledge: [
            {
                id: '1',
                level: 'Entry'
            },
            {
                id: '2',
                level: 'Moderate'
            },
            {
                id: '3',
                level: 'Expert'
            }
        ]
    }

    componentWillMount() {
        this.props.addKnowledgeStart();
    }

    render() {

        const radioButtons = this.state.knowledge.map(el => {
            return (
                <RadioButton key={el.id}
                    id={el.id}
                    clicked={() => this.props.addKnowledgeHandler(el.level)}>
                    {el.level}
                </RadioButton>
            );
        })

        return (
            <div>
                <h1 className='Secondary-Heading'>Background knowledge</h1>
                <div className='mt-5 ml-5'>{radioButtons}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        knowledge: state.recomendationReducer.knowledge
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addKnowledgeStart: () => dispatch({ type: actionTypes.ADD_KNOWLEDGE_START }),
        addKnowledgeHandler: (level) => dispatch({ type: actionTypes.ADD_KNOWLEDGE_HANDLER, payload: level })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundKnowledge);