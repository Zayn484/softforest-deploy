import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import axios from "../../../axios";
import ReactPlayer from "react-player";
import CustomButton from "../../UI/Button/Button";
import PrimaryHeading from "../../UI/Headings/PrimaryHeading";
import SecondaryHeading from "../../UI/Headings/SecondaryHeading";
import Paragraph from "../../UI/Paragraph/Paragraph";
import Img from "../../UI/Img/Img";
import PlayIcon from "../../../assets/img/PlayIcon/PlayIcon.svg";
import AsyncModal from "../../UI/AsyncModal/AsyncModal";

class AppDescription extends Component {
  state = {
    AppDescription: {},
    controls: {
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Cafe Management System"
        },
        value: ""
      },
      price: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "100"
        },
        value: ""
      },
      description: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Description about your project"
        },
        value: ""
      }
    },
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false
  };

  componentDidMount() {
    const controls = {
      ...this.state.controls,
      title: {
        value: this.props.appDescription.title
      },
      price: {
        value: this.props.appDescription.price
      },
      description: {
        value: this.props.appDescription.description
      }
    };

    this.setState({
      controls: controls,
      AppDescription: this.props.appDescription
    });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true
    });

    axios
      .patch(`/projects-detail/${this.props.slug}/`, {
        title: this.state.controls.title.value,
        description: this.state.controls.description.value,
        price: this.state.controls.price.value
      })
      .then(response => {
        if (response.statusText === "OK") {
          const updateState = {
            ...AppDescription,
            title: response.data.title,
            description: response.data.description,
            price: response.data.price
          };
          this.setState({
            AppDescription: updateState,
            confirmLoading: false,
            visible: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  inputChangedHandler = (event, controlName) => {
    const updateControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value
      }
    };
    this.setState({ controls: updateControls });
  };

  render() {
    let buttons = null;

    if (this.props.occupation !== "seller") {
      buttons = (
        <>
          <CustomButton
            btnType="Btn-primary Btn-lg btn-block"
            clicked={this.props.addToCartClicked}
            disabled={this.props.cartAdded}
          >
            {this.props.cartAdded ? "Added" : "ADD TO CART"}
          </CustomButton>
          <CustomButton
            btnType="Btn-lg d-block btn-outline-secondary btn-block"
            clicked={this.props.buyHandler}
          >
            BUY
          </CustomButton>
        </>
      );
    }

    return (
      <div className="row ">
        <div className="col-md-3 text-center">
          <div className="App__ImageBox">
            <Img
              src={this.props.appDescription.image}
              alt="thumbnail"
              className="App__AppPic img-fluid img-thumbnail"
            />
          </div>
        </div>
        <div className="Show-Edit-Btn col-md-6 mt-4 mt-md-0">
          <PrimaryHeading className="text-center text-md-left">
            {this.state.AppDescription.title}
            {this.props.isAdmin ? (
              <Button
                shape="circle"
                style={{ backgroundColor: "#05C0BA", marginLeft: "1rem" }}
                onClick={this.showModal}
              >
                <i className="text-white fas fa-pencil-alt" />
              </Button>
            ) : null}
          </PrimaryHeading>

          <AsyncModal
            visible={this.state.visible}
            handleOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            handleCancel={this.handleCancel}
          >
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Name"
                  onChange={event => this.inputChangedHandler(event, "title")}
                  value={this.state.controls.title.value}
                />
              </div>
              <div className="form-group">
                <textarea
                  rows="8"
                  className="form-control"
                  name="description"
                  placeholder="Write overview of your project..."
                  onChange={event =>
                    this.inputChangedHandler(event, "description")
                  }
                  value={this.state.controls.description.value}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  placeholder="$5.00"
                  onChange={event => this.inputChangedHandler(event, "price")}
                  value={this.state.controls.price.value}
                />
              </div>
            </form>
          </AsyncModal>

          <Paragraph>{this.state.AppDescription.description}</Paragraph>
          <SecondaryHeading>
            Price:{" "}
            {this.state.AppDescription.onSale ? (
              <strike className="mr-2">
                ${this.state.AppDescription.price}
              </strike>
            ) : (
              <>${this.state.AppDescription.price}</>
            )}
            {this.state.AppDescription.onSale &&
              this.state.AppDescription.discountRate}
          </SecondaryHeading>
        </div>
        <div className="col-md-3 border bg-white" style={{ height: "30rem" }}>
          <div
            className="Video col-12"
            data-toggle="modal"
            data-target="#myModal"
          >
            <div className="mx-auto">
              <img
                className="Video-Thumbnail img-fluid"
                src={this.props.appDescription.image}
                alt="thumbnail"
              />
              <img
                className="Video-Play img-fluid"
                style={{ opacity: ".8" }}
                src={PlayIcon}
                alt="thumbnail"
              />
            </div>
          </div>
          <div
            className="modal fade"
            id="myModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body player-wrapper">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <ReactPlayer
                    ref={this.ref}
                    className="react-player"
                    width="100%"
                    height="100%"
                    url={this.state.AppDescription.video}
                    controls
                    onSeek={e => console.log("onSeek", e)}
                    onStart={() => console.log("onStart")}
                    onProgress={e => console.log("onProgress", e)}
                  />
                </div>
              </div>
            </div>
          </div>
          {buttons}
          {this.props.inLibrary ? (
            <p className="text-primary text-center mt-3">In-Library</p>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    occupation: state.authReducer.occupation,
    cartAdded: state.cartReducer.cartAdded
  };
};

export default connect(
  mapStateToProps,
  null
)(AppDescription);
