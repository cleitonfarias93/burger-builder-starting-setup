import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p><strong>Current Price: {props.totalPrice}</strong></p>
        {controls.map((elem) => {
            return (
                <BuildControl 
                    key={elem.label}
                    label={elem.label}
                    added={() => props.ingredientAdded(elem.type)}
                    removed={() => props.ingredientRemove(elem.type)}
                    disabled={props.disabledInfo[elem.type]}
                />
            )
        })}
        <button 
            disabled={!props.purchasable}
            className={classes.OrderButton}
            onClick={props.ordered}
        >
            {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>
    </div>
)
    


export default buildControls;