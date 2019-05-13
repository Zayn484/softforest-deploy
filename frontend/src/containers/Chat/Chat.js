import React from "react";
import { connect } from "react-redux";
import SidePanel from "./Sidepanel";
import WebSocketInstance from "../../websocket";

class Chat extends React.Component {
  state = {
    message: ""
  };

  initializeChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(
        this.setMessages.bind(this),
        this.addMessage.bind(this)
      );
      WebSocketInstance.fetchMessages(
        this.props.username,
        this.props.match.params.id
      );
    });

    // Get chat id from url path
    if (this.props.match.params.id) {
      WebSocketInstance.connect(this.props.match.params.id);
    } else {
      WebSocketInstance.connect(null);
    }
  }

  constructor(props) {
    super(props);
    this.initializeChat();
  }

  scrollToBottom = () => {
    // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      WebSocketInstance.disconnect();
      this.waitForSocketConnection(() => {
        WebSocketInstance.fetchMessages(
          this.props.username,
          newProps.match.params.id
        );
      });

      // Get chat id from url path
      WebSocketInstance.connect(newProps.match.params.id);
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    WebSocketInstance.disconnect();
    window.location.reload();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  waitForSocketConnection(callback) {
    const component = this;

    setTimeout(function() {
      if (WebSocketInstance.state() === 1) {
        callback();
        return;
      } else {
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  addMessage(message) {
    this.setState({ messages: [...this.state.messages, message] });
  }

  setMessages(messages) {
    this.setState({ messages: messages.reverse() });
  }

  sendMessageHandler = event => {
    event.preventDefault();
    const messageObject = {
      from: this.props.username,
      content: this.state.message,
      chatId: this.props.match.params.id
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({ message: "" });
  };

  messageChangeHandler = event => {
    this.setState({ message: event.target.value });
  };

  renderTimestamp = timestamp => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff < 60 && timeDiff > 1) {
      // less than 60 mintes ago
      prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hours ago`;
    } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
      // less than 7 days ago
      prefix = `${Math.round((timeDiff / 60) * 24)} days ago`;
    } else {
      prefix = `${new Date(timestamp)}`;
    }
    return prefix;
  };

  renderMessages = messages => {
    const currentUser = this.props.username;

    return messages.map((message, i, arr) => (
      <div
        key={message.id}
        className={
          message.author === currentUser ? "outgoing_msg" : "incoming_msg"
        }
      >
        <div
          className={
            message.author === currentUser ? "sent_msg" : "received_msg"
          }
        >
          <p>{message.content}</p>
          <span className="time_date">
            {this.renderTimestamp(message.timestamp)}
          </span>
        </div>
      </div>
    ));
  };

  render() {
    const messages = this.state.messages;

    return (
      <div className="Chat-Container">
        <div className="messaging">
          <div className="inbox_msg">
            <SidePanel />

            <div className="mesgs">
              <div className="msg_history">
                {messages && this.renderMessages(messages)}
                <div
                  style={{ float: "left", clear: "both" }}
                  ref={el => {
                    this.messagesEnd = el;
                  }}
                />
              </div>

              <div className="type_msg">
                <div className="input_msg_write">
                  <input
                    type="text"
                    className="write_msg"
                    placeholder="Type a message"
                    onChange={this.messageChangeHandler}
                    value={this.state.message}
                  />

                  <button
                    className="msg_send_btn"
                    type="button"
                    onClick={this.sendMessageHandler}
                  >
                    <i className="fas fa-paper-plane" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.authReducer.username
  };
};

export default connect(mapStateToProps)(Chat);
