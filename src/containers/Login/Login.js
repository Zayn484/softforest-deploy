import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Login extends Component {
    state = {
        controls: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                label: 'Password:',
                value: '',
                hint: 'Password must contains atleast 8 character ',
                validation: {
                    required: true,
                    isPassword: true
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true,
    };
    componentDidUpdate(prevProps) {
        const { userId } = this.props;
        if (userId !== prevProps.userId) {
        }

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

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthLogin(this.state.controls.email.value, this.state.controls.password.value);
        
    }

    render() {
        // let redirect = null;
        if (this.props.token && this.props.userId) {
            console.log('Zainnnnnnnnnnnnnnnn');
            //console.log(this.props);
            // const { from } = this.props.location.state || { from: { pathname: '/' } };
            // this.props.history.push(from);
            // redirect = <Redirect to={from} />
            this.props.history.push(this.props.authRedirectPath);
        }
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
        return (

            <div className=" container mb-5">
                {/* {redirect} */}
                <div className="row">
                    <div className="col-md-2 col-lg-4">
                    </div>
                    <div className="col-md-8 col-lg-4 ">
                        <div className="form__Login ">
                            <h3 className="font-weight-bold text-center text-uppercase ">Login</h3>
                            {
                                this.props.error ? <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Error!</strong> {this.props.error.non_field_errors}
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div> : null
                            }
                            <form onSubmit={this.submitHandler} >
                                {form}
                                <div className="text-center">
                                    {
                                        this.props.loading ? <Spinner />
                                            : <Button btnType="Btn-primary Btn-lg " >Login</Button>
                                    }
                                </div>
                            </form>
                            <div className="form__Button pt-4 text-center ">
                                <p className="form__paragraph" >New to SoftForest?</p>
                                <Link className="form__Buttton--SignUp text-info" to="/signUp">&nbsp;Sign up</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-lg-4"></div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.authReducer.token !== null,
        error: state.authReducer.error,
        loading: state.authReducer.loading,
        authRedirectPath:state.authReducer.authRedirectPath
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onAuthLogin: (email, password) => dispatch(actions.authLogin(email, password))
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));