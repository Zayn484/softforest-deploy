import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import PrimaryHeading from '../../UI/Headings/PrimaryHeading';
import Img from '../../UI/Img/Img';

const images = [];

class AppSnapshot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }

    componentWillMount() {
        this.images = this.props.snapshot;
    }

    render() {
        const { photoIndex, isOpen } = this.state;

        return (
            <>
                <div className="row mt-5 ">
                    <div className="col-md-3">
                        <PrimaryHeading className="">Snapshots</PrimaryHeading>
                    </div>
                    <div className="col-md-9"></div>
                </div>
                <div className="row col-md-10 mt-5 mx-auto no-gutters">

                    {
                        this.props.snapshot.map(item =>
                            <div key={item.image} className="col-md-3  border p-2" onClick={() => this.setState({ isOpen: true })}>
                                <Img src={item.image} alt="App__ScreenShots" className="img-fluid " />
                            </div>
                        )}
                </div>
                {isOpen && (
                    <Lightbox
                        mainSrc={this.images[photoIndex].image}
                        nextSrc={this.images[(photoIndex + 1) % this.images.length]}
                        prevSrc={this.images[(photoIndex + this.images.length - 1) % this.images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + this.images.length - 1) % this.images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % this.images.length,
                            })
                        }
                    />
                )}
            </>
        )
    }
}

export default AppSnapshot;