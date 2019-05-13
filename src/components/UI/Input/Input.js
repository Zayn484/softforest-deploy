import React from 'react';

const input = (props) => {

    let inputElement = null;
    let inputClass = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClass = "Invalid";
    }

    switch (props.elementType) {

        case ('input'):
            inputElement = <> <input className={["form-control ", inputClass, props.ClassName].join(' ')} {...props.elementConfig}
                onChange={props.changed}
                value={props.value}
                id={props.elementConfig.placeholder}
                placeholder={props.elementConfig.placeholder}
                required />
                <div className='ml-2 hint '><h5>{props.hint}</h5></div>
                <span className='text-danger'>{props.error}</span>
            </>

            break;
        case ('textarea'):
            inputElement = <> <textarea rows="5" className={["form-control  ", inputClass].join(' ')} {...props.elementConfig}
                onChange={props.changed} value={props.value} id={props.elementConfig.type} required />
                <div className='ml-2 hint'><h5>{props.hint}</h5></div>
            </>
            break;
        case ('select'):
            inputElement = <select className="form-control p-1 "
                value={props.value} onChange={props.changed} >
                {props.elementConfig.options.map(option => (
                    <option value={option.value} key={option.value}  >{option.displayValue}</option>
                ))}
            </select>;
            break;

        default:
            inputElement = <input className={["form-control", inputClass].join(' ')} {...props.label}
                onChange={props.changed} value={props.value} id={props.elementConfig.placeholder} />
    }

    return (
        <div className="form-group">
            <label htmlFor={props.elementConfig.type} className="form-label">{props.label}</label>
            {inputElement}
        </div>

    );
}

export default input;