import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES ={
    salad: 5.00,
    bacon: 5.00,
    cheese: 10.00,
    meat: 15.00
}

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0 
        },
        totalPrice: 5.00
    }

    addIngredientHandler = (type) => {
        //Count
        const oldCount  = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type]=updatedCount;
        //Price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice= this.state.totalPrice;
        const newPrice= oldPrice + priceAddition;
        //Update State
        this.setState({ingredients:updateIngredients, totalPrice:newPrice});
    }

    removeIngredientHandler = (type) => {
        //Count
        const oldCount  = this.state.ingredients[type];
        if (oldCount <=0){ return;}
        const updatedCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type]=updatedCount;
        //Price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice= this.state.totalPrice;
        const newPrice= oldPrice - priceAddition;
        //Update State
        this.setState({ingredients:updateIngredients, totalPrice:newPrice});
    }
    
    render() {
        //less button disable logic
        const disableInfo ={
            ...this.state.ingredients
        }
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0
        }

        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls ingredientAdd ={this.addIngredientHandler}
                ingredientRemove ={this.removeIngredientHandler}
                disableInfo ={disableInfo}
                currentPrice ={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;