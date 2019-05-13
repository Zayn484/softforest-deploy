// CheckoutForm.js
import React from 'react';
import { Icon } from 'antd';
import { injectStripe } from 'react-stripe-elements';
import Button from '../../components/UI/Button/Button';
//import AddressSection from './AddressSection';
import CardSection from './CardSection';
import axios from 'axios';

class CheckoutForm extends React.Component {

  state = {
    adding: false,
    added: false,
    disabled: false
  }

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    this.setState({ adding: true });

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({ name: 'Jenny Rosen' }).then(({ token }) => {
      console.log('Received Stripe token:', token);
      console.log('user id ' + this.props.billingId);
      const data = {
        billing_profile: this.props.billingId,
        stripe_id: token.id,

      }
      axios.post('http://127.0.0.1:8000/api/payment/', data)
        .then(res => {
          console.log(res.data);
          this.setState({ adding: false, added: true, disabled: true });
        })
        .catch(error => {
          console.log(error.response);
        })

    });


  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <AddressSection /> */}
        <div className='row pl-5 '>
          <div className='col-md-8'><CardSection /></div>
          <div className='col-md-4 pt-1'>
            {this.state.adding ?
              <Button btnType="Btn-primary btn-lg Btn-disable" >Adding...</Button>
              :
              <Button
                btnType={this.state.added ? "Btn-primary btn-lg Btn-disable" : "Btn-primary btn-lg"}
                disabled={this.state.disabled} >
                {this.state.added ?
                  <>
                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                    <span className='text-success'> Done</span>
                  </> : 'Add'} </Button>
            }
          </div>
        </div>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);