import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import MenuItemSelector from '../common/menuItemSelector';
import { MENU_ITEMS, QUANTITY_VALUE_LIMITER } from '../../constants';
import './viewOrders.css';
import QuantitySelector from '../common/quantitySelector';

const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;
const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`;

class ViewOrders extends Component {
    state = {
        orders: [],
        isLoading: true,
        is_editing_order: false,
        order_being_edited: null,
    }

    fetchCurrentOrders() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders, isLoading: false });
                } else {
                    console.log('Error getting orders');
                }
        });
    }

    componentDidMount() {
        this.fetchCurrentOrders();
    }

    componentDidUpdate() {
        if (this.state.isLoading) {
            this.fetchCurrentOrders();
        }
    }

    updateOrder() {
        fetch(EDIT_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: this.state.order_being_edited._id,
                ordered_by: this.state.order_being_edited.ordered_by, 
                quantity: this.state.order_being_edited.quantity, 
                order_item: this.state.order_being_edited.order_item 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => { 
            console.log("Success", JSON.stringify(response));
            this.setState({ isLoading: true, is_editing_order: false, order_being_edited: null });
        })
        .catch(error => console.error(error));
    }

    deleteOrder(order_id) {
        fetch(DELETE_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: order_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => { 
            console.log("Success", JSON.stringify(response));
            this.setState({ isLoading: true });
        })
        .catch(error => console.error(error));
    }

    handleEditModeMenuItemChange = (event) => {
        this.setState({ order_being_edited: { ...this.state.order_being_edited, order_item: event.target.value }});
    }

    handleEditModeMenuQuantityChange = (event) => {
        this.setState({ order_being_edited: { ...this.state.order_being_edited, quantity: event.target.value }});
    }

    toggleEditing(order) {
        this.setState({ is_editing_order: !this.state.is_editing_order, order_being_edited: order });
    }

    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                     { this.state.is_editing_order && this.state.order_being_edited._id === order._id ?
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                            <h4>Edit Order</h4>
                                            <MenuItemSelector defaultValue="Lunch menu" menuOptions={ MENU_ITEMS } order_item={ this.state.order_being_edited.order_item } menuItemChosen={ this.handleEditModeMenuItemChange } />
                                            <QuantitySelector quantity={ this.state.order_being_edited.quantity } quantityValueLimiter={QUANTITY_VALUE_LIMITER} menuQuantityChosen= { this.handleEditModeMenuQuantityChange } />
                                            <div style={{ marginTop: 5 }}>
                                                <button onClick={() => this.updateOrder()}>Update</button>
                                                <button onClick={() => this.toggleEditing(order)}>Cancel</button>
                                            </div>
                                        </div> :
                                        <>
                                            <button className="btn btn-success" onClick={() => this.toggleEditing(order)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => this.deleteOrder(order._id)}>Delete</button>
                                        </>
                                    }
                                 </div>
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default ViewOrders;
