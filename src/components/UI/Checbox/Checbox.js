import React from 'react';

const checkbox = (props) => {
    return (
        <div className="custom-control form-control-lg custom-checkbox">
            <input type="checkbox" className="custom-control-input" id={props.id} onClick={props.clicked} />
            <label className="custom-control-label ml-2 Normal-Font-Size" htmlFor={props.id}>{props.children}</label>
        </div>
    )
};

export default checkbox;
