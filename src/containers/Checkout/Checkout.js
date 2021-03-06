import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  checkoutCancelled = () => {
    this.props.history.goBack(); /*Para voltar a pagina*/
  };

  checkoutContinue = () => {
    this.props.history.replace("checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchase ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelled}
            checkoutContinue={this.checkoutContinue}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            /* Metodo para passar state e props via rotas para outro componente */
            /*render={(props) => (<ContactData ingredients={this.props.ings}
                        price={this.props.price}
                        {...props}/>)}*/
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchase: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
