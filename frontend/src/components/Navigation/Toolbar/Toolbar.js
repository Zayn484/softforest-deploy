import React from 'react'

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Searchbar from '../Searchbar/Searchbar';

const toolbar = (props) => (

  // Toolbar

  <header className='toolbar sticky-top'>
    <nav className="navbar navbar-expand-lg navbar-light bg-light toolbar-nav" >
      <div className="container">

        <Logo />

        <div className='d-none d-md-block d-lg-block'>
          <Searchbar className="searchbar" />
          {/* <Button btnType="Btn-primary Btn-search btn-block"><i className="fas fa-search"></i></Button> */}

        </div>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">

          <NavigationItems isAuth={props.isAuth} occupation={props.occupation} cartCount={props.cartCount} />

        </div>
      </div>
    </nav>
  </header>
);

export default toolbar;