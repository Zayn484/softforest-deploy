import React, { Component } from "react";

import axios from "../../axios";
import { connect } from "react-redux";
import { Modal } from "antd";

import SecondaryHeading from "../../components/UI/Headings/SecondaryHeading";
import LoadingCard from "../../components/UI/LoadingCard/LoadingCard";
import ProfileCard from "../../components/Profile/Profile";

const confirm = Modal.confirm;

class Profile extends Component {
  state = {
    ProfilePic: null,
    Name: null,
    sales: 0,
    balance: 0,
    data: null,
    projects: []
  };

  componentDidMount() {
    axios.get(`/profiles/${this.props.username}`).then(response => {
      this.setState({
        ProfilePic: response.data.profile[1].image,
        Name: response.data.profile[0].profile_name
      });
      if (response.status === 200) {
        axios
          .get(`/sales/?user=${this.props.userId}`)
          .then(response => this.setState({ sales: +response.data.length }));

        axios
          .get(`/balance/${this.props.userId}/`)
          .then(response => this.setState({ balance: response.data.balance }));

        axios
          .get("/projects-detail/")
          .then(response => {
            const fetchProjects = [];
            for (const key in response.data) {
              fetchProjects.push({
                ...response.data[key]
                // id: key
              });
            }

            this.setState({ projects: fetchProjects });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }

  showDeleteConfirm = (event, id, index) => {
    confirm({
      title: "Are you sure to delete this?",
      content: "This operation can not be undo",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      id: id,
      index: index,
      onOk: () => {
        axios
          .delete(`/projects/${id}/`)
          .then(res => {
            if (res.status === 204) {
              const projects = this.state.projects;
              projects.splice(index, 1);
              this.setState({ projects: projects });
            }
          })
          .catch(err => console.log(err));
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  profileSelectHandler = username => {
    this.props.history.push({ pathname: "/profile/" + username });
  };

  projectSelectHandler = slug => {
    this.props.history.push({ pathname: "/shop/" + slug });
  };

  render() {
    const projects = this.state.projects.map((project, index) => {
      return (
        <LoadingCard
          key={project.id}
          thumbnail={project.image}
          title={project.title}
          developer={this.state.Name}
          price={project.price}
          clicked={() => this.projectSelectHandler(project.slug)}
          delete={event => this.showDeleteConfirm(event, project.id, index)}
        />
      );
    });

    return (
      <section className="Content container">
        <div className="row mb-5">
          <div className="col-12 ">
            <div className="row no-gutters">
              <div
                className="col-md-3 float-md-left border mt-5 bg-white"
                style={{ height: "45rem" }}
              >
                <ProfileCard
                  ProfilePic={this.state.ProfilePic}
                  Name={this.state.Name}
                  sales={this.state.sales}
                  balance={this.state.balance}
                  data={this.state.data}
                  clicked={() => this.profileSelectHandler(this.props.username)}
                />
              </div>
              <div className="col-md-9 float-md-right">
                <div
                  className="col-md-11 ml-md-auto mt-5 bg-white border"
                  style={{ height: "5rem" }}
                >
                  <SecondaryHeading className="mt-3">
                    Your Projects
                  </SecondaryHeading>
                </div>
                <div className="no-gutters">
                  <div className="col-md-11 ml-md-auto mt-5 d-md-flex align-content-md-start flex-wrap ">
                    {projects.reverse()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.authReducer.username,
    userId: state.authReducer.userId
  };
};

export default connect(
  mapStateToProps,
  null
)(Profile);
