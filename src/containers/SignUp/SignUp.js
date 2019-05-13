import React, { Component } from "react";
import { Link } from "react-router-dom";
import { checkValidity } from "../../shared/utility";
import { connect } from "react-redux";
import axios from "../../axios";
import * as actions from "../../store/actions/index";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

class SignUp extends Component {
  state = {
    controls: {
      username: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your username "
        },
        label: "Username:",
        hint: "Username must ends Number ",
        value: "",
        validation: {
          required: true,
          isUsername: true
        },
        valid: false,
        touched: false,
        error: null
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "@example.com "
        },
        label: "Email:",
        hint: "Email must contains @ sign and Valid Domain Name",
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        error: null
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter password:"
        },
        label: "Password:",
        hint: "Password must contains atleast 8 character Use Char,Number,etc",
        value: "",
        validation: {
          required: true,
          isPassword: true
        },
        valid: false,
        touched: false
      },
      confirmPassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Re-enter password:"
        },
        label: "Confirm Password:",
        hint: "Password must match with previous entry",
        value: "",
        validation: {
          required: true,
          isPassword: true
        },
        valid: false,
        touched: false
      },
      signUpType: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "buyer", displayValue: "Buyer" },
            { value: "seller", displayValue: "Seller" }
          ],
          placeholder: "I Want To Be:"
        },
        label: "I Want To Be:",
        value: "seller",
        validation: {},
        valid: true
      }
    },
    isValidForm: false,
    recommendations: {
      categories: null,
      technologies: null,
      knowledge: null
    },
    isSignUp: true,
    error: null,
    userNameExists: null,
    emailExists: null
  };

  componentDidMount() {
    // Get params of user selected recommendations
    const query = new URLSearchParams(this.props.location.search);
    const recommendations = {};
    for (let param of query.entries()) {
      recommendations[param[0]] = param[1];
    }
    this.setState({ recommendations: recommendations });
  }

  inputChangedHandler = (event, controlName) => {
    const updateControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    let valid = this.state.isValidForm;
    this.setState({ controls: updateControls, isValidForm: !valid });
  };

  verifyUsername = username => {
    setTimeout(() => {
      axios
        .get(`/register/?search=${username}`)
        .then(response => {
          if (response.data.length === 1) {
            let controls = { ...this.state.controls };
            controls.username.error = "This username already exists";
            this.setState({ controls: controls, userNameExists: true });
          } else {
            let controls = { ...this.state.controls };
            controls.username.error = "";
            this.setState({ controls: controls, userNameExists: false });
          }
        })
        .catch(error => {
          this.setState({ error: error });
        });
    }, 100);
  };

  verifyEmail = email => {
    setTimeout(() => {
      axios
        .get(`/register/?search=${email}`)
        .then(response => {
          if (response.data.length === 1) {
            let controls = { ...this.state.controls };
            controls.email.error = "This email already exists";
            this.setState({ controls: controls, emailExists: true });
          } else {
            let controls = { ...this.state.controls };
            controls.email.error = "";
            this.setState({ controls: controls, emailExists: false });
          }
        })
        .catch(error => {
          this.setState({ error: error });
        });
    }, 100);
  };

  submitHandler = async event => {
    event.preventDefault();
    const isEmpty = Object.values(this.state.recommendations).every(
      x => x === null || x === ""
    );
    this.verifyUsername(this.state.controls.username.value);
    this.verifyEmail(this.state.controls.email.value);

    if (this.state.userNameExists || this.state.emailExists) {
      return;
    }

    if (
      this.state.userNameExists === false &&
      this.state.emailExists === false
    ) {
      if (!isEmpty) {
        this.props.onAuth(
          this.state.controls.email.value,
          this.state.controls.username.value,
          this.state.controls.password.value,
          this.state.controls.signUpType.value,
          this.state.recommendations
        );

        return;
      }
      const data = {
        username: this.state.controls.username.value,
        email: this.state.controls.email.value,
        password: this.state.controls.confirmPassword.value,
        userType: this.state.controls.signUpType.value
      };
      if (this.state.controls.signUpType.value === "seller") {
        this.props.history.push({
          pathname: "/signup-profile",
          search: "",
          state: data
        });
      } else if (this.state.controls.signUpType.value === "buyer") {
        const data = {
          username: this.state.controls.username.value,
          email: this.state.controls.email.value,
          password: this.state.controls.confirmPassword.value,
          occupation: this.state.controls.signUpType.value
        };
        axios
          .post("/register/", data)
          .then(response => {
            if (response.status === 201) {
              this.props.history.replace("/login");
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };

  render() {
    let alert = null;
    if (this.state.error) {
      alert = (
        <div className="alert alert-success alert-dismissible">
          <button type="button" className="close" data-dismiss="alert">
            &times;
          </button>
          <span>{this.state.error}</span>
        </div>
      );
    }
    const fomElementArray = [];
    for (let key in this.state.controls) {
      fomElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = fomElementArray.map(formElemet => (
      <Input
        elementType={formElemet.config.elementType}
        elementConfig={formElemet.config.elementConfig}
        value={formElemet.config.value}
        key={formElemet.id}
        invalid={!formElemet.config.valid}
        shouldValidate={formElemet.config.validation}
        touched={formElemet.config.touched}
        changed={event => this.inputChangedHandler(event, formElemet.id)}
        hint={formElemet.config.hint}
        label={formElemet.config.label}
        error={formElemet.config.error}
      />
    ));

    return (
      <div className=" container mb-5">
        <div className="row">
          <div className=" col-md-2 col-lg-4 "> </div>
          <div className=" col-md-8 col-lg-4 ">
            {alert}
            <div className="form__Login ">
              <h3 className=" font-weight-bold  text-center text-uppercase ">
                Sign Up
              </h3>
              <form onSubmit={this.submitHandler}>
                {form}
                {/* <div className="text-center">
                                    <Button btnType={(this.state.isValidForm ? '' : '') + " Btn-primary Btn-lg"} >
                                        <span className="spinner-border "></span> Next >
                                </Button>
                                </div> */}

                <div className="text-center">
                  <Button
                    btnType={
                      (this.state.controls.confirmPassword.valid
                        ? ""
                        : "disabledSign ") + " Btn-primary Btn-lg"
                    }
                  >
                    <span className="spinner-border " />
                    Next
                  </Button>
                </div>
              </form>
              <div className="form__Button pt-4 text-center ">
                <p>
                  By registering you confirm that you accept the Terms and
                  Conditions and Privacy Policy
                </p>
                <p className="form__paragraph">Already have an Account?</p>
                <Link className="form__Buttton--SignUp text-info" to="/login">
                  &nbsp;Login
                </Link>
              </div>
            </div>
          </div>
          <div className=" col-md-2 col-lg-4" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    signUp: state.authReducer.signUp,
    loading: state.authReducer.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, username, password, occupation, recommendations) =>
      dispatch(
        actions.auth(email, username, password, occupation, recommendations)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
