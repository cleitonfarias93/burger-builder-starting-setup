import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelled = () => {
        this.props.history.goBack(); /*Para voltar a pagina*/
    }

    checkoutContinue = () => {
        this.props.history.replace('checkout/contact-data') /*para continuar na proxima pagina sem ter
        a opção de voltar */
    }

    // componentWillMount() {
    //     /*pega os valores depois do ? na barra de endereço */
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {}
    //     let price = 0;

    //     /*O param retorna um array de dois elementos, o primeiro elemento desse array é a chave do obj,
    //     o segundo é o valor */
    //     for(let param of query.entries()) {
    //         if(param[0] === 'price') {
    //             price = param[1]
    //         } else {
    //             /*add a chave no obj */
    //            ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, price: price})
    // }


    render() {
        let summary = <Redirect to="/"/>

        if (this.props.ings) {
            const purchasedRedirect = this.props.purchase ? <Redirect to="/"/> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinue={this.checkoutContinue}/>
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        /* Metodo para passar state e props via rotas para outro componente */
                        /*render={(props) => (<ContactData ingredients={this.props.ings}
                        price={this.props.price}
                        {...props}/>)}*/
                        component={ContactData}/>
                </div>            
            )
        }

        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchase: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);