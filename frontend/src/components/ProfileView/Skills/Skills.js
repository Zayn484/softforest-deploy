import React from 'react';
import SecondaryHeading from '../../UI/Headings/SecondaryHeading';
import UnOrderList from '../../UI/UnOrderList/UnOrderList';

const skills = (props) => (
    <div className="row col-md-11 mx-auto mt-5">
        <div className="row col-md-12">
            <SecondaryHeading>SKILLS</SecondaryHeading>
        </div>
        <div className="row col-md-12 ml-1">
            <UnOrderList list={props.skills} fa="fas fa-check-circle" />
        </div>
    </div>
);

export default skills;