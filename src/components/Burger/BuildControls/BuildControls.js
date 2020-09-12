import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Meat', type: 'meat'},
    { label: 'Cheese', type: 'cheese'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.currentPrice.toFixed(2)}</strong></p>
    {controls.map(ctr => (
        <BuildControl 
        key={ctr.label} 
        label={ctr.label}
        added ={() => props.ingredientAdd(ctr.type)}
        removed ={() => props.ingredientRemove(ctr.type)}
        disabledinfo = {props.disableInfo[ctr.type]}>
        </BuildControl>
    ))}

    </div>
);

export default buildControls;
