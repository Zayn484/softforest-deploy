import React from 'react';

const secondaryHeading= props => <h2 className={["Secondary-Heading",props.className].join(' ')}>{props.children}</h2>

export default secondaryHeading;