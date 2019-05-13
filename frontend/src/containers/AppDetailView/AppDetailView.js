import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios";

import { Skeleton, Card } from "antd";
import AppDescription from "../../components/AppDetailView/AppDescription/AppDescription";
import AppSnapshots from "../../components/AppDetailView/AppSnapshots/AppSnapshots";
import AppModules from "../../components/AppDetailView/AppModules/AppModules";
import AppTechnologies from "../../components/AppDetailView/AppTechnologies/AppTechnologies";
import AppRequirements from "../../components/AppDetailView/AppRequirements/AppRequirements";
import DeveloperDescription from "../../components/AppDetailView/DeveloperDescription/DeveloperDescription";
import Recommendations from "../../components/AppDetailView/Recommendations/Recommendations";
import FeedBack from "../../components/AppDetailView/FeedBack/FeedBack";
import SecondaryHeading from "../../components/UI/Headings/SecondaryHeading";
import PrimaryHeading from "../../components/UI/Headings/PrimaryHeading";
import * as actions from "../../store/actions/index";

const DumyImages = require.context("../../assets/img/DumyImages", true);
const RatingPic = require.context("../../assets/img/RatingPic", true);

class AppDetailView extends Component {
  state = {
    isAdmin: false,
    loadedPost: null,
    loading: true,
    id: null,
    slug: null,
    rating: 0,
    AppDescription: {},
    AppSnapshot: [],
    demoLink: null,
    AppModule: [],
    AppTechnology: [],
    AppRequirement: [],
    DeveloperDescription: {
      image: null,
      id: null,
      username: null,
      profileName: null,
      profileTitle: null,
      overview: null
    },
    category: null,
    recommendations: [],
    check: [],
    cartAdded: false,
    inLibrary: false
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== this.props.match.params.id)
      ) {
        setTimeout(() => {
          axios
            .get("/projects-detail/" + this.props.match.params.id)
            .then(response => {
              if (response.status === 200) {
                axios
                  .get(`/profiles/${response.data.user.username}/`)
                  .then(response => {
                    const updatedDeveloperDescription = {
                      ...this.state.DeveloperDescription,
                      image: response.data.profile[1].image,
                      id: response.data.id,
                      username: response.data.username,
                      profileName: response.data.profile[0].profile_name,
                      profileTitle: response.data.profile[0].profile_title,
                      overview: response.data.profile[0].overview
                    };
                    this.setState({
                      DeveloperDescription: updatedDeveloperDescription
                    });
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
              const admin =
                response.data.user.id === +localStorage.getItem("userId")
                  ? true
                  : false;
              // Checking to see if project exists in library
              const user = localStorage.getItem("userId");
              const token = localStorage.getItem("token");
              axios
                .get(`/order/?user=${user}`, {
                  headers: {
                    Authorization: `Token ${token}`
                  }
                })
                .then(response => {
                  response.data.map(el => {
                    el.project.map(el => {
                      if (el.id === this.state.id) {
                        this.setState({ inLibrary: true });
                      }
                    });
                  });
                });
              const updatedAppDetail = {
                ...this.state.AppDescription,
                image: response.data.image,
                video: response.data.video,
                title: response.data.title,
                description: response.data.description,
                price: response.data.price,
                discountRate: response.data.discount_rate,
                onSale: response.data.on_sale
              };
              const updatedAppSnapshots = response.data.snapshots;
              const updatedAppModules = response.data.modules;
              const updatedAppTechnology = response.data.technologies;
              const updatedAppRequirements = response.data.requirements;
              const updatedCategory = response.data.category;
              this.setState({
                isAdmin: admin,
                id: response.data.id,
                slug: response.data.slug,
                rating: response.data.ratings,
                category: updatedCategory,
                demoLink: response.data.link,
                AppDescription: updatedAppDetail,
                AppSnapshot: updatedAppSnapshots,
                AppModule: updatedAppModules,
                AppTechnology: updatedAppTechnology,
                AppRequirement: updatedAppRequirements,
                loading: false,
                loadedPost: true
              });

              this.getRecommendations();
              if (this.props.userId && this.state.cartAdded === false) {
                this.props.onCheckToCart(this.props.userId, this.state.id);
              }
            })
            .catch(error => {
              this.setState({ loading: false });
              console.log(error);
            });
        }, 1000);
      }
    }
  }

  getRecommendations = () => {
    axios
      .get(
        `/projects-random-list/?q=${this.state.category}&id=${this.state.id}`
      )
      .then(response => {
        this.setState({ recommendations: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  addToCartHandler = () => {
    if (this.props.userId) {
      this.props.addToCart(this.props.check, this.props.userId, this.state.id);
    } else {
      this.props.onUpdatePath("/shop");
      this.props.history.push("/login");
    }
  };
  buyHandler = isAuth => {
    if (isAuth) {
      const instance = [];
      const project = {
        id: this.state.id,
        title: this.state.AppDescription.title,
        price: this.state.AppDescription.price
      };
      instance.push(project);
      const data = {
        cart_id: 0,
        cart: instance,
        totalPrice: this.state.AppDescription.price
      };
      this.props.history.push({
        pathname: "/order",
        search: "",
        state: data
      });
    } else {
      // const location = {
      //     pathname: '/login',
      //     state: { from: this.props.routeProps.location.pathname }
      // }
      // this.props.routeProps.history.push(location);
      this.props.onUpdatePath("/shop");
    }
  };

  render() {
    let project = (
      <>
        <div className="row">
          <Skeleton
            className="mt-4 col-md-9"
            paragraph={{ rows: 4 }}
            loading={this.state.loading}
            active
            avatar
          />
          <Card className="mt-4 col-md-3" loading={this.state.loading} />
        </div>
        <div className="row">
          <Skeleton
            className="mt-5 col-md-4"
            paragraph={{ rows: 1 }}
            loading={this.state.loading}
            active
          />
        </div>
        <div className="row">
          <Skeleton
            className="mt-5 col-md-9"
            paragraph={{ rows: 3 }}
            loading={this.state.loading}
            active
          />
        </div>
      </>
    );

    if (this.state.loadedPost) {
      project = (
        <>
          {/* APP IMAGE, TITLE, DESCRIPTION AND PRICE */}

          <AppDescription
            isAdmin={this.state.isAdmin}
            slug={this.state.slug}
            appDescription={this.state.AppDescription}
            isAuth={this.props.isAuth}
            routeProps={this.props}
            addToCartClicked={this.addToCartHandler}
            added={this.props.cartAdded}
            inLibrary={this.state.inLibrary}
            buyHandler={() => this.buyHandler(this.props.isAuth)}
          />
          {/* APP SCREENSHOTS */}
          <AppSnapshots
            isAdmin={this.state.isAdmin}
            snapshot={this.state.AppSnapshot}
          />
          <div>
            <PrimaryHeading className="mt-5">Demo</PrimaryHeading>
            <p className="ml-5">
              Click{" "}
              <a href={this.state.demoLink} target="_blank">
                here
              </a>{" "}
              to download demo version{" "}
            </p>
          </div>
          {/* APP MOUDLES  */}
          <AppModules
            isAdmin={this.state.isAdmin}
            id={this.state.id}
            module={this.state.AppModule}
          />
          {/* APP Technologies  */}
          <AppTechnologies
            isAdmin={this.state.isAdmin}
            id={this.state.id}
            technology={this.state.AppTechnology}
          />
          {/* APP Requirements  */}
          <AppRequirements
            isAdmin={this.state.isAdmin}
            id={this.state.id}
            requirement={this.state.AppRequirement}
          />
          {/* Developer Description  */}
          <DeveloperDescription
            isAdmin={this.state.isAdmin}
            slug={this.state.slug}
            developerDescription={this.state.DeveloperDescription}
            routeProps={this.props}
          />
          {/* Recommendations */}
          <section className="mt-5">
            {this.state.recommendations.length > 0 ? (
              <SecondaryHeading className="mb-5">
                These might interest you
              </SecondaryHeading>
            ) : null}
            {this.state.recommendations.map((el, index) => (
              <Recommendations
                key={el.id}
                img={el.image}
                title={el.title}
                price={el.price}
                rating={el.ratings}
              />
            ))}
          </section>
          {/* FEEDBACK */}
          <FeedBack
            id={this.state.id}
            slug={this.state.slug}
            rating={this.state.rating}
          />
        </>
      );
    }

    return <section className="container">{project}</section>;
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.token !== null,
    userId: state.authReducer.userId,
    token: state.authReducer.token,
    check: state.cartReducer.check,
    cartAdded: state.cartReducer.cartAdded
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdatePath: path => dispatch(actions.setAuthRedirectPath(path)),
    onCheckToCart: (userId, softwareId) =>
      dispatch(actions.checkToCart(userId, softwareId)),
    addToCart: (check, userId, id) =>
      dispatch(actions.addToCart(check, userId, id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDetailView);
