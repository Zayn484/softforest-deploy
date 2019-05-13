import React from 'react';

const category = (props) => {
    return (
        <div className="Category-Checkbox card col-md-3 mx-auto mb-5" >
            <input type="checkbox" name="rGroup" value={props.value} id={props.id} />
            <label className='Category-Checkbox__Body' htmlFor={props.id} onClick={props.clicked}>
                <img className="card-img-top" src={props.src} alt={props.src} />
                <div className="card-body text-center">
                    <p className="Normal-Font-Size card-text">{props.label}</p>
                </div>
            </label>
        </div>
    )
};

export default category;
