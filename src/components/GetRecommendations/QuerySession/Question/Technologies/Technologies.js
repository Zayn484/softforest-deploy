import React, { Component } from 'react';

import { connect } from 'react-redux';

import Technology from './Technology/Technology';
import * as actionTypes from '../../../../../store/actions/actionTypes';

class Technologies extends Component {

    state = {
        technologies: [
            {
                id: '1',
                technology: 'C++'
            },
            {
                id: '2',
                technology: 'C'
            },
            {
                id: '3',
                technology: 'Python'
            }
        ]
    };

    componentWillMount() {
        this.props.addTechnologyStart();
    }

    render() {

        let technologies = this.state.technologies.map(el => {
            return (
                <Technology key={el.id}
                    id={el.id}
                    clicked={() => this.props.addTechnologyHandler(el.technology)}>
                    {el.technology}
                </Technology>
            );
        })

        return (
            <>
                <h1 className='Secondary-Heading'>Select your technologies</h1>
                <div className='mt-5 ml-5'>{technologies}</div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        technologies: state.recomendationReducer.technologies,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addTechnologyStart: () => dispatch({ type: actionTypes.ADD_KNOWLEDGE_START }),
        addTechnologyHandler: (technology) => dispatch({ type: actionTypes.ADD_TECHNOLOGY_HANDLER, payload: technology })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Technologies);
