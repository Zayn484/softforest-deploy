import React from 'react';

const tertiayrHeading = props =>
    (
        <h1
            className={["Tertiary-Heading", props.className].join(' ')}
            style={props.style}>
            {props.children}
        </h1>
    );

export default tertiayrHeading;