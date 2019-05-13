import React from "react";

import BuildTeamImage from "../../assets/img/DumyImages/build-team.jpg";

const buildTeamSection = props => (
  <section className="Content">
    <div className="BuildTeamSection container">
      <div className="text-center">
        <h1 className="Primary-Heading">want to build projects?</h1>
      </div>
      <div className="row">
        <div className="col-md-7">
          <div className="Normal-Font-Size">
            <p>
              If you are looking to earn then this is the right place for you.
              Simply create an account and upload your projects.
            </p>

            <p>
              With secure payment methods, you can have instant access to
              projects.
            </p>
          </div>
          <h1 className="Secondary-Heading">Things to know:</h1>
          <ul className="Normal-Font-Size">
            <li>Search any project you need.</li>
            <li>See your choosed project details before adding it to cart.</li>
            <li>Request developer to add more features.</li>
            <li>Add it to cart and go to checkout.</li>
            <li>Payments are 100% secured.</li>
          </ul>
        </div>
        <div className="col-md-5 mt-5">
          <img className="img-fluid" src={BuildTeamImage} alt="build-team" />
        </div>
      </div>
    </div>
  </section>
);

export default buildTeamSection;
