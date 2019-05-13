import React, { Component } from "react";

import validator from "validator";
import axios from "../../axios";
import { connect } from "react-redux";
import { Progress, Modal, message, Select } from "antd";
import SecondaryHeading from "../../components/UI/Headings/SecondaryHeading";
import TertiaryHeading from "../../components/UI/Headings/TertiaryHeading";
import DynamicFieldSet from "../../components/UI/DynamicFormItem/DynamicFormItem";
import FileUpload from "../../components/UI/FileUpload/FileUpload";
import ImagesUpload from "../../components/UI/ImagesUpload/ImagesUpload";
import Button from "../../components/UI/Button/Button";
import TagGroup from "../../components/UI/TagGroup/TagGroup";
import Popover from "../../components/UI/Popover/Popover";
import Input from "../../components/UI/Input/Input";
import DevelperDumyProfilePic from "../../assets/img/ProfilePic/develperDumyProfilePic.png";

message.config({
  top: 100,
  duration: 2,
  maxCount: 3
});

const Option = Select.Option;

class PostProject extends Component {
  state = {
    controls: {
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Cafe Management System"
        },
        value: ""
      },
      price: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "100"
        },
        value: ""
      },
      description: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Description about your project"
        },
        value: ""
      },
      link: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: ""
        },
        value: ""
      },
      category: {
        value: ""
      }
    },
    uploaded: false,
    error: false,
    loading: false,
    visible: false,
    percent: 0,
    user: null,
    id: null,
    image: DevelperDumyProfilePic,
    imageUrl: DevelperDumyProfilePic,
    modules: [],
    technologies: [],
    requirements: [],
    tags: [],
    pricing: {
      serviceFee: 0
    }
  };

  componentDidMount() {
    const user = localStorage.getItem("userId");
    this.setState({ user: user });
  }

  componentDidUpdate() {
    if (this.state.uploaded) {
      console.log("uploaded");
      setTimeout(() => {
        this.props.history.push("/profile");
      }, 1000);
    }
  }

  handleChange(value, controlName) {
    const updateControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: value
      }
    };

    this.setState({ controls: updateControls });
  }

  showModal = () => {
    for (let i = 1; i <= 100; i++) {
      setTimeout(() => {
        if (i === 100) {
          this.setState({ percent: i });
        }
        this.setState({ percent: i });
      }, 2000);
    }

    this.setState({
      visible: true
    });
  };

  validateForm = () => {
    if (!validator.isHalfWidth(this.state.controls.title.value)) {
      message.error("Name field contains only letters and numbers");
      return false;
    }

    if (!validator.isHalfWidth(this.state.controls.description.value)) {
      message.error("Description field contains only letters and numbers");
      return false;
    }

    if (this.props.snapshots.length !== 4) {
      message.error("4 snapshot images are required");
      return false;
    }

    if (
      !validator.isFloat(this.state.controls.price.value, {
        min: 9.99,
        max: 4999.99
      })
    ) {
      message.error("Specify price between 9.99 - 4999.99");
      return false;
    }

    if (this.state.controls.link.value == "") {
      message.error("Please provide link of source files");
      return false;
    }
  };

  inputChangedHandler = (event, controlName) => {
    const updateControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value
      }
    };
    this.setState({
      controls: updateControls,
      pricing: {
        serviceFee: (5 / 100) * updateControls.price.value
      }
    });
  };

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        imageUrl: URL.createObjectURL(event.target.files[0]),
        image: event.target.files[0]
      });
    }
  };

  submitHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.validateForm() === false) {
      return;
    }

    this.showModal();

    //Get data from state
    for (let el = 0; el < this.props.modules.length; el++) {
      const obj = {
        project: this.state.controls.title.value,
        name: this.props.modules[el]
      };
      this.setState({
        modules: this.state.modules.push(obj)
      });
    }
    for (let el = 0; el < this.props.technologies.length; el++) {
      const obj = {
        project: this.state.controls.title.value,
        name: this.props.technologies[el]
      };
      this.setState({
        technologies: this.state.technologies.push(obj)
      });
    }
    for (let el = 0; el < this.props.requirements.length; el++) {
      const obj = {
        project: this.state.controls.title.value,
        name: this.props.requirements[el]
      };
      this.setState({
        requirements: this.state.requirements.push(obj)
      });
    }
    for (let el = 0; el < this.props.tags.length; el++) {
      const obj = {
        project: this.state.controls.title.value,
        title: this.props.tags[el]
      };
      this.setState({
        tags: this.state.tags.push(obj)
      });
    }
    const formData = {};
    for (let el in this.state.controls) {
      formData[el] = this.state.controls[el].value;
      formData["user"] = this.state.user;
      formData["modules"] = this.state.modules;
      formData["technologies"] = this.state.technologies;
      formData["requirements"] = this.state.requirements;
      formData["tags"] = this.state.tags;
      formData["service_fees"] = this.state.pricing.serviceFee.toFixed(2);
    }

    axios
      .post("/projects/", formData)
      .then(response => {
        this.setState({ id: response.data.id });
        setTimeout(this.sendImage, 1000);
      })
      .catch(error => {
        console.log(error);
      });
  };

  sendImage = () => {
    const data = new FormData();
    data.append("project", this.state.id);
    data.append("image", this.state.image);
    axios
      .post(`/projects/${this.state.id}/upload-thumbnail/`, data)
      .then(response => {
        if (response.status === 201) {
          data.delete("image");
          let files = this.props.snapshots;
          data.append("image", files[0]);
          axios
            .post(`/projects/${this.state.id}/upload-snapshot/`, data)
            .then(response => {
              if (response.status === 201) {
                data.delete("image");
                data.append("image", files[1]);
                axios
                  .post(`/projects/${this.state.id}/upload-snapshot/`, data)
                  .then(response => {
                    if (response.status === 201) {
                      data.delete("image");
                      data.append("image", files[2]);
                      axios
                        .post(
                          `/projects/${this.state.id}/upload-snapshot/`,
                          data
                        )
                        .then(response => {
                          if (response.status === 201) {
                            data.delete("image");
                            data.append("image", files[3]);
                            axios
                              .post(
                                `/projects/${this.state.id}/upload-snapshot/`,
                                data
                              )
                              .then(response => {
                                if (response.status === 201) {
                                  data.delete("project");
                                  data.delete("image");
                                  console.log("executing send video function");
                                  this.sendVideo();
                                }
                              })
                              .catch(error => {
                                console.log(error);
                              });
                          }
                        });
                    }
                  });
              }
            });

          // files.map(file => {
          //     if (data.has('image')) {
          //         console.log(data.get('image'));
          //         data.delete('image');
          //     }
          //     data.append('image', file);
          //     console.log(data.get('image'));
          //     axios.post(`http://127.0.0.1:8000/api/projects/${this.state.id}/upload-snapshot/`, data)
          //         .then(response => {
          //             console.log(response.data);
          //         })
          // })
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  sendVideo = () => {
    console.log("sendVideo");
    const data = new FormData();
    data.append("project", this.state.id);
    data.append("video", this.props.video);
    axios
      .post(`/projects/${this.state.id}/upload-video/`, data)
      .then(response => {
        console.log(response);
        if (response.status === 201) {
          console.log(response.data);
          this.sendFile();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  sendFile = () => {
    const data = new FormData();
    data.append("project", this.state.id);
    data.append("file", this.props.file);
    axios
      .post(`/projects/${this.state.id}/upload-file/`, data)
      .then(response => {
        if (response.status === 201) {
          // Clear props
          this.props.modules.length = 0;
          this.props.technologies.length = 0;
          this.props.requirements.length = 0;
          this.setState({ uploaded: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const fomElementArray = [];
    for (let key in this.state.controls) {
      fomElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    return (
      <section className="container">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 ">
              <SecondaryHeading>Upload your project</SecondaryHeading>
              <br />
              <div className="border bg-white d-inline-block px-4 py-2 mb-5">
                <TertiaryHeading>
                  Before you upload, make sure to read our terms.
                </TertiaryHeading>
                <ul>
                  <li>
                    Read the standards and requirements for item(s) you want to
                    sell.
                  </li>
                  <li>Make sure your files are well organized.</li>
                  <li>Always provide complete details about your project.</li>
                </ul>
              </div>
              <form>
                <div className="form-group">
                  <TertiaryHeading>Name and Description</TertiaryHeading>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Name"
                    onChange={event => this.inputChangedHandler(event, "title")}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    rows="8"
                    className="form-control"
                    name="description"
                    placeholder="Write overview of your project..."
                    onChange={event =>
                      this.inputChangedHandler(event, "description")
                    }
                  />
                </div>
              </form>
              <hr />
              <div className="mt-5">
                <TertiaryHeading>Features and Requirements</TertiaryHeading>
                <br />
                <div className="">
                  <label htmlFor="description">Modules</label>
                  <DynamicFieldSet btnLabel="Module" />
                </div>
                <div className="">
                  <label htmlFor="description">Technologies</label>
                  <DynamicFieldSet btnLabel="Technology" />
                </div>
                <div className="">
                  <label htmlFor="description">Requirements</label>
                  <DynamicFieldSet btnLabel="Requirement" />
                </div>
              </div>
              <hr />

              <div className="mt-5">
                <TertiaryHeading>Choose Snapshots</TertiaryHeading>
                <br />
                <ImagesUpload />
              </div>
              <hr />

              <div className="mt-5">
                <TertiaryHeading>Upload Video</TertiaryHeading>
                <br />
                <FileUpload video />
              </div>
              <hr />

              <div className="mt-5">
                <TertiaryHeading>Pricing</TertiaryHeading>
                <br />
                <div className="row">
                  <div className="col-6">
                    <p>Total amount the customers will see on your project</p>
                  </div>
                  <div className="col-4 ml-auto">
                    <input
                      type="text"
                      className="form-control "
                      style={{ textAlign: "right" }}
                      name="price"
                      placeholder="$150.00"
                      onChange={event =>
                        this.inputChangedHandler(event, "price")
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p>
                      SoftForest service fee
                      <Popover
                        placement="right"
                        title={<strong> SoftForest service fee</strong>}
                        content={
                          <div>
                            <p>
                              SoftForest takes 5% of your price as per service
                              charges.
                            </p>
                          </div>
                        }
                      >
                        <strong style={{ cursor: "pointer" }}>
                          &nbsp;&nbsp;Explain
                        </strong>
                      </Popover>
                    </p>
                  </div>
                  <div className="col-4 ml-auto text-right">
                    <p>
                      ${this.state.pricing.serviceFee.toFixed(2)}&nbsp;&nbsp;
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p>Amount you will recieve after service fees</p>
                  </div>
                  <div className="col-4 ml-auto text-right">
                    <p>
                      $
                      {(
                        this.state.controls.price.value -
                        this.state.pricing.serviceFee
                      ).toFixed(2)}
                      &nbsp;&nbsp;
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="mt-5">
                <TertiaryHeading>Category</TertiaryHeading>
                <div className="col-5 mt-5">
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a category"
                    optionFilterProp="children"
                    onChange={value => this.handleChange(value, "category")}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="Desktop">Desktop</Option>
                    <Option value="Mobile">Mobile</Option>
                    <Option value="Web">Web</Option>
                  </Select>
                </div>
              </div>
              <hr />
              <div className="mt-5">
                <TertiaryHeading>Demo</TertiaryHeading>
                <br />
                <p>
                  {" "}
                  You can add demo of your project or skip this
                  <Popover
                    placement="right"
                    title={<strong>Demo files</strong>}
                    content={
                      <div>
                        <p>
                          Upload your files/setup to any cloud based file
                          hosting <br /> service and paste link here.
                        </p>
                      </div>
                    }
                  >
                    <strong style={{ cursor: "pointer" }}>
                      &nbsp;&nbsp;Explain
                    </strong>
                  </Popover>
                </p>
                <Input
                  elementType={this.state.controls.link.elementType}
                  elementConfig={this.state.controls.link.elementConfig}
                  value={this.state.controls.link.value}
                  changed={event => this.inputChangedHandler(event, "link")}
                />
              </div>

              <hr />
              <div className="mt-5">
                <TertiaryHeading>Source files</TertiaryHeading>
                <br />
                <p>Add your source files in .zip format</p>
                <FileUpload file />
              </div>

              <hr />
              <div className="mt-5">
                <TertiaryHeading>Tags</TertiaryHeading>
                <br />
                <TagGroup />
              </div>
            </div>
            <div className="col-md-4 mt-5">
              <TertiaryHeading>Choose Thumbnail</TertiaryHeading>
              <br />
              <div className="input-group mb-3" />
              <div className="text-center">
                <img
                  src={this.state.imageUrl}
                  alt="profile"
                  className="rounded img-fluid profile_img"
                />

                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={this.onImageChange}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    Choose file
                  </label>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={event => this.submitHandler(event)}>
            <div className="form-group mt-5">
              <Button btnType="Btn-primary Btn-md ">Submit</Button>
            </div>
          </form>
          <Modal
            title="Uploading..."
            centered
            visible={this.state.visible}
            footer={null}
          >
            <p className="text-center">
              <Progress
                type="circle"
                percent={this.state.percent}
                className="mx-auto"
              />
            </p>
          </Modal>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    modules: state.dynamicFormItemReducer.modules,
    technologies: state.dynamicFormItemReducer.technologies,
    requirements: state.dynamicFormItemReducer.requirements,
    tags: state.tagReducer.tags,
    snapshots: state.snapShotsReducer.snapshots,
    video: state.videoReducer.video,
    file: state.fileReducer.file
  };
};

export default connect(
  mapStateToProps,
  null
)(PostProject);
