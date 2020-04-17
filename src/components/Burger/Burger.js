import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => { 

    let arrayIngredients = Object.keys(props.ingredients) /*extrai as chaves do obj e retorna um array */
    .map(igKey => { /*o array com as chaves é percorrido pelo map */
        return [...Array(props.ingredients[igKey])]
        .map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if(arrayIngredients.length === 0){
        arrayIngredients = <p>Please start adding ingredients</p>
    }

    return(

        <div className={classes.Burger}> 
            <BurgerIngredient type="bread-top"/>            
            {arrayIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default withRouter(burger);

/*Com o withRouter você consegue passar no history */