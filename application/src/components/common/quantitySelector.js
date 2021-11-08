import React, { Component } from 'react';

class QuantitySelector extends Component {
    
    render() {
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <label style={{ fontFamily: "Optima", fontSize: "1.5em", marginRight: "1%" }}>Qty:</label>
                <select value={this.props.quantity} onChange={(event) => this.props.menuQuantityChosen(event)}>
                    { this.props.quantityValueLimiter.map((value, index) => <option key={ index } value={ index + 1 }>{ index + 1 }</option>) }
                </select>
            </div>
        );
    }
}

export default QuantitySelector;