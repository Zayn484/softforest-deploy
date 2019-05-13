import React from 'react';
import { connect } from 'react-redux';

class Profile extends React.Component {
    render() {
        return (
            <div className="contact-profile">
                <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                <p>{this.props.username}</p>
                <div className="social-media">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.authReducer.username
    }
}

export default connect(mapStateToProps)(Profile);