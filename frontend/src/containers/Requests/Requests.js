import React, { Component } from "react";
import { Table, Icon, Tooltip, Divider, Modal } from "antd";
import axios from "../../axios";
import PrimaryHeading from "../../components/UI/Headings/PrimaryHeading";
import Drawer from "../../components/Drawer/Drawer";

const confirm = Modal.confirm;

class Request extends Component {
  state = {
    requests: [],
    record: {},
    loading: false,
    error: null,
    accepted: false,
    visible: false
  };

  componentDidMount() {
    this.fetchRecords();
  }

  fetchRecords = () => {
    this.setState({ loading: true });
    const user = localStorage.getItem("userId");
    const occupation = localStorage.getItem("occupation");
    const token = localStorage.getItem("token");
    setTimeout(() => {
      if (occupation === "buyer") {
        axios
          .get("/modification-requests/", {
            params: {
              user: user
            },
            headers: {
              Authorization: `Token ${token}`
            }
          })
          .then(response => {
            this.setState({
              requests: response.data,
              loading: false,
              error: null
            });
          })
          .catch(error => this.setState({ error: error, loading: false }));
      } else {
        axios
          .get("/modification-requests/", {
            params: {
              developer: user
            },
            headers: {
              Authorization: `Token ${token}`
            }
          })
          .then(response => {
            this.setState({
              requests: response.data,
              loading: false,
              error: null
            });
          })
          .catch(error => this.setState({ error: error, loading: false }));
      }
    }, 1000);
  };

  showDrawer = record => {
    this.setState({ visible: true, record: record });
  };

  onClose = (action, id) => {
    this.setState({
      visible: false
    });

    if (action === "declined") {
      const requests = this.state.requests.filter(x => {
        return x.id !== id;
      });
      this.setState({ requests: requests });
    }
  };

  error() {
    Modal.error({
      title: "Error",
      content: "Something went wrong, please try again!",

      onOk: () => {}
    });
  }

  downloadAttachmentHandler = () => {
    const id = this.state.record.id;
    const user = this.state.record.user;
    axios
      .get(`/modification-requests/attachment-download/${id}/?user=${user}`)
      .then(response => {})
      .catch(error => {
        console.log(error);
      });
  };

  deleteHandler = id => {
    confirm({
      title: "Are you sure to delete this?",
      content: "This operation can not be undo",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      id: id,
      onOk: () => {
        const token = localStorage.getItem("token");
        axios
          .delete(`/modification-requests/${id}/`, {
            headers: {
              Authorization: `Token ${token}`
            }
          })
          .then(res => {
            if (res.status === 204) {
              const requests = this.state.requests.filter(x => {
                return x.id !== id;
              });
              this.setState({ requests: requests, error: null });
            }
          })
          .catch(error => this.setState({ error: error, loading: false }));
      },
      onCancel() {}
    });
  };

  render() {
    const columns = [
      {
        title: "Request",
        dataIndex: "content",
        key: "content",
        render: text => (
          <span>
            {text.substring(0, 90)}
            {text.length > 90 ? "..." : null}{" "}
          </span>
        )
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            {localStorage.getItem("occupation") === "buyer" ? (
              <>
                <span className="text-primary">{record.status}</span>
                <Divider type="vertical" />
                <span
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => this.deleteHandler(record.id)}
                >
                  delete
                </span>
              </>
            ) : (
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => this.showDrawer(record)}
              >
                View
              </span>
            )}
          </span>
        )
      },
      {
        title: (
          <Tooltip title="Reload">
            <Icon
              type="reload"
              style={{ cursor: "pointer" }}
              onClick={this.fetchRecords}
            />
          </Tooltip>
        )
      }
    ];

    return (
      <div className="container bg-white border">
        {this.state.error ? this.error() : null}
        <PrimaryHeading className="mt-2">Requests</PrimaryHeading>
        <Table
          loading={this.state.loading}
          columns={columns}
          dataSource={this.state.requests}
        />

        <Drawer
          visible={this.state.visible}
          onClose={this.onClose}
          record={this.state.record}
          download={() => this.downloadAttachmentHandler()}
        />
      </div>
    );
  }
}

export default Request;
