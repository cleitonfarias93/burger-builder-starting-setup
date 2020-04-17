import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigatiomItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem exact link="/">Burger Builder</NavigationItem>
    {props.isAuthenticate ? <NavigationItem link="/orders">Oders</NavigationItem> : null}
    {!props.isAuthenticate 
      ? <NavigationItem link="/auth">Authenticate</NavigationItem>
      : <NavigationItem link="/logout">Logout</NavigationItem>
    }
  </ul>
)

export default navigatiomItems;