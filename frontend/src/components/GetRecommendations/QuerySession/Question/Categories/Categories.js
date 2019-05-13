import React, { Component } from 'react'

import { connect } from 'react-redux';

import DesktopPic from '../../../../../assets/img/DumyImages/desktop_mac.svg';
import MobilePic from '../../../../../assets/img/DumyImages/mobile_screen.svg';
import WebPic from '../../../../../assets/img/DumyImages/web.svg';
import Category from './Category/Category';
import * as actionTypes from '../../../../../store/actions/actionTypes';

class Categories extends Component {

    state = {
        quiz: {
            title: 'quiz title',
            questions: [
                {
                    option: 'Desktop apps',
                    img: DesktopPic,
                    value: 1,
                    id: 'desktop-apps'
                },
                {
                    option: 'Mobile apps',
                    img: MobilePic,
                    value: 2,
                    id: 'mobile-apps'
                },
                {
                    option: 'Web apps',
                    img: WebPic,
                    value: 3,
                    id: 'web-apps'
                }
            ]
        },
        user_answers: []
    };

    componentWillMount() {
        this.props.addCategoryStart();
    }

    render() {

        let categories = this.state.quiz.questions.map(el => {
            return (
                <Category key={el.option}
                    src={el.img}
                    label={el.option}
                    value={el.value}
                    id={el.id}
                    clicked={() => this.props.addCategoryHandler(el.id)}
                />

            );
        })

        return (
            <>
                <h1 className='Secondary-Heading'>Select your category</h1>
                <div id='checkboxes' className='row col-md-9 mx-auto mt-5 mb-5' >
                    {categories}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.recomendationReducer.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addCategoryStart: () => dispatch({ type: actionTypes.ADD_CATEGORY_START }),
        addCategoryHandler: (id) => dispatch({ type: actionTypes.ADD_CATEGORY_HANDLER, payload: id })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
