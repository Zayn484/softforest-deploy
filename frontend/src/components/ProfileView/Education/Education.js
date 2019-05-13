import React from 'react';
import SecondaryHeading from '../../UI/Headings/SecondaryHeading';
import UnOrderList from '../../UI/UnOrderList/UnOrderList';
const education=(props)=>(
    <div className="row col-md-11 mx-auto mt-5">
        <div className="row col-md-12">
            <SecondaryHeading>EDUCATION</SecondaryHeading>
        </div>
        <div className="App__Module__Modules App__Row row col-md-12">
            <UnOrderList    
                list={props.Education}
                className="Font-Education p-3"
            />
        </div>
    </div>
);

export default education;