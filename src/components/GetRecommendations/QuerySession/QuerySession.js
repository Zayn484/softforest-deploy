import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Steps } from 'antd';

import Categories from './Question/Categories/Categories';
import Technologies from './Question/Technologies/Technologies';
import BackgroundKnowledge from './Question/BackgroundKnowledge/BackgroundKnowledge';
import Button from '../../../components/UI/Button/Button';
import * as actionTypes from '../../../store/actions/actionTypes';

const Step = Steps.Step;

const steps = [{
	title: 'Categories'
}, {
	title: 'Technologies'
}, {
	title: 'Knowledge'
}];

class QuerySession extends Component {

	state = {
		current: 0
	}

	next = () => {
		const current = this.state.current + 1;
		this.setState({ current });
		this.props.nextStepHandler();
	}

	prev = () => {
		const current = this.state.current - 1;
		this.setState({ current });
		this.props.prevStepHandler();
	}

	componentWillUnmount() {
		this.props.resetStepHandler();
	}

	render() {
		const { current } = this.state;
		let step;

		if (this.props.step < 0) {
			step = <Redirect to="/" />
		}

		if (this.props.step === 0) {
			step = <Categories />
		}

		if (this.props.step === 1) {
			step = <Technologies />
		}

		if (this.props.step === 2) {
			step = <BackgroundKnowledge />
		}

		if (this.props.step > 2) {

			let search = null;
			if ((this.props.categories && this.props.technologies && this.props.knowledge) !== null) {

				const categoryParams = [];
				for (let i in this.props.categories) {
					categoryParams.push(this.props.categories[encodeURIComponent(i)].replace(' ', '+'));
				}
				const technologiesParams = [];
				for (let i in this.props.technologies) {
					technologiesParams.push(this.props.technologies[encodeURIComponent(i)].replace(' ', '+'));
				}
				const knowledgeParams = [];
				for (let i in this.props.knowledge) {
					knowledgeParams.push(this.props.knowledge[encodeURIComponent(i)].replace(' ', '+'));
				}
				search = 'categories=' + categoryParams + '&technologies=' + technologiesParams + '&knowledge=' + knowledgeParams;
			}

			step = <Redirect to={{
				pathname: '/signup',
				search: search
			}} />
		}

		return (
			<div className='container'>
				<Steps current={current}>
					{steps.map(item => <Step key={item.title} title={item.title} />)}
				</Steps>
				<div className='Recommendation-Query-Section'>
					{step}
				</div>

				<Button btnType="Btn-primary Btn-md "
					clicked={this.prev}>back</Button>
				<Button btnType={"Btn-primary Btn-md float-right " + (this.props.categories.length === 0 ? 'Btn-disable' : '')}
					clicked={this.next} disabled={this.props.disabled} > next</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		step: state.recomendationReducer.step,
		disabled: state.recomendationReducer.disabled,
		categories: state.recomendationReducer.categories,
		technologies: state.recomendationReducer.technologies,
		knowledge: state.recomendationReducer.knowledge
	};
};

const mapDispatchToProps = dispatch => {
	return {
		nextStepHandler: () => dispatch({ type: actionTypes.NEXT_STEP_HANDLER }),
		prevStepHandler: () => dispatch({ type: actionTypes.PREV_STEP_HANDLER }),
		resetStepHandler: () => dispatch({ type: actionTypes.RESET_STEP_HANDLER }),
		disableButtonHandler: () => dispatch({ type: actionTypes.DISABLE_BUTTON_HANDLER })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuerySession);
