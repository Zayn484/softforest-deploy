import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {

    render() {
        if(this.props.userId){
            this.props.onCheckToCart(this.props.userId,0);
          }
        return (
            <>
                <Toolbar
                    isAuth={this.props.isAuth}
                    occupation={this.props.occupation}
                    cartCount={this.props.cartCount} />

                <main className='Content'>
                    {this.props.children}
                </main>

                {this.props.location.pathname === '/messages' ? null : <Footer />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.token !== null,
        occupation: state.authReducer.occupation,
        cartCount:state.cartReducer.check.projects.length
    }
}

export default withRouter(connect(mapStateToProps, null)(Layout));