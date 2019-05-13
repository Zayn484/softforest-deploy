import React from "react";

import { Link } from "react-router-dom";

import Button from "../../UI/Button/Button";
import Searchbar from "../Searchbar/Searchbar";

const navigationItems = props => {
  let navigate = null;
  if (!props.isAuth) {
    navigate = (
      <>
        <li className="nav-item toolbar-nav-item">
          <Link className="nav-link m-1" to="/signup">
            sign up
          </Link>
        </li>
        <li className="nav-item toolbar-nav-item">
          <Link className="nav-link m-1" to="/login">
            login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link m-1" to="/shop">
            <Button btnType="Btn-primary Btn-sm btn-block">shop</Button>
          </Link>
        </li>
      </>
    );
  }
  if (props.isAuth && props.occupation === "seller") {
    navigate = (
      <>
        <li className="nav-item toolbar-nav-item">
          <Link className="nav-link m-1" to="/dashboard">
            dashboard
          </Link>
        </li>
        <li className="nav-item toolbar-nav-item">
          <Link className="nav-link m-1" to="/messages">
            messages
          </Link>
        </li>
        <li className="nav-item toolbar-nav-item">
          <Link className="nav-link m-1" to="/requests">
            requests
          </Link>
        </li>

        <li className="nav-item active">
          <div className="btn-group toolbar-nav-item">
            <a
              className="nav-link dropdown-toggle toolbar-nav--dropdown m-1"
              href="/Catagory"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i className="fas fa-user" />
            </a>
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item toolbar-nav-item">
                Profile
              </Link>
              <Link to="/settings" className="dropdown-item toolbar-nav-item">
                Settings
              </Link>
              <hr />
              <Link to="/logout" className="dropdown-item toolbar-nav-item">
                Logout
              </Link>
            </div>
          </div>
        </li>
      </>
    );
  }

  if (props.isAuth && props.occupation === "buyer") {
    navigate = (
      <>
        <li className="nav-item toolbar-nav-item">
          <Link className="nav-link m-1" to="/messages">
            messages
          </Link>
        </li>
        <li className="nav-item toolbar-nav-item">
          <Link className="nav-link m-1" to="/requests">
            requests
          </Link>
        </li>
        <li className="nav-item active">
          <div className="btn-group toolbar-nav-item">
            <a
              className="nav-link dropdown-toggle toolbar-nav--dropdown m-1"
              href="/Catagory"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i className="fas fa-user" />
            </a>
            <div className="dropdown-menu">
              <Link to="/library" className="dropdown-item toolbar-nav-item">
                Library
              </Link>
              <Link to="/settings" className="dropdown-item toolbar-nav-item">
                Settings
              </Link>
              <hr />
              <Link to="/logout" className="dropdown-item toolbar-nav-item">
                Logout
              </Link>
            </div>
          </div>
        </li>

        <li className="nav-item toolbar-nav-item">
          <Link className="nav-link m-1" to="/cart">
            <i className="fas fa-cart-plus" />
            <span className="badge badge-info" id="lblCartCount">
              {props.cartCount > 0 ? props.cartCount : ""}
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link m-1" to="/shop">
            <Button btnType="Btn-primary Btn-sm btn-block ">shop</Button>
          </Link>
        </li>
      </>
    );
  }

  return (
    <ul className="navbar-nav  ml-auto">
      <li className="nav-item d-block d-sm-none d-none d-sm-block d-md-none">
        <div className="form-inline searchbar-container ">
          <Searchbar className="searchbar" />
        </div>
      </li>

      {navigate}
    </ul>
  );
};

export default navigationItems;
