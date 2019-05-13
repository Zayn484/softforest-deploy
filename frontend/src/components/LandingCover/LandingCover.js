import React from 'react';

import Searchbar from '../Navigation/Searchbar/Searchbar';

const landingCover = (props) => (
  <div className="col-12" id="stage" >
    <div className="landing-cover__caption container" >
      <div id="stage-caption" >
        <h1 className="display-3">Shop any project from anywhere.</h1>
        <p>Build teams and start your business now.</p>

        {props.noSearchbar ? null :

          <div className="form-inline" >
            <Searchbar landingSearchbar />
            {/* <Button btnType="Btn-primary Btn-md btn-block">search</Button> */}
          </div>
        }
      </div>
    </div>
  </div>
);

export default landingCover;
