import React, { Component } from "react";
import axios from "../../axios";
import { connect } from "react-redux";
import { Icon, Pagination, Skeleton } from "antd";
import * as actions from "../../store/actions/index";
import AppListView from "../../components/AppListView/AppListView";
import Filter from "../../components/Filter/Filter";

class Shop extends Component {
  constructor(props) {
    super(props);
    window.onscroll = () => {
      const {
        state: { error, loading, hasMore }
      } = this;
      if (error || loading || !hasMore) return;
    };
  }

  state = {
    projects: [],
    loading: true,
    notFound: false,
    error: false,
    hasMore: true,
    offset: 0,
    limit: 10,
    current: 1
  };

  componentWillReceiveProps(nextProps) {
    // Fetching data on applying filters
    if (nextProps.applyFilter) {
      console.log("nextProps");
      let categories = null;
      let technologies = null;
      let price = null;

      this.setState({ loading: true, projects: [] });
      // Setting location state to null due to avoid conflicts
      this.props.location.state = null;
      if (this.props.platformFilterList) {
        categories = this.props.platformFilterList.join("|");
      }

      if (this.props.technologyFilterList) {
        technologies = this.props.technologyFilterList.join("|");
      }

      if (this.props.priceFilterList) {
        price = this.props.priceFilterList.join("|");
      }

      axios
        .get("/projects/", {
          params: {
            categories,
            technologies,
            price
          }
        })
        .then(response => {
          this.props.setFilter(false);
          setTimeout(() => {
            if (response.data.length === 0) {
              this.setState({ notFound: true, loading: false, hasMore: true });
            } else {
              this.setState({
                projects: response.data,
                loading: false,
                notFound: false
              });
            }
          }, 1000);
        })
        .catch(error => console.log(error));
    }

    // Fetch data from props state when usually users searches from search bar

    if (this.props.location.state) {
      setTimeout(() => {
        const projects = this.props.location.state
          ? this.props.location.state.projects
          : [];
        if (projects.length === 0) {
          this.setState({ notFound: true, loading: false, projects: [] });
        } else {
          this.setState({
            projects: projects,
            notFound: false,
            loading: false
          });
        }
      }, 500);
    }
  }

  componentDidMount() {
    // If user searched for items
    if (this.props.location.state) {
      setTimeout(() => {
        const projects = this.props.location.state.projects;
        if (projects.length === 0) {
          this.setState({ notFound: true, loading: false });
        } else {
          this.setState({
            projects: projects,
            notFound: false,
            loading: false
          });
        }
      }, 1000);
      return;
    }

    setTimeout(() => {
      axios
        .get("/projects/")
        .then(response => {
          this.setState({ loading: false, projects: response.data });
        })
        .catch(error => {
          this.setState({ loading: false, error: error });
        });
    }, 2000);
  }

  loadProjects = current => {
    const { offset, limit } = this.state;
    this.setState({ projects: [], loading: true });
    let url = null;
    setTimeout(() => {
      if (current < this.state.current) {
        url = `/infinite-scroll/?limit=${limit}&offset=${current * offset -
          limit}`;
        this.setState({
          offset: offset - limit
        });
      } else {
        url = `/infinite-scroll/?limit=${limit}&offset=${current * offset +
          limit}`;
        this.setState({
          offset: offset + limit
        });
      }
      this.setState({ loading: true, current: current }, () => {
        axios
          .get(url)
          .then(response => {
            const newProjects = response.data.projects;
            const hasMore = response.data.has_more;
            this.setState({
              hasMore,
              loading: false,
              projects: [...this.state.projects, ...newProjects]
            });
          })
          .catch(error => {
            this.setState({ error: error, loading: false });
          });
      });
    }, 1000);
  };

  projectSelectHandler = slug => {
    this.props.history.push({ pathname: "/shop/" + slug });
  };

  render() {
    let projects = null;
    const skeltons = [];

    for (let i = 0; i < 10; i++) {
      skeltons.push(
        <Skeleton
          key={i}
          className="mt-4 col-md-10"
          loading={this.state.loading}
          active
        />
      );
    }

    if (this.state.notFound) {
      projects = (
        <h3>
          <Icon type="stop" theme="twoTone" twoToneColor="#eb2f96" /> No results
          found
        </h3>
      );
    }

    if (this.state.projects.length > 0) {
      projects = this.state.projects.map(project => {
        return (
          <AppListView
            key={project.id}
            image={project.image}
            title={project.title}
            description={project.description}
            price={project.price}
            technologies={project.technologies}
            onSale={project.on_sale}
            discountRate={project.discount_rate}
            ratings={project.ratings}
            clicked={() => this.projectSelectHandler(project.slug)}
          />
        );
      });
    }

    return (
      <section className="Content container">
        <Filter />

        {skeltons}
        {projects}

        {this.state.error && <div>{this.state.error}</div>}
        {!this.state.hasMore && (
          <h3 className="mt-5">
            <Icon type="stop" theme="twoTone" twoToneColor="#eb2f96" />
            &nbsp;&nbsp;No more results
          </h3>
        )}
        <br />
        <br />
        <div className="mt-5 text-center">
          <Pagination
            simple
            defaultCurrent={1}
            total={500}
            onChange={current => this.loadProjects(current)}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.searchReducer.search,
    platformFilterList: state.filterReducer.platformList,
    technologyFilterList: state.filterReducer.technologyList,
    priceFilterList: state.filterReducer.priceList,
    applyFilter: state.filterReducer.applyFilter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilter: apply => dispatch(actions.applyFilter(apply))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
