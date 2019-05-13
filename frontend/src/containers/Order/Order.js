import React, { Component } from "react";
import axios from 'axios';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import CustomButton from '../../components/UI/Button/Button';
import { checkValidity } from '../../shared/utility';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import * as actions from '../../store/actions/index';
import MyStoreCheckout from '../StripePayment/Stripe';

class Order extends Component {
    state = {
        controls: {
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter address '
                },
                label: 'Address:',
                hint: 'Must contains address',
                value: '',
                validation: {
                    required: true,
                    isUsername: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'pakistan', displayValue: 'Pakistan' },
                        { value: 'saudia arab', displayValue: 'Saudia Arab' }

                    ],
                    placeholder: 'Country:'
                },
                label: 'Country:',
                value: 'pakistan',
                validation: {},
                valid: true
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                label: 'Email:',
                value: '',
                hint: 'Email Must contains @ and valid Domain',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
        },

        controls1: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your first name '
                },
                label: 'First Name:',
                hint: 'Must contains letters',
                value: '',
                validation: {
                    required: true,
                    isUsername: true
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your last name '
                },
                label: 'Last Name:',
                hint: 'Must contains letters',
                value: '',
                validation: {
                    required: true,
                    isUsername: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter city',
                },
                label: 'City:',
                hint: 'Must contains City Name',
                value: '',
                validation: {
                    required: true,
                    isUsername: true
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter state',
                },
                label: 'State:',
                hint: 'Must contains state Name',
                value: '',
                validation: {
                    required: true,
                    isUsername: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: '123',
                },
                label: 'ZipCode:',
                hint: 'Must contains ZipCode',
                value: '',
                validation: {
                    required: true,
                    isUsername: true
                },
                valid: false,
                touched: false
            }
        },
        loading: false,
        error: null,
        billingData: null,
        card: null,
        editable: false,
        cardChange: false,
        purchasing: false,
        links: []

    };
    componentWillMount() {
        // this.props.onBillingProfile(this.props.userId);
        axios.get(`http://127.0.0.1:8000/api/billing/${this.props.userId}/`)
            .then(res => {
                this.setState({ billingData: res.data });
                axios.get(`http://127.0.0.1:8000/api/payment/${this.state.billingData.id}`)
                    .then(res => {
                        this.setState({ card: res.data });
                        console.log(res.data);
                    })
                    .catch(err => {
                        this.setState({ error: err.response });
                    })
            })
            .catch(err => {
                this.setState({ error: err.response });
            })



    }
    inputChangedHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updateControls });
    }
    inputChangedHandler1 = (event, controlName) => {
        const updateControls = {
            ...this.state.controls1,
            [controlName]: {
                ...this.state.controls1[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls1[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls1: updateControls });
    }
    onBillingSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        if (this.state.editable) {
            const name = this.state.controls1.firstName.value + " " + this.state.controls1.lastName.value;
            const data = {
                full_name: name,
                address: this.state.controls.address.value,
                city: this.state.controls1.city.value,
                country: this.state.controls.country.value,
                zipcode: this.state.controls1.zipCode.value,
                user: this.props.userId,
                email: this.state.controls.email.value

            }
            axios.put(`http://127.0.0.1:8000/api/billing/${this.props.userId}/`, data)
                .then(res => {
                    this.setState({ loading: false, editable: false });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ error: err.data });
                })
        }
        else {
            const name = this.state.controls1.firstName.value + " " + this.state.controls1.lastName.value;
            const data = {
                full_name: name,
                address: this.state.controls.address.value,
                city: this.state.controls1.city.value,
                country: this.state.controls.country.value,
                zipcode: this.state.controls1.zipCode.value,
                user: this.props.userId,
                email: this.state.controls.email.value

            }
            axios.post('http://127.0.0.1:8000/api/billing/', data)
                .then(res => {
                    this.setState({ loading: false, editable: false, billingData: res.data });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ error: err.data });
                });
        }
    }
    onUpdateBilling = (object) => {
        if (object == 'billing') {
            const data = {
                ...this.state.billingData
            }
            this.setState({
                editable: true, firstName: data.full_name, lastName: data.full_name,
                country: data.country, city: data.city, zipCode: data.zipcode
            });
        }
        if (object == 'card') {
            this.setState({ cardChange: true });
        }

    }

    callback = (key) => {
        console.log(key);
    }

    success = (projects) => {
        Modal.success({
            title: 'Payment Verified',
            content: (
                <div>
                    <p>Congratulations your payment has been verified</p>
                    <p>Click OK to go into your library</p>
                    <ul>
                        {projects.map(el => (
                            <li key={el.id}>{el.title}</li>
                        ))}
                    </ul>
                </div>
            ),
            onOk: () => {
                this.props.onCheckToCart(this.props.userId, 0);
                this.props.history.replace('/library');
            }
        });
    }

    error() {
        Modal.error({
            title: 'Verification failed',
            content: 'We could not make this purchase, try again later!',

            onOk: () => {
                this.setState({ purchasing: false })
            }
        });
    }

    orderhandler = () => {
        this.setState({ purchasing: true });

        let data = {
            user: this.state.billingData.user,
            singleProject: 0,
            billingAddress: this.state.billingData.id,
            orderTotal: this.props.location.state.totalPrice
        }
        if (this.props.location.state.cart_id == 0) {
            data = {
                user: this.state.billingData.user,
                singleProject: this.props.location.state.cart[0].id,
                billingAddress: this.state.billingData.id,
                orderTotal: this.props.location.state.totalPrice
            }
        }
        axios.post('http://127.0.0.1:8000/api/order/', data)
            .then(res => {

                if (res.data.status === "success") {
                    const projects = res.data.project;
                    this.success(projects);
                }
                else {
                    this.error();
                }
            })
            .catch(err => console.log(err));
    }


    render() {
        const TabPane = Tabs.TabPane;
        const fomElementArray = [];
        for (let key in this.state.controls) {
            fomElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = fomElementArray.map(formElemet => (
            <Input elementType={formElemet.config.elementType}
                elementConfig={formElemet.config.elementConfig}
                value={formElemet.config.value}
                key={formElemet.id}
                invalid={!formElemet.config.valid}
                shouldValidate={formElemet.config.validation}
                touched={formElemet.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElemet.id)}
                hint={formElemet.config.hint}
                label={formElemet.config.label} />
        ));
        const list = this.props.location.state.cart.map(obj => {
            return (
                <tr key={obj.id}>
                    <td>{obj.title}</td>
                    <td>${obj.price}</td>
                </tr>
            )
        });
        let formData = (<div className="form__Login">
            <h2 className=" font-weight-bold  ">Billing Details</h2>
            <h5>We do not sell your details or share them without your permission. Read more in our privacy policy</h5>
            <hr />
            <form onSubmit={(event) => this.onBillingSubmit(event)}>
                <div className="row Custom_margin">
                    <div className="col">
                        <Input elementType={this.state.controls1.firstName.elementType}
                            elementConfig={this.state.controls1.firstName.elementConfig}
                            value={this.state.controls1.firstName.value}
                            key={this.state.controls1.firstName.label}
                            invalid={!this.state.controls1.firstName.valid}
                            shouldValidate={this.state.controls1.firstName.validation}
                            touched={this.state.controls1.firstName.touched}
                            changed={(event) => this.inputChangedHandler1(event, 'firstName')}
                            hint={this.state.controls1.firstName.hint}
                            label={this.state.controls1.firstName.label} />
                    </div>
                    <div className="col">
                        <Input elementType={this.state.controls1.lastName.elementType}
                            elementConfig={this.state.controls1.lastName.elementConfig}
                            value={this.state.controls1.lastName.value}
                            key={this.state.controls1.lastName.label}
                            invalid={!this.state.controls1.lastName.valid}
                            shouldValidate={this.state.controls1.lastName.validation}
                            touched={this.state.controls1.lastName.touched}
                            changed={(event) => this.inputChangedHandler1(event, 'lastName')}
                            hint={this.state.controls1.lastName.hint}
                            label={this.state.controls1.lastName.label} />
                    </div>
                </div>
                {form}
                <div className="row Custom_margin">
                    <div className="col">
                        <Input elementType={this.state.controls1.city.elementType}
                            elementConfig={this.state.controls1.city.elementConfig}
                            value={this.state.controls1.city.value}
                            key={this.state.controls1.city.label}
                            invalid={!this.state.controls1.city.valid}
                            shouldValidate={this.state.controls1.city.validation}
                            touched={this.state.controls1.city.touched}
                            changed={(event) => this.inputChangedHandler1(event, 'city')}
                            hint={this.state.controls1.city.hint}
                            label={this.state.controls1.city.label} />
                    </div>
                    <div className="col">
                        <Input elementType={this.state.controls1.state.elementType}
                            elementConfig={this.state.controls1.state.elementConfig}
                            value={this.state.controls1.state.value}
                            key={this.state.controls1.state.label}
                            invalid={!this.state.controls1.state.valid}
                            shouldValidate={this.state.controls1.state.validation}
                            touched={this.state.controls1.state.touched}
                            changed={(event) => this.inputChangedHandler1(event, 'state')}
                            hint={this.state.controls1.state.hint}
                            label={this.state.controls1.state.label} />
                    </div>
                    <div className="col">
                        <Input elementType={this.state.controls1.zipCode.elementType}
                            elementConfig={this.state.controls1.zipCode.elementConfig}
                            value={this.state.controls1.zipCode.value}
                            key={this.state.controls1.zipCode.label}
                            invalid={!this.state.controls1.zipCode.valid}
                            shouldValidate={this.state.controls1.zipCode.validation}
                            touched={this.state.controls1.zipCode.touched}
                            changed={(event) => this.inputChangedHandler1(event, 'zipCode')}
                            hint={this.state.controls1.zipCode.hint}
                            label={this.state.controls1.zipCode.label} />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-8">

                    </div>
                    <div className="col-md-4">
                        <CustomButton btnType="Btn-primary Btn-lg ml-4" disabled={this.state.loading ? true : false} >
                            {this.state.loading ? 'Saving...' : 'Save and Continue'}
                        </CustomButton>
                    </div>
                </div>
            </form></div>);
        let paymentTabs = null;
        if (this.state.billingData && !this.state.editable) {
            formData = (
                <div className='border p-4 bg-light' >
                    <div className='clearfix'>
                        <h2 className=" font-weight-bold  float-left">Billing Details</h2>
                        <CustomButton btnType="btn float-right btn-outline-secondary btn-lg" clicked={() => this.onUpdateBilling('billing')}>edit</CustomButton>
                    </div>

                    <div className="">
                        <h4>{this.state.billingData.full_name.toUpperCase()}</h4>
                        <h4>{this.state.billingData.country.toUpperCase()}</h4>
                    </div>
                </div>
            );
            let card = <MyStoreCheckout billingId={this.state.billingData.id} />;
            if (this.state.card && !this.state.cardChange) {
                card = (
                    <div className='border p-4 bg-light' >
                        <div className='clearfix'>
                            <h2 className=" font-weight-bold  float-left">Card Details</h2>
                            <CustomButton btnType="btn float-right btn-outline-secondary btn-lg" clicked={() => this.onUpdateBilling('card')}>edit</CustomButton>
                        </div>

                        <div className="">
                            <h4>{this.state.card.brand}</h4>
                            <h4>{this.state.card.country}</h4>
                            <h4>************{this.state.card.last4}</h4>
                        </div>
                    </div>
                );
            }

            paymentTabs = (
                <Tabs onChange={this.callback} type="card">
                    <TabPane tab="Stripe" key="1">
                        {card}
                    </TabPane>
                    <TabPane tab="To Checkout" key="2">
                    </TabPane>
                    <TabPane tab="Tab 3" key="3"></TabPane>
                </Tabs>

            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        {formData}
                        <br />
                        <div className='border'>
                            <h2 className='pt-3 pl-3'>Select Payment Method</h2>
                            <hr />
                            {paymentTabs}
                            <div className=' form__Login no_shadow'>
                                <div className="clearfix">
                                    <h2 className="float-left  btn-link">Your Order</h2>
                                    <h3 className="float-right"><b>{this.props.location.state.totalPrice}</b></h3>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-8'>

                                    </div>
                                    <div className="col-4 clearfix">
                                        <div className='float-left'>
                                            <h3>Total:</h3>
                                        </div>
                                        <div className="float-right">
                                            <b>${this.props.location.state.totalPrice}</b>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-8'></div>
                                    <div className='col-4 clearfix'>
                                        <div className="float-right">
                                            {this.state.purchasing ?
                                                <CustomButton
                                                    btnType="Btn-primary btn-lg Btn-disable"
                                                    clicked={this.orderhandler} >Verifying...</CustomButton>
                                                :
                                                <CustomButton
                                                    btnType="Btn-primary btn-lg "
                                                    clicked={this.orderhandler} >Make Payment</CustomButton>
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="table-responsive-md border">
                            <table className="table table-light">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="row">Order Summary</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th><b>Total</b></th>
                                        <th><b>${this.props.location.state.totalPrice}</b></th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        userId: state.authReducer.userId,
        token: state.authReducer.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onCheckToCart: (userId, softwareId) => dispatch(actions.checkToCart(userId, softwareId))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
