import React from 'react';

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const unOrderList = (props) => {
    const list = props.list.map((key, index) => (
        <li key={index}
            className={props.className}
            style={props.style}
            onClick={props.clicked} >
            <i className={props.fa}></i>
            &nbsp;&nbsp;{key.name ? capitalize(key.name) : capitalize(key)}
        </li>
    ));

    return (
        <ul className="Normal-Font-Size UnOrderList">
            {list}
        </ul>
    )
}

export default unOrderList;