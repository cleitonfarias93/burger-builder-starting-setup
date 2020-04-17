import React from 'react';

import classes from './Input.css'

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    switch(props.elementType) {
        case('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
            break;
        case('textarea'):
            inputElement = <textarea
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
            break;
        case('select'):
        inputElement = (
            <select
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map( element => (
                    <option key={element.value} value={element.value}>
                        {element.displayValue}
                    </option>
                ))}
            </select>
        );
        break;
        default:
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}/>
    }

    let validationError = null
    if(props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}



export default input;