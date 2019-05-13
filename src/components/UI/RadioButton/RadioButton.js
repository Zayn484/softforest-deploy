import React from 'react';

const radioButton = (props) => {
    return (
        <div className="custom-control custom-radio">
            <input type="radio" id={props.id} name="customRadio" className="custom-control-input" onClick={props.clicked} />
            <label className="custom-control-label Normal-Font-Size mt-1 ml-1" htmlFor={props.id}>{props.children}</label>
        </div>
    )
};

export default radioButton;
