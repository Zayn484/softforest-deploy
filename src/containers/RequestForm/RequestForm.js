import React, { Component } from "react";
import axios from "../../axios";
import { connect } from "react-redux";
import CustomButton from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { checkValidity } from "../../shared/utility";
import { Modal } from "antd";
import FileUpload from "../../components/UI/FileUpload/FileUpload";

class RequestForm extends Component {
  state = {
    controls: {
      overview: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Enter description",
          maxLength: "1500",
          minLength: "300"
        },
        label: "Overview:",
        hint: "Write minimum 300 words of description",
        value: "",
        validation: {
          required: true,
          isUsername: true
        },
        valid: false,
        touched: false
      },
      days: {
        value: ""
      },
      price: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "$5.0",
          min: 0
        },
        label: "",
        value: "",
        hint: "Minimum $5 Project Budget",
        validation: {
          required: true,
          isUsername: true
        },
        valid: false,
        touched: false
      }
    },
    loading: false,
    error: null
  };

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
    this.setState({ controls: updateControls });
  };

  radioChangeHandler = event => {
    const updatedControls = {
      ...this.state.controls,
      days: {
        value: event.target.value
      }
    };
    this.setState({ controls: updatedControls });
  };

  success = () => {
    Modal.success({
      title: "Request Submitted",
      content: (
        <div>
          <p>
            Your request has been sent and it will be reviewed by developer!
          </p>
        </div>
      ),
      onOk: () => {}
    });
  };

  error = () => {
    Modal.error({
      title: "Request Submission failed",
      content: "We could not make this request, try again later!",

      onOk: () => {}
    });
  };

  submithandler = event => {
    event.preventDefault();

    const type = "project";
    const user = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const slug = this.props.location.state.slug;
    const developer_id = this.props.location.state.developerId;

    const data = {
      content: this.state.controls.overview.value,
      days: this.state.controls.days.value,
      budget: this.state.controls.price.value
    };

    axios
      .post("/modification-requests/create/", data, {
        params: {
          type,
          user,
          slug,
          developer_id
        },
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(response => {
        const requestId = response.data.id;
        const data = new FormData();
        data.append("request", requestId);
        data.append("file", this.props.file);
        axios
          .post("/modification-requests/upload-file/", data, {
            headers: {
              Authorization: `Token ${token}`
            }
          })
          .then(response => this.success())
          .catch(error => this.error());
      })
      .catch(error => this.error());
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <form onSubmit={event => this.submithandler(event)}>
              <h1>What Services are you looking for?</h1>
              <div className="form__Login ">
                <h4>
                  Describe the service you're looking - please be as detailed as
                  possible:
                </h4>
                <div className="row">
                  <div className="col-md-1">
                    <i className="fas fa-pencil-alt display-4 mt-5 d-none d-md-block" />
                  </div>
                  <div className="col-md-11">
                    <Input
                      elementType={this.state.controls.overview.elementType}
                      elementConfig={this.state.controls.overview.elementConfig}
                      value={this.state.controls.overview.value}
                      key={this.state.controls.overview.label}
                      invalid={!this.state.controls.overview.valid}
                      shouldValidate={this.state.controls.overview.validation}
                      touched={this.state.controls.overview.touched}
                      changed={event =>
                        this.inputChangedHandler(event, "overview")
                      }
                      hint={this.state.controls.overview.hint}
                      label={this.state.controls.overview.label}
                    />

                    <FileUpload file />
                  </div>
                </div>

                <hr />
                <h4>
                  Once you place your order, when would you like your service
                  delivered?
                </h4>
                <div className="row mt-5 mb-5">
                  <div className="col-md-1">
                    <i className="far fa-clock display-4 d-none d-md-block" />
                  </div>
                  <div className="col-md-11">
                    <label className="radio">
                      <input
                        type="radio"
                        name="time"
                        onClick={event => this.radioChangeHandler(event)}
                        value="3"
                      />
                      <span>3 Days</span>
                    </label>
                    <label className="radio ml-5">
                      <input
                        type="radio"
                        name="time"
                        value="5"
                        onClick={event => this.radioChangeHandler(event)}
                      />
                      <span>5 Days</span>
                    </label>
                    <label className="radio ml-5">
                      <input
                        type="radio"
                        name="time"
                        value="7"
                        onClick={event => this.radioChangeHandler(event)}
                      />
                      <span>7 Days</span>
                    </label>
                    <label className="radio ml-5">
                      <input
                        type="radio"
                        name="time"
                        value="10"
                        onClick={event => this.radioChangeHandler(event)}
                      />
                      <span>10 Days</span>
                    </label>
                    <label className="radio ml-5">
                      <input
                        type="radio"
                        name="time"
                        value="15"
                        onClick={event => this.radioChangeHandler(event)}
                      />
                      <span>15 Days</span>
                    </label>
                  </div>
                </div>
                <hr />
                <h4>What is your budget for this service?</h4>
                <div className="row ">
                  <div className="col-md-1">
                    <i className="fas fa-dollar-sign display-4 mt-5 pt-2 d-none d-md-block" />
                  </div>
                  <div className="col-md-11">
                    <div className="row">
                      <div className="col-6">
                        <Input
                          elementType={this.state.controls.price.elementType}
                          elementConfig={
                            this.state.controls.price.elementConfig
                          }
                          value={this.state.controls.price.value}
                          key={this.state.controls.price.label}
                          invalid={!this.state.controls.price.valid}
                          shouldValidate={this.state.controls.price.validation}
                          touched={this.state.controls.price.touched}
                          changed={event =>
                            this.inputChangedHandler(event, "price")
                          }
                          hint={this.state.controls.price.hint}
                          label={this.state.controls.price.label}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-1" />
                  <div className="col-md-11">
                    <div className="row">
                      <div className="col-md-10" />
                      <div className="col-md-2">
                        <CustomButton
                          btnType="Btn-primary Btn-lg "
                          clicked={this.submithandler}
                        >
                          submit
                        </CustomButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-4" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    file: state.fileReducer.file
  };
};

export default connect(mapStateToProps)(RequestForm);
