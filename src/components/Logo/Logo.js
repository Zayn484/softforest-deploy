import React from 'react';

import {NavLink} from 'react-router-dom';

import Logo from '../../assets/img/Logo/logo.png';

const logo = (props) => (
    <NavLink className="navbar-brand" to="/">
          <img src={Logo} width="200" height="70" alt="softforest-logo" />
    </NavLink>
);

export default logo;