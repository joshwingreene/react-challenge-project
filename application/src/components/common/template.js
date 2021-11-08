import React from 'react';
import { connect } from 'react-redux';
import { Nav } from '../../components';
import { logoutUser } from '../../redux/actions/authActions';
import './template.css';

const mapActionsToProps = dispatch => ({
    commenceLogout() {
      dispatch(logoutUser());
    }
})

const Template = props => {
    return (
        <div className="bg-layer">
            <div className="fg-layer">
                <label className="logo">Bruce's Diner</label>
                <Nav commenceLogout={props.commenceLogout} />
                {props.children}
            </div>
        </div>
    );
}

export default connect(null, mapActionsToProps)(Template);