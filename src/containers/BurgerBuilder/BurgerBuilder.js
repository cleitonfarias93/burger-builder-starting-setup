import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxi/Auxi";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/";

export class BurgerBuilder extends Component {
  state = {
    purchansing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  setPurchasable(ingredients) {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, elem) => {
        return sum + elem;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchansing: true });
    } else {
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchansing: false });
  };

  purchaseContinueHandler = () => {
    // const queryParams = []
    // /* esse FOR percorre todas as chaves do OBJ*/
    // for(let i in this.state.ingredients){
    //     /*push add novo elemento no array e o encodeURIComponente transforma o dados em string */
    //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push('price=' + this.props.price)
    // //converte o array em uma string colocando "&" entre os elementos do array
    // const queryString = queryParams.join('&')
    // this.props.history.push({
    //     pathname: '/checkout',
    //     search: '?' + queryString
    // })

    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      /*Tecnica para copiar um obj*/ ...this.props.ings,
    };

    for (let key in disabledInfo) {
      /*Key é a chave do obj(salad, bacon...) de disabledInfo */
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingridients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            totalPrice={this.props.price.toFixed(2)}
            purchasable={this.setPurchasable(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredient={this.props.ings}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchansing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.pursacheInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
