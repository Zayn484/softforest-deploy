import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Contact from '../../components/Contact/Contact';

class SidePanel extends React.Component {

    state = {
        chats: []
    }

    componentDidMount() {
        console.log(this.state.chats);
        if (this.props.token !== null && this.props.username !== null) {
            this.getUserChats(this.props.token, this.props.username);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== null && newProps.username !== null) {
            this.getUserChats(newProps.token, newProps.username);
        }
    }

    getUserChats = (token, username) => {
        axios.defaults.headers = {
            "Content-Type": "application.json",
            Authorization: `Token ${token}`
        }

        axios.get(`http://127.0.0.1:8000/api/chat/?username=${username}`)
            .then(response => {

                this.setState({ chats: response.data });
            })
    }

    render() {

        const activeChats = this.state.chats.map(chat => {
            return (
                chat.participants.map(participant => {
                    if (participant.user !== +this.props.userId) {
                        return (
                            <Contact
                                key={participant.user}
                                name={participant.username}
                                status="online"
                                picUrl="http://emilcarlsson.se/assets/louislitt.png"
                                chatUrl={`/messages/${chat.id}`} />
                        )
                    }

                })
            )
        })

        return (
            <div className="inbox_people">
                <div className="headind_srch">
                    <div className="recent_heading">
                        <h4>Recent</h4>
                    </div>
                    <div className="srch_bar">
                        <div className="stylish-input-group">
                            <input type="text" className="search-bar" placeholder="Search" />
                            <span className="input-group-addon">
                                <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                            </span> </div>
                    </div>
                </div>
                <div className="inbox_chat">

                    {activeChats}

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.authReducer.userId,
        username: state.authReducer.username,
        token: state.authReducer.token
    }
}

export default connect(mapStateToProps)(SidePanel);