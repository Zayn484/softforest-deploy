import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import 'antd/dist/antd.css';
import * as actions from './store/actions/index';
import Home from './containers/Home/Home';
import Shop from './containers/Shop/Shop';
import Layout from './hoc/Layout/Layout';
import Profile from './containers/Profile/Profile';
import Buying from './containers/Buying/Buying';
import Logout from './containers/Logout/Logout';
import ProfileView from './components/ProfileView/ProfileView';
import SignUpSeller from './containers/SignUp/SignUpSeller';
import SignUpBuyer from './containers/SignUp/SignUpBuyer';
import RequestForm from './containers/RequestForm/RequestForm';

// Loading components lazily 

const asyncGetRecommendations = asyncComponent(() => {
  return import('./components/GetRecommendations/QuerySession/QuerySession');
})

const asyncSignup = asyncComponent(() => {
  return import('./containers/SignUp/SignUp');
})

const asyncLogin = asyncComponent(() => {
  return import('./containers/Login/Login');
})

const asyncAppDetailView = asyncComponent(() => {
  return import('./containers/AppDetailView/AppDetailView');
})

const asyncCart = asyncComponent(() => {
  return import('./containers/AddToCart/AddToCart');
})

const asyncOrder = asyncComponent(() => {
  return import('./containers/Order/Order');
})

const asyncChat = asyncComponent(() => {
  return import('./containers/Chat/Chat');
})

const asyncPostProject = asyncComponent(() => {
  return import('./containers/PostProject/PostProject');
})

const asyncDashboard = asyncComponent(() => {
  return import('./containers/Dashboard/Dashboard');
})

const asyncLibrary = asyncComponent(() => {
  return import('./containers/Library/Library');
})

const asyncRequests = asyncComponent(() => {
  return import('./containers/Requests/Requests');
})

class App extends Component {
  state = {
    stripe: null
  };

  componentWillMount() {
    this.props.onCheckAuthState();

    if (window.Stripe) {
      this.setState({ stripe: window.Stripe('pk_test_YXxx1T8deII1T8khvrDi5Rbm00bcuvihrb') });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({ stripe: window.Stripe('pk_test_YXxx1T8deII1T8khvrDi5Rbm00bcuvihrb') });
      });
    }
  }

  render() {
    const item = localStorage.getItem('userId');
    if (this.props.userId) {
      this.props.onCheckToCart(this.props.userId, 0);
    }
    let routes = null;
    if (this.props.isAuth && this.props.userId && this.props.occupation === 'seller') {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/shop/:id" component={asyncAppDetailView} />
          <Route path="/profile/:id" component={ProfileView} />
          <Route path="/get-recommendations" component={asyncGetRecommendations} />
          <Route path="/dashboard" component={asyncDashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/post-project" component={asyncPostProject} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup-profile" component={SignUpSeller} />
          <Route path="/signup-payment" component={SignUpBuyer} />
          <Route path="/messages" exact component={asyncChat} />
          <Route path="/messages/:id" component={asyncChat} />
          <Route path="/requests" component={asyncRequests} />
          <Redirect to="/" />
        </Switch>
      );
    }
    else if (this.props.isAuth && this.props.userId && this.props.occupation === 'buyer') {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/shop/:id" component={asyncAppDetailView} />
          <Route path="/profile/:id" component={ProfileView} />
          <Route path="/get-recommendations" component={asyncGetRecommendations} />
          <Route path="/cart" component={asyncCart} />
          <Route path="/request-form" component={RequestForm} />
          <Route path="/messages" exact component={asyncChat} />
          <Route path="/messages/:id" component={asyncChat} />
          <Route path="/library" component={asyncLibrary} />
          <Route path="/logout" component={Logout} />
          <Route path="/order" component={asyncOrder} />
          <Route path="/requests" component={asyncRequests} />
          <Redirect to="/" />
        </Switch>
      );
    }
    else if (item == null) {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={asyncSignup} />
          <Route path="/login" component={asyncLogin} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/shop/:id" component={asyncAppDetailView} />
          <Route path="/profile/:id" component={ProfileView} />
          <Route path="/get-recommendations" component={asyncGetRecommendations} />
          <Route path="/buying" component={Buying} />
          <Route path="/cart" component={asyncCart} />
          <Route path="/signup-profile" component={SignUpSeller} />
          <Route path="/signup-payment" component={SignUpBuyer} />
          <Route path="/request-form" component={RequestForm} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <>
        <Layout>
          {routes}
        </Layout>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.token !== null,
    userId: state.authReducer.userId,
    occupation: state.authReducer.occupation,

  };
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.authCheckState()),
    onCheckToCart: (userId, softwareId) => dispatch(actions.checkToCart(userId, softwareId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
