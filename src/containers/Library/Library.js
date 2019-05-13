import React from "react";
import { Table, Input, Button, Icon } from "antd";
import axios from "../../axios";
import Highlighter from "react-highlight-words";
import PrimaryHeading from "../../components/UI/Headings/PrimaryHeading";

class Library extends React.Component {
  state = {
    searchText: "",
    projects: []
  };

  componentDidMount() {
    const user = localStorage.getItem("userId");
    axios.get(`/order/?user=${user}`).then(response => {
      let projects = [];
      response.data.map(el =>
        el.project.map(el =>
          projects.push({
            key: el.id,
            name: el.title,
            file: el.file[0].file,
            id: el.file[0].id,
            slug: el.file[0].slug
          })
        )
      );

      this.setState({ projects: projects });
    });
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  downloadFileHandler = record => {
    const id = record.id;
    const slug = record.slug;
    axios
      .get(`/project-download/${id}/?slug=${slug}`)
      .then(response => {})
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const columns = [
      {
        title: "Project",
        dataIndex: "name",
        key: "name",
        render: text => <span>{text}</span>
      },
      {
        title: "File",
        key: "file",
        render: (text, record) => (
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => this.downloadFileHandler(record)}
          >
            Download
          </span>
        )
      }
    ];

    return (
      <div className="container bg-white border">
        <PrimaryHeading className="mt-2">Library</PrimaryHeading>
        <Table columns={columns} dataSource={this.state.projects} />
      </div>
    );
  }
}

export default Library;
