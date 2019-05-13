import React from 'react';
import ImageUploader from 'react-images-upload';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class ImagesUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    setSnapshotProps = () => {

        this.props.addSnapshot(this.state.pictures);
    }

    onDrop = (picture, name) => {
        this.setState({
            pictures: picture
        })

        setTimeout(this.setSnapshotProps, 1000);
    }


    // onDrop(picture) {

    //     // console.log(pictures)
    //     // this.setState({
    //     //     pictures: this.state.pictures.concat(picture),
    //     // });
    //     // if (picture.length === 0) {
    //     //     this.setState({
    //     //         pictures: this.state.pictures.pop(),
    //     //     });
    //     // }
    //     // console.log(picture.slice(-1)[0])
    //     // if (picture.length > 0) {
    //     //     console.log(picture[picture.length - 1])
    //     // }
    //     // this.setState({
    //     //     pictures: this.state.pictures.concat(picture.slice(-1)[0]),
    //     // });
    //     // this.setState({
    //     //     pictures
    //     // });

    //     setTimeout(this.setSnapshotProps, 2000);
    // }



    render() {
        return (
            <ImageUploader
                label='Max file size: 2mb, accepted: jpg/png'
                withPreview={true}
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.png']}
                maxFileSize={2242880}
            />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSnapshot: (fileList) => dispatch(actions.addFile(fileList))
    };
}

export default connect(null, mapDispatchToProps)(ImagesUpload);