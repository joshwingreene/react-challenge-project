import React, { Component } from 'react';

class MenuItemSelector extends Component {
    
    render() {
        return (
            <select 
                value={this.props.order_item} 
                onChange={(event) => this.props.menuItemChosen(event)}
                style={{ marginBottom: "2%", width: "50%" }}
            >
                <option value="" defaultValue disabled hidden>{ this.props.defaultValue }</option>
                { this.props.menuOptions.map((item, index) => <option key={ index } value={ item }>{ item }</option>) }
            </select>
        );
    }
}

export default MenuItemSelector;