import React from 'react';

import TertiaryHeading from '../UI/Headings/TertiaryHeading';
import ProfilePic from '../../assets/img/ProfilePic/develperDumyProfilePic.png';

const card = (props) => {
    return (
        <div className='col-md-4'>
            <div className='card col-11 bg-white'>

                <img className='card-img-top' src={ProfilePic} alt={props.title} />
                <div className='card-body'>
                    <h5 className="card-title">{props.title}</h5>
                    <TertiaryHeading className='Primary-Font-Color'>${props.price}</TertiaryHeading>
                </div>
            </div>
        </div>
    )
};

export default card;