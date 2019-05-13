import React from "react";
import { withRouter } from "react-router-dom";
import PrimaryHeading from "../../UI/Headings/PrimaryHeading";
import LoadingCard from "../../UI/LoadingCard/LoadingCard";

class Projects extends React.Component {
  projectSelectHandler = slug => {
    this.props.history.push({ pathname: "/shop/" + slug });
  };

  render() {
    return (
      <>
        <div className="row mt-5 text-center">
          <div className="col-md-3">
            <PrimaryHeading className="">PROJECTS</PrimaryHeading>
          </div>
          <div className="col-md-9" />
        </div>
        <div className="row mt-5">
          {this.props.projects.map((el, index) => (
            <LoadingCard
              key={index}
              thumbnail={el.image}
              title={el.title}
              developer={el.user.username}
              price={el.price}
              clicked={() => this.projectSelectHandler(el.slug)}
            />
          ))}
        </div>
      </>
    );
  }
}

export default withRouter(Projects);
