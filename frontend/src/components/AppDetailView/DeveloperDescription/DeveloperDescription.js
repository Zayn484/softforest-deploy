import React, { Component } from 'react';

import Button from '../../UI/Button/Button';
import Img from '../../UI/Img/Img';
import PrimaryHeading from '../../UI/Headings/PrimaryHeading';
import SecondaryHeading from '../../UI/Headings/SecondaryHeading';
import TertiaryHeading from '../../UI/Headings/TertiaryHeading';
import Paragraph from '../../UI/Paragraph/Paragraph';

class DeveloperDescription extends Component {

    profileSelectHandler = (username) => {
        this.props.routeProps.history.push({ pathname: '/profile/' + username });
    }

    requestHandler = () => {
        const data = {
            slug: this.props.slug,
            developerId: this.props.developerDescription.id
        }
        this.props.routeProps.history.push({
            pathname: '/request-form',
            state: data
        });
    }

    render() {
        return (
            <>
                <div className="row mt-5">
                    <div className="col-md-3">
                        <PrimaryHeading>Developer</PrimaryHeading>
                    </div>
                    <div className="col-md-9"></div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-3 text-center">
                        <div className="App__ImageBox">
                            <Img src={this.props.developerDescription.image}
                                alt="ProfilePic"
                                className="App__ProfilePic img-fluid img-thumbnail" />
                        </div>
                    </div>
                    <div className="Developer-Description col-md-5 mt-5 text-center mt-md-0 text-md-left"
                        onClick={() => this.profileSelectHandler(this.props.developerDescription.username)}>
                        <SecondaryHeading>{this.props.developerDescription.profileName}</SecondaryHeading>
                        <TertiaryHeading>{this.props.developerDescription.profileTitle}</TertiaryHeading>
                        <Paragraph>{this.props.developerDescription.overview}</Paragraph>
                    </div>

                    <div className="col-md-4 my-auto p-1" >
                        <Button
                            btnType="Btn-lg d-block Btn-primary btn-block"
                            clicked={this.requestHandler} >Request For Modification</Button>
                    </div>
                </div>

            </>
        )
    }
}

export default DeveloperDescription;