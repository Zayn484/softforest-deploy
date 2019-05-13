import React from 'react';

const paragraph= props => <p className={["Normal-Font-Size",props.className].join(' ')}>{props.children}</p>;

export default paragraph;