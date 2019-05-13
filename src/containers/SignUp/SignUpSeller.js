import React, { Component } from "react";
import axios from "../../axios";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { checkValidity } from "../../shared/utility";
import DevelperDumyProfilePic from "../../assets/img/ProfilePic/develperDumyProfilePic.png";
//import ProfileImage from '../../components/UI/ProfileImage/ProfileImage';
class SignUpSeller extends Component {
  state = {
    controls: {
      profileName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your profile name"
        },
        label: "Profile Name:",
        hint: "Write minimum 5 characters",
        value: "",
        validation: {
          required: true,
          isUsername: true
        },
        valid: false,
        touched: false
      },
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "e.g, Web Developer"
        },
        label: "Title:",
        hint: "Must contain letters",
        value: "",
        validation: {
          required: true,
          isUsername: true
        },
        valid: false,
        touched: false
      },
      overview: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Decribe yourself",
          maxLength: "300",
          minLength: "50"
        },
        label: "Overview:",
        hint: "Write minimum 300 words of overview",
        value: "",
        validation: {
          required: true,
          isUsername: true
        },
        valid: false,
        touched: false
      },
      skills: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "eg: Java, Python"
        },
        label: "Skills:",
        hint: "Minimum 1 skill required",
        value: "",
        validation: {
          required: true,
          isUsername: true
        },
        valid: false,
        touched: false
      }
    },
    image: DevelperDumyProfilePic,
    imageUrl: DevelperDumyProfilePic
  };

  componentDidMount() {
    console.log(this.props);
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
    this.setState({ controls: updateControls });
  };

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        imageUrl: URL.createObjectURL(event.target.files[0]),
        image: event.target.files[0]
      });
    }
  };

  submitHandler = event => {
    event.preventDefault();
    const data = {
      email: this.props.location.state.email,
      username: this.props.location.state.username,
      password: this.props.location.state.password,
      occupation: this.props.location.state.userType,
      profile: {
        profile_name: this.state.controls.profileName.value,
        profile_title: this.state.controls.title.value,
        overview: this.state.controls.overview.value,
        skills: this.state.controls.skills.value
      }
    };
    axios
      .post("/register/", data)
      .then(response => {
        console.log(response);
        if (response.status === 201) {
          const fd = new FormData();
          fd.append("user", response.data.id);
          fd.append("image", this.state.image);
          axios
            .post(`/register/${response.data.id}/upload-profile-picture/`, fd)
            .then(response => {
              console.log(response);
              if (response.status === 201) {
                this.props.history.replace("/login");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
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
      />
    ));
    return (
      <div className=" container mb-5">
        <div className="row">
          <div className=" col-md-2 col-lg-2 "> </div>
          <div className=" col-md-8 col-lg-8 ">
            {/* {alert} */}
            <div className="form__Login ">
              <h3 className=" font-weight-bold  text-center text-uppercase ">
                Sign Up
              </h3>
              <div className="row">
                <div className="col-md-4 text-center">
                  <img
                    src={this.state.imageUrl}
                    alt="profile"
                    className="mt-5 rounded img-fluid profile_img"
                  />
                  <label className="custom-file-upload mt-3 ">
                    <input type="file" onChange={this.onImageChange} />
                    Upload Image
                  </label>
                  {/* <ProfileImage/> */}
                </div>
                <div className="col-md-7">
                  <form onSubmit={this.submitHandler}>
                    {form}
                    <div className="text-center">
                      <Button
                        btnType="Btn-primary Btn-lg "
                        clicked={this.submitHandler}
                      >
                        <span className="spinner-border " /> Submit
                      </Button>
                    </div>
                  </form>
                </div>
                <div
                  id="popup1"
                  className={
                    (this.props.loading ? "overlay-show" : "overlay-hide") +
                    " overlay"
                  }
                >
                  <div className="popup">
                    <div className="content">{/* <Spinner /> */}</div>
                  </div>
                </div>
                <div className="col-md-1" />
              </div>
            </div>
          </div>
          <div className=" col-md-2 col-lg-2" />
        </div>
      </div>
    );
  }
}
export default SignUpSeller;
