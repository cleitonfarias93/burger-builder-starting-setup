import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSucess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post(`/orders.json?auth=${token}`, orderData)
        .then(response => {
            dispatch(purchaseBurgerSucess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}

export const pursacheInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }

}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get(`/orders.json?auth=${token}`)
        .then(response => {
            const fetchedOrders = [];
            /*Recebe um obj com outros obj dentro */
            for(let key in response.data) {
                fetchedOrders.push({...response.data[key], id: key});
                /*cada obj do response.data é add em uma posição do array, no obj passa o 
                operador spread para espalhar no os elementos de cada obj*/
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error))
        })
    }
}