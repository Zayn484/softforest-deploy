import React from "react";
import { Tag, Rate } from "antd";
import { withRouter } from "react-router-dom";

const appList = props => {
  return (
    <section className="col-12 mx-auto">
      <div
        className="AppList row col-md-10 shadow px-0"
        onClick={props.clicked}
      >
        <div className="AppList__Img col-2 px-0">
          <img className="img-fluid" src={props.image} alt="Thumbnail" />
        </div>
        <div className="col-8">
          <div className="AppList__Title row mx-1">
            <h1 className="Secondary-Heading mt-3">{props.title}</h1>
          </div>
          <div className="AppList__Description row mx-1 d-none d-md-block d-lg-block">
            <p className="Normal-Font-Size">
              {props.description.substring(0, 110)}
              {props.description.length > 100 ? "..." : null}{" "}
            </p>
          </div>
          <div className="AppList__Technologies row mx-1">
            <span className="font-weight-normal text-muted">
              Technologies:
              <span>
                {" "}
                {props.technologies.slice(0, 4).map((el, index) => (
                  <Tag color="green" key={index}>
                    {el["name"].toUpperCase()}
                  </Tag>
                ))}
              </span>
            </span>
          </div>
        </div>

        <div className="AppList__Price col-2 text-center justify-content-center align-self-center">
          <h1 className="Secondary-Heading ">
            {props.onSale ? (
              <strike>${props.price}</strike>
            ) : (
              <> ${props.price} </>
            )}{" "}
          </h1>
          {props.onSale && <h2>${props.discountRate}</h2>}
          <Rate
            style={{ fontSize: "1.2rem" }}
            disabled
            allowHalf
            defaultValue={+props.ratings}
          />
        </div>
      </div>
    </section>
  );
};

export default withRouter(appList);
