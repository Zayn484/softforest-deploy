import React from 'react';

const button = (props) => {
    return (
        <button
            className={["btn", props.btnType].join(' ')}
            style={props.style}
            onClick={props.clicked}
            disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default button;
