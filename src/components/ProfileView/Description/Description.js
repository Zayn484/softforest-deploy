import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "../../../axios";
import Button from "../../UI/Button/Button";
import PrimaryHeading from "../../UI/Headings/PrimaryHeading";
import SecondaryHeading from "../../UI/Headings/SecondaryHeading";
import Paragraph from "../../UI/Paragraph/Paragraph";
import Img from "../../UI/Img/Img";
import AsyncModal from "../../UI/AsyncModal/AsyncModal";

class Description extends Component {
  state = {
    usernames: [],
    error: null
  };

  isAuthHander = isAuth => {
    if (isAuth) {
      this.props.routeProps.history.push("/request-form");
    } else {
      const location = {
        pathname: "/request-form",
        state: { from: this.props.routeProps.location.pathname }
      };
      this.props.routeProps.history.push(location);
    }
  };

  newMessageHandler = event => {
    event.preventDefault();
    const { usernames } = this.state;
    const combinedUsernames = [
      ...usernames,
      this.props.username,
      this.props.developerDescription.username
    ];

    axios
      .post("/chat/create/", {
        messages: [],
        participants: combinedUsernames
      })
      .then(response => {
        console.log(response);
        this.props.history.push(`/messages/${response.data.id}`);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: error
        });
      });
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-3 text-center">
          <div className="Profile__ImageBox pt-0">
            <Img
              src={this.props.developerDescription.developerpic}
              alt="ProfilePic"
              className="Profile__ProfilePic img-thumbnail"
            />
          </div>
          {/* <div className="Profile__RatingBox pt-5">
                        <Img src={this.props.developerDescription.ratingPic} alt="rating" className="" />
                    </div> */}
        </div>
        <div className="col-md-6 pt-5 pt-md-0">
          <PrimaryHeading>
            {this.props.developerDescription.profileName}
          </PrimaryHeading>
          <SecondaryHeading>
            {this.props.developerDescription.profileTitle}
          </SecondaryHeading>
          <Paragraph className="">
            {this.props.developerDescription.description}
          </Paragraph>
        </div>

        <div className="col-md-3 my-auto p-5">
          <div className="ButtonBox">
            <form onSubmit={this.newMessageHandler}>
              <Button btnType=" Btn-lg btn-block Btn-primary">
                <i className="far fa-envelope" />
                &nbsp;&nbsp;&nbsp;Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.authReducer.username,
    token: state.authReducer.token
  };
};

export default withRouter(connect(mapStateToProps)(Description));
