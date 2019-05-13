import React from "react";
import { Drawer, Divider, Col, Row, Tooltip, Icon, Button } from "antd";
import axios from "../../axios";
import moment from "moment";
import CustomButton from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";

const pStyle = {
  fontSize: 16,
  color: "rgba(0,0,0,0.85)",
  lineHeight: "24px",
  display: "block",
  marginBottom: 16
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: "22px",
      marginBottom: 7,
      color: "rgba(0,0,0,0.65)"
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: "inline-block",
        color: "rgba(0,0,0,0.85)"
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

class DetailDrawer extends React.Component {
  state = {
    record: {},
    loaded: false,
    accepted: false,
    declined: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    this.setState({ loaded: true });
  }

  acceptHandler = () => {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");
    const data = {
      status: "accepted"
    };
    setTimeout(() => {
      axios
        .patch(`/modification-requests/${this.props.record.id}/`, data, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        .then(response => {
          if (response.data.status === "accepted") {
            this.setState({ accepted: true, loading: false });
          }
        })
        .catch(error => this.setState({ error: error, loading: false }));
    }, 1000);
  };

  declineHandler = () => {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");
    const data = {
      status: "declined"
    };
    setTimeout(() => {
      axios
        .patch(`/modification-requests/${this.props.record.id}/`, data, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        .then(response => {
          if (response.data.status === "declined") {
            this.setState({ loading: false });
            if (this.state.loading === false) {
              this.props.onClose("declined", response.data.id);
            }
          }
        })
        .catch(error => this.setState({ error: error, loading: false }));
    }, 1000);
  };

  render() {
    let drawer = null;

    if (this.state.loaded) {
      drawer = (
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.visible}
        >
          <div style={{ marginTop: "9.4rem" }} />
          <p style={pStyle}>Request Detail</p>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Sender"
                content={this.props.record.username}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Date"
                content={
                  <Tooltip
                    title={moment(this.props.record.timestamp).format(
                      "HH:mm:ss"
                    )}
                  >
                    <span>
                      {moment(this.props.record.timestamp).format("MM-DD-YYYY")}
                    </span>
                  </Tooltip>
                }
              />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Days" content={this.props.record.days} />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Budget"
                content={"$" + this.props.record.budget}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Description"
                content={this.props.record.content}
              />
            </Col>
            <Col span={24}>
              <DescriptionItem
                title="Attachment"
                content={
                  <CustomButton
                    btnType=" Btn-md btn-block bg-transparent text-primary mx-auto"
                    clicked={this.props.download}
                  >
                    download
                  </CustomButton>
                }
              />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle}>Response</p>
          <Row className="text-center ">
            {this.state.accepted || this.props.record.status === "accepted" ? (
              <h2>
                <Icon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#05C0BA"
                />
                &nbsp;&nbsp;Accepted
              </h2>
            ) : (
              <>
                {this.state.loading ? (
                  <Spinner />
                ) : (
                  <>
                    <Col span={11}>
                      <CustomButton
                        btnType="Btn-primary Btn-md btn-block mx-auto"
                        clicked={this.acceptHandler}
                      >
                        accept
                      </CustomButton>
                    </Col>
                    <Col span={11}>
                      <CustomButton
                        btnType=" Btn-md btn-block bg-transparent border text-danger mx-auto"
                        clicked={this.declineHandler}
                      >
                        decline
                      </CustomButton>
                    </Col>
                  </>
                )}
              </>
            )}
          </Row>
        </Drawer>
      );
    }

    return <>{drawer}</>;
  }
}

export default DetailDrawer;
