import React, { Component } from 'react';
import { Template } from '../../components';
import { connect } from 'react-redux';
import { SERVER_IP } from '../../private';
import MenuItemSelector from '../common/menuItemSelector';
import './orderForm.css';
import QuantitySelector from '../common/quantitySelector';
import { MENU_ITEMS, QUANTITY_VALUE_LIMITER } from '../../constants';

const ADD_ORDER_URL = `${SERVER_IP}/api/add-order`

const mapStateToProps = (state) => ({
    auth: state.auth,
})

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_item: "",
            quantity: "1"
        }
    }

    menuItemChosen = (event) => {
        this.setState({ item: event.target.value });
    }

    menuQuantityChosen = (event) => {
        this.setState({ quantity: event.target.value });
    }

    submitOrder(event) {
        event.preventDefault();
        if (this.state.order_item === "") return;
        fetch(ADD_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                order_item: this.state.order_item,
                quantity: this.state.quantity,
                ordered_by: this.props.auth.email || 'Unknown!',
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log("Success", JSON.stringify(response)))
        .catch(error => console.error(error));
    }

    render() {
        return (
            <Template>
                <div className="form-wrapper">
                    <form>
                        <label className="form-label">I'd like to order...</label><br />
                        <MenuItemSelector defaultValue="Lunch menu" menuOptions={ MENU_ITEMS } order_item={ this.state.order_item } menuItemChosen={ this.menuItemChosen } />
                        <br />
                        <QuantitySelector quantityValueLimiter={QUANTITY_VALUE_LIMITER} menuQuantityChosen= { this.menuQuantityChosen } />
                        <button type="button" className="order-btn" onClick={(event) => this.submitOrder(event)}>Order It!</button>
                    </form>
                </div>
            </Template>
        );
    }
}

export default connect(mapStateToProps, null)(OrderForm);