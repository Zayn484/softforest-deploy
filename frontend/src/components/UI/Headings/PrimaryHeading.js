import React from 'react';

const primaryHeading= props => <h1 className={["Primary-Heading",props.className].join(' ')}>{props.children}</h1>

export default primaryHeading;