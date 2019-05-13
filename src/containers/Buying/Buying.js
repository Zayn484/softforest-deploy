import React, { Component } from 'react';

import Cover from '../../components/LandingCover/LandingCover';
import PrimaryHeading from '../../components/UI/Headings/PrimaryHeading';
import TertiaryHeading from '../../components/UI/Headings/TertiaryHeading';
import Paragraph from '../../components/UI/Paragraph/Paragraph';
import BuildTeamImage from '../../assets/img/DumyImages/build-team.jpg';
import Button from '../../components/UI/Button/Button';

class Buying extends Component {

    state = {
        step: 0,
        developSoftware: true,
        upload: false,
        buildCommunity: false
    }

    stepOneHandler = () => {
        this.setState({ step: 0, developSoftware: true, upload: false, buildCommunity: false });
    };

    stepTwoHandler = () => {
        this.setState({ step: 1, developSoftware: false, upload: true, buildCommunity: false });
    };

    stepThreeHandler = () => {
        this.setState({ step: 2, developSoftware: false, upload: false, buildCommunity: true });
    };

    render() {

        let step;
        // let activeProperty;

        if (this.state.step === 0) {
            // activeProperty = '2px solid blue';
            step = <div className='row'>
                <div className=' col-md-7'>
                    <div className='Normal-Font-Size'>
                        <p>If you are looking for team to work on projects then its easy.
                        Simply create an account and invite developers that might interest you.</p>
                        <p>Our team management system helps developers to work together to build more
                        robust softwares.</p>
                        <p>Developers can split their work. Just search, browse other developers and invite
                        them to join your team.</p>
                        <p>With secure payment methods, you can build your team and take your projects to
                        next level.</p></div>
                    <h1 className='Secondary-Heading'>Things to know:</h1>
                    <ul className="Normal-Font-Size">
                        <li>Search any project you need.</li>
                        <li>See your choosed project details before adding it to cart.</li>
                        <li>Request developer to add more features.</li>
                        <li>Add it to cart and go to checkout.</li>
                        <li>Payments are 100% secured.</li>
                    </ul>
                </div >
                <div className='col-md-5 mt-5'>
                    <img className='img-fluid' src={BuildTeamImage} alt='build-team' />
                </div>
            </div>
        }

        else if (this.state.step === 1) {
            step = <div className='row'>
                <div className=' col-md-7'>
                    <div className='Normal-Font-Size'>
                        <p>If you are looking for team to work on projects then its easy.
                    Simply create an account and invite developers that might interest you.</p>
                        <p>If you are looking for team to work on projects then its easy.
                    Simply create an account and invite developers that might interest you.</p>
                        <p>If you are looking for team to work on projects then its easy.
                    Simply create an account and invite developers that might interest you.</p>
                        <p>Our team management system helps developers to work together to build more
                    robust softwares.</p>
                        <p>Developers can split their work. Just search, browse other developers and invite
                    them to join your team.</p>
                        <p>With secure payment methods, you can build your team and take your projects to
                    next level.</p></div>
                    <h1 className='Secondary-Heading'>Things to know:</h1>
                    <ul className="Normal-Font-Size">
                        <li>Search any project you need.</li>
                        <li>See your choosed project details before adding it to cart.</li>
                        <li>Request developer to add more features.</li>
                        <li>Add it to cart and go to checkout.</li>
                        <li>Payments are 100% secured.</li>
                    </ul>
                </div >
                <div className='col-md-5 mt-5'>
                    <img className='img-fluid' src={BuildTeamImage} alt='build-team' />
                </div>
            </div>
        }

        if (this.state.step === 2) {
            // activeProperty = '2px solid blue';
            step = <div className='row'>
                <div className=' col-md-7'>
                    <div className='Normal-Font-Size'>
                        <p>If you are looking for team to work on projects then its easy.
                        Simply create an account and invite developers that might interest you.</p>
                        <p>Our team management system helps developers to work together to build more
                        robust softwares.</p>
                        <p>Developers can split their work. Just search, browse other developers and invite
                        them to join your team.</p>
                        <p>With secure payment methods, you can build your team and take your projects to
                        next level.</p></div>
                    <h1 className='Secondary-Heading'>Things to know:</h1>
                    <ul className="Normal-Font-Size">
                        <li>Search any project you need.</li>
                        <li>See your choosed project details before adding it to cart.</li>
                        <li>Request developer to add more features.</li>
                        <li>Add it to cart and go to checkout.</li>
                        <li>Payments are 100% secured.</li>
                    </ul>
                </div >
                <div className='col-md-5 mt-5'>
                    <img className='img-fluid' src={BuildTeamImage} alt='build-team' />
                </div>
            </div>
        }

        return (
            <div>
                <Cover />
                <div className='container'>
                    <section className='row my-5'>
                        <PrimaryHeading className='col-12 text-center my-5'>Show what you can do!</PrimaryHeading>
                        <div className='col-md-4 p-5 '>
                            <TertiaryHeading className='text-center'>Share skills</TertiaryHeading>
                            <Paragraph className='text-justify'>Earn money every time a student purchases your course.
                             Get paid monthly through PayPal or Payoneer, it’s your choice.</Paragraph>
                        </div>
                        <div className='col-md-4 p-5 '>
                            <TertiaryHeading className='text-center'>Make money</TertiaryHeading>
                            <Paragraph className='text-justify'>Earn money every time a student purchases your course.
                             Get paid monthly through PayPal or Payoneer, it’s your choice.</Paragraph>
                        </div>
                        <div className='col-md-4 p-5 '>
                            <TertiaryHeading className='text-center'>Build Teams</TertiaryHeading>
                            <Paragraph className='text-justify'>Earn money every time a student purchases your course.
                             Get paid monthly through PayPal or Payoneer, it’s your choice.</Paragraph>
                        </div>
                    </section>
                    <section className='row my-5'>
                        <div className='col-md-4  my-5'>
                            <div className='row'>
                                <div className='mx-auto'>
                                    <Button style={{ backgroundColor: 'transparent', color: '#000', borderBottom: '3px solid #01a09b' }}
                                        btnType="Btn-primary Btn-md btn-block"
                                        clicked={this.stepOneHandler}>Develop software</Button>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 my-5'>
                            <div className='row'>
                                <div className='mx-auto'>
                                    <Button style={{ backgroundColor: 'transparent', color: '#000', borderBottom: '3px solid #01a09b' }}
                                        btnType="Btn-primary Btn-md btn-block"
                                        clicked={this.stepTwoHandler}>Upload</Button>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4  my-5'>
                            <div className='row'>
                                <div className='mx-auto'>
                                    <Button style={{ backgroundColor: 'transparent', color: '#000', borderBottom: '3px solid #01a09b' }}
                                        btnType="Btn-primary Btn-md btn-block"
                                        clicked={this.stepThreeHandler}>Build Community</Button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='row my-5 mx-auto'>
                        {step}
                    </section>
                    <section className='row my-5 justify-content-center'>
                        <div className='row col-12 '>
                            <div className='mx-auto'>
                                <PrimaryHeading className='text-center'>Start Selling your projects</PrimaryHeading>
                            </div>
                        </div>
                        <div className='row col-12 my-5'>
                            <div className='mx-auto '>
                                <Button btnType="Btn-primary Btn-lg btn-block" >get started</Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Buying;
