import React from 'react';

import { NavLink } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';

const getRecommendations = (props) => (
	<section className="Recommendation-Section Content">
		<div className="container">
			<div className="row text-center">
				<div className="col">
					<h1 className="Primary-Heading mt-5">get recommendations</h1>
					<p className="Normal-Font-Size">Just answer some of questions to recieve recommended softwares</p>
				</div>
			</div>
			<div className="row">
				<div className=" mx-auto">
					<NavLink to="/get-recommendations">
						<Button btnType="Btn-primary Btn-md btn-block"
							clicked={props.click}>
							lets go
						</Button>
					</NavLink>
				</div>
			</div>
		</div>
	</section>
);

export default getRecommendations;
