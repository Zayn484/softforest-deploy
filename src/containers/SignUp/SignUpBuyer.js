import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { checkValidity } from '../../shared/utility';
class SignUpBuyer extends Component {
    state = {
        controls: {
            fullName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your full name '
                },
                label: 'Full Name:',
                hint: 'Must contains letters',
                value: '',
                validation: {
                    required: true,
                    isUsername: true
                },
                valid: false,
                touched: false
            },
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
            }
        },
        controls1: {
            cardnumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: '123 456 789 101',
                    min: '0'
                },
                label: 'Card Number:',
                value: '',
                hint: 'Must contains 16 digits of card number',
                validation: {
                    required: true,
                    isUsername: true
                },
                valid: false,
                touched: false
            },
            holderName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Holder name '
                },
                label: 'Card Holder:',
                hint: 'Must contains card holder name',
                value: '',
                validation: {
                    required: true,
                    isUsername: true
                },
                valid: false,
                touched: false
            },
            expireDate: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: '',
                },
                label: 'Expire Date:',
                hint: 'Must contains expires date',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            code: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: '123',
                    min: '0'
                },
                label: 'Code:',
                hint: 'Must contains 3 digits CVV Number',
                value: '',
                validation: {
                    required: true,
                    isUsername: true
                },
                valid: false,
                touched: false
            },

        }
    };
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
    submitHandler = event => {
        event.preventDefault();
        const data = {
            email: this.props.location.state.email,
            username: this.props.location.state.username,
            password: this.props.location.state.password,
            occupation: this.props.location.state.userType,
            billing: {
                full_name: this.state.controls.fullName.value,
                address: this.state.controls.address.value,
                city: this.state.controls.city.value,
                country: this.state.controls.country.value,
                card_number: this.state.controls1.cardnumber.value,
                card_holder_name: this.state.controls1.holderName.value,
                expiry_date: this.state.controls1.expireDate.value,
                code: this.state.controls1.code.value,
            }
        }
        console.log(data)
        axios.post('http://127.0.0.1:8000/api/register/', data)
            .then(response => {
                console.log(response.data);
                if (response.status === 201) {
                    this.props.history.replace('/login');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    render() {
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
        const fomElementArray1 = [];
        for (let key in this.state.controls1) {
            fomElementArray1.push({
                id: key,
                config: this.state.controls1[key]
            });
        }
        console.log(fomElementArray1);
        let form1 = fomElementArray1.map(formElemet => (
            <Input elementType={formElemet.config.elementType}
                elementConfig={formElemet.config.elementConfig}
                value={formElemet.config.value}
                key={formElemet.id}
                invalid={!formElemet.config.valid}
                shouldValidate={formElemet.config.validation}
                touched={formElemet.config.touched}
                changed={(event) => this.inputChangedHandler1(event, formElemet.id)}
                hint={formElemet.config.hint}
                label={formElemet.config.label} />
        ));
        return (
            <div className=" container mb-5">
                <div className="row">
                    <div className=" col-md-2 col-lg-2 "> </div>
                    <div className=" col-md-8 col-lg-8 ">
                        {/* {alert} */}
                        <div className="form__Login ">
                            <h2 className=" font-weight-bold  text-center text-uppercase ">Payment</h2>
                            <h5 className="text-center">Choose Payment Method below</h5>
                            <div className="row pb-5">
                                <div className="col-6 text-center">
                                    <i className="fas mx-auto display-2 fa-money-bill"></i>
                                </div>
                                <div className="col-6 text-center">
                                    <i className="fab mx-auto display-2 fa-cc-paypal"></i>
                                </div>
                            </div>
                            <form onSubmit={this.submitHandler}>
                                <div className="row">
                                    <div className="col-6">
                                        <h2>Billing Info</h2>
                                        {form}
                                    </div>
                                    <div className="col-6">
                                        <h2>Credit Card Info</h2>
                                        {form1}
                                    </div>
                                    <div id="popup1" className={(this.props.loading ? 'overlay-show' : 'overlay-hide') + ' overlay'}>
                                        <div className="popup">
                                            <div className="content">
                                                {/* <Spinner /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center "><Button btnType="Btn-primary Btn-lg " ><span className="spinner-border "></span> Submit</Button></div>
                            </form>
                        </div>
                  
                    </div>
                    <div className=" col-md-2 col-lg-2"></div>
                </div>
            </div>
        );
    }
}
export default SignUpBuyer;