import React from 'react';
import { Modal } from 'antd';

class AsyncModal extends React.Component {
    render() {
        return (
            <Modal
                centered={true}
                title="Update Details"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                confirmLoading={this.props.confirmLoading}
                onCancel={this.props.handleCancel}
            >
                <p>{this.props.children}</p>
            </Modal>
        );
    }
}

export default AsyncModal;
