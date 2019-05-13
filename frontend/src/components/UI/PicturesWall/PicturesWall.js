import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };


    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    setSnapshotProps = () => {

        this.props.addSnapshot(this.state.fileList);
    }

    handleChange = ({ fileList, file }) => {
        if (file.percent === 100) {
            return this.setState({ fileList: [...fileList] })
        }
        else {
            return this.setState({ fileList })
        }

    }


    onRemove = () => {

    }

    defaultFileList = () => {

    }

    handleUploaderChange = ({ file, fileList }) => {
        if (file.percent === 100) {
            this.props.addSnapshot(file);

        }

        this.setState({ fileList: [...fileList] });
    };


    handleProgress = (event, file) => {
        let { fileList } = this.state;
        fileList = fileList.map(item => {
            if (item.uid === file.uid) {
                item.percent = event.percent;
            }
            return item;
        });
        this.setState({ fileList });
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onRemove={this.onRemove}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSnapshot: (file) => dispatch(actions.addFile(file))
    };
}

export default connect(null, mapDispatchToProps)(PicturesWall);