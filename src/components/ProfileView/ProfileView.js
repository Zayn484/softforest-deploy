import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import DeveloperDescription from "./Description/Description";
import DeveloperProjects from "./Projects/Projects";
import Skills from "./Skills/Skills";

const DumyImages = require.context("../../assets/img/DumyImages", true);
const RatingPic = require.context("../../assets/img/RatingPic", true);
const Snapshot = require.context("../../assets/img/Snapshot", true);

class ProfileView extends Component {
  state = {
    DeveloperDescription: {
      admin: false,
      id: null,
      developerpic: null,
      username: null,
      profileName: null,
      profileTitle: null,
      description: null,
      ratingPic: RatingPic("./Rating.png"),
      laptop: DumyImages("./MKS.jpg"),
      laptop1: DumyImages("./Statistic-chart.jpg")
    },
    DeveloperApps: {
      Snapshot: Snapshot("./baseline-add_photo_alternate-24px@2x.png")
    },
    projects: [],
    skills: []
  };

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/profiles/${this.props.match.params.id}/`)
      .then(response => {
        const skills = response.data.profile[0].skills.split(",");
        this.setState({ skills: skills });
        if (response.status === 200) {
          axios
            .get(`http://127.0.0.1:8000/api/projects-list/${response.data.id}`)
            .then(response => {
              this.setState({
                projects: response.data
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
        const admin =
          response.data.id === +localStorage.getItem("userId") ? true : false;
        const updatedDeveloperDescription = {
          ...DeveloperDescription,
          admin: admin,
          id: response.data.id,
          developerpic: response.data.profile[1].image,
          username: response.data.username,
          profileName: response.data.profile[0].profile_name,
          profileTitle: response.data.profile[0].profile_title,
          description: response.data.profile[0].overview
        };

        this.setState({
          DeveloperDescription: updatedDeveloperDescription
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <section className="Section-ProfileView  container">
        {/* DEVELOPER DESCRIPTION */}
        <DeveloperDescription
          isAuth={this.props.isAuth}
          routeProps={this.props}
          developerDescription={this.state.DeveloperDescription}
        />
        {/* DEVELOPER PROJECTS */}
        <DeveloperProjects
          developerApps={this.state.DeveloperApps}
          projects={this.state.projects}
        />
        {/* HORIZENTAL ROW */}
        <hr />
        {/* DEVELOPER SKILLS */}
        <Skills skills={this.state.skills} />
        {/* DEVELOPER EDUCATION */}
        {/* <Education Education={this.state.Education} /> */}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.token !== null,
    userId: state.authReducer.userId,
    token: state.authReducer.token
  };
};

export default connect(
  mapStateToProps,
  null
)(ProfileView);
