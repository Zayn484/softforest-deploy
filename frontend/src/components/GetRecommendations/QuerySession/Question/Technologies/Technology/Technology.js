import React from 'react';

import Checkbox from '../../../../../../components/UI/Checbox/Checbox';

const technology = (props) => {
    return (
        <div className='Normal-Font-Size'>
            <Checkbox id={props.id} clicked={props.clicked}>{props.children}</Checkbox>
        </div>

    )
};

export default technology;
