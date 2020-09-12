import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 5.00,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map( igkey => {
            return ingredients[igkey];
        }).reduce((sum, el) => {
            return sum + el;
        },0);
        
        this.setState({purchasable: sum >0});
        return; 
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
        this.updatePurchaseState(updateIngredients);
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
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    modalClosedHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        alert("You Continue!");
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
                <Modal show={this.state.purchasing} modalClosed={this.modalClosedHandler}>
                    <OrderSummary ingredients = {this.state.ingredients} 
                    modalClosed={this.modalClosedHandler} continue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls ingredientAdd ={this.addIngredientHandler}
                ingredientRemove ={this.removeIngredientHandler}
                disableInfo ={disableInfo}
                currentPrice ={this.state.totalPrice}
                purchasable ={this.state.purchasable}
                ordered = {this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;