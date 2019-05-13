import React from "react";
import { NavLink } from "react-router-dom";

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const contact = props => {
  return (
    <NavLink to={`${props.chatUrl}`} style={{ color: "white" }}>
      <div className="chat_list ">
        <div className="chat_people">
          <div className="chat_img">
            {" "}
            <img
              src="https://ptetutorials.com/images/user-profile.png"
              alt="sunil"
            />{" "}
          </div>
          <div className="chat_ib">
            <h5>
              {capitalize(props.name)} <span className="chat_date">Dec 25</span>
            </h5>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default contact;
