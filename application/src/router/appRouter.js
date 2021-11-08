import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders } from '../components';
import { connect } from 'react-redux';
import GuardedRoute from './GuardedRoute';


const mapStateToProps = (state) => ({
  auth: state.auth,
})

const AppRouter = (props) => {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <GuardedRoute path="/order" exact component={OrderForm} auth={props.auth} />
      <GuardedRoute path="/view-orders" exact component={ViewOrders} auth={props.auth} />
    </Router>
  );
}

export default connect(mapStateToProps, null)(AppRouter);
