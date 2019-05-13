import React from 'react'

const footer = (props) => (

  <footer className="Footer footer Normal-Font-Size page-footer font-small mdb-color pt-4 container-fluid">

    <div className='container'>

      <div className="text-center text-md-left">


        <div className="row text-center text-md-left mt-3 pb-3" >


          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold Secondary-Heading">SoftForest</h6>
            <p>Show your work to the world.</p>
          </div>


          <hr className="w-100 clearfix d-md-none" />


          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold Secondary-Heading">Categories</h6>
            <p>
              <a href="/-some">Desktop apps</a>
            </p>
            <p>
              <a href="/-someother">Mobile apps</a>
            </p>
            <p>
              <a href="/-something">Web apps</a>
            </p>
          </div>


          <hr className="w-100 clearfix d-md-none" />


          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold  Secondary-Heading">Company</h6>
            <p>
              <a href="/">About us</a>
            </p>
            <p>
              <a href="/">Trust and Safety</a>
            </p>
            <p>
              <a href="/">Terms of Use</a>
            </p>
            <p>
              <a href="/">Privacy Policy</a>
            </p>
            <p>
              <a href="/">Help</a>
            </p>
          </div>


          <hr className="w-100 clearfix d-md-none" />


          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold  Secondary-Heading">Contact</h6>
            <p>
              <i className="fas fa-home mr-3"></i> Sialkot, Daska Road, Pakistan</p>
            <p>
              <i className="fas fa-envelope mr-3"></i> info@SoftForest.com</p>
            <p>
              <i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
            <p>
              <i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
          </div>


        </div>


        <hr />


        <div className="row d-flex align-items-center">


          <div className="col-md-7 col-lg-8">


            <p className="text-center text-md-left">© 2018 Copyright:
            <a href="https://mdbootstrap.com/education/bootstrap/">
                <strong> SoftForest.com</strong>
              </a>
            </p>

          </div>



          <div className="col-md-5 col-lg-4 ml-lg-0">

            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm rgba-white-slight mx-1" href="/" >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm rgba-white-slight mx-1" href="/" >
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm rgba-white-slight mx-1" href="/" >
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm rgba-white-slight mx-1" href="/" >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>

          </div>


        </div>


      </div>
    </div>
  </footer>

);

export default footer;