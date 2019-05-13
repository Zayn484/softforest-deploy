import React from 'react';
import { connect } from 'react-redux';
import { Upload, Button, Icon, message, } from 'antd';
import reqwest from 'axios';
import * as actions from '../../../store/actions/index';

class FileUpload extends React.Component {
    state = {
        videoList: [],
        fileList: [],
        uploading: false,
    }

    componentDidUpdate() {
        if (this.props.video) {
            this.props.addVideo(this.state.fileList[0]);
        }
        if (this.props.file) {
            this.props.addFile(this.state.fileList[0]);
        }
    }

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });

        // You can use any AJAX library you like
        reqwest({
            url: '//jsonplaceholder.typicode.com/posts/',
            method: 'post',
            processData: false,
            data: formData,
            success: () => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('upload successfully.');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('upload failed.');
            },
        });
    }

    render() {
        const { fileList } = this.state;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <div>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Select File
            </Button>
                </Upload>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addVideo: (video) => dispatch(actions.addVideo(video)),
        addFile: (file) => dispatch(actions.addSourceFile(file))
    };
}

export default connect(null, mapDispatchToProps)(FileUpload);