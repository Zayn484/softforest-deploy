import React, { Component } from 'react';

import Img from '../UI/Img/Img';
import PrimaryHeading from '../UI/Headings/PrimaryHeading';
import secondaryHeading from '../UI/Headings/SecondaryHeading';
import TertiaryHeading from '../UI/Headings//TertiaryHeading';
import Input from '../../components/UI/Input/Input';

const DumyImages = require.context('../../assets/img/DumyImages', true);
let imgsrc;
class Post extends Component {
    state = {
        img: DumyImages('./baseline-video_library-24px@2x.png'),
        lp: DumyImages('./Statistic-chart.jpg'),
        Image: null,
        controls: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title'
                },
                value: ''
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'Software Description'
                },
                value: ''
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Price in USD'
                },
                value: ''
            }
        }
    }

    imgHandler = (event) => {
        this.setState({
            Image: event.target.files[0]
        });
    };

    inputChangedHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
            }
        };
        this.setState({ controls: updateControls });
    };

    submitHandler = (event) => {
        event.preventDefault();

    };


    render() {
        const fomElementArray = [];
        for (let key in this.state.controls) {
            fomElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = fomElementArray.map(formElemet => (
            <div className="form-group">
                <TertiaryHeading style={{ textTransform: 'capitalize' }}>{formElemet.id}</TertiaryHeading>
                <Input elementType={formElemet.config.elementType}
                    elementConfig={formElemet.config.elementConfig}
                    value={formElemet.config.value}
                    key={formElemet.id}
                    ClassName="p-3"
                    changed={(event) => this.inputChangedHandler(event, formElemet.id)} label={formElemet.config.elementConfig.placeholder}
                />
            </div>
        ));
        let imgsrc = (
            <div className="mt-5 pt-5" style={{ height: '20rem' }}>
                <i className="fas fa-10x fa-plus-circle"></i>
            </div>
        );
        if (this.state.Image) {
            imgsrc = <img src={this.state.Image} style={{ height: '20rem' }} className="img-fluid img-thumbnail" />
        }
        return (
            <section className="Section-Post">
                <div className="container">
                    <form onSubmit={(event) => this.submitHandler(event)}>
                        <div className="row">
                            <div className="col-9">
                                {form}
                                <div className="form-group">
                                    <TertiaryHeading>App Modules</TertiaryHeading>
                                    <input type="text" className="form-control mt-2" placeholder="Module #1" />
                                    <input type="text" className="form-control mt-2" placeholder="Module #2" />
                                    <input type="text" className="form-control mt-2" placeholder="Module #3" />
                                </div>
                                <div className="form-group">
                                    <TertiaryHeading>App Technologies</TertiaryHeading>
                                    <input type="text" className="form-control mt-2" placeholder="Technology #1" />
                                    <input type="text" className="form-control mt-2" placeholder="Technology #2" />
                                    <input type="text" className="form-control mt-2" placeholder="Technology #3" />
                                </div>
                                <div className="form-group">
                                    <TertiaryHeading>App Requirements</TertiaryHeading>
                                    <input type="text" className="form-control mt-2" placeholder="Requirement #1" />
                                    <input type="text" className="form-control mt-2" placeholder="Requirement #2" />
                                </div>
                            </div>
                            <div className="col-3">
                                {/* <div className="text-center p-4">
                                    <div className="App__ImageBox">
                                        <Img src={this.state.lp} alt="ProfilePic" className="App__AppPic img-fluid" />
                                    </div>
                                </div> */}
                                <div className="row" >
                                    <div className=" col-12">
                                        <div className="row mt-5">
                                            <div className="col-12" >
                                                <div className="text-center border">
                                                    {imgsrc}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <input type="file"
                                        onChange={this.imgHandler}
                                        className="form-control p-3" />
                                </div>
                            </div>
                        </div>
                        {/* <div className="">
                            <PrimaryHeading className="row col-12">App Introduction</PrimaryHeading>
                            <div className="row App_Introduction mt-3" >

                                <div className="App_Introduction__Snapshots col-9">
                                    <div className="row px-5" style={{ height: '25rem' }}>
                                        <div className="col-3 bg-danger" >
                                            <div className="text-center mt-5 pt-5">
                                                <i class="fas fa-10x fa-plus-circle"></i>
                                            </div>
                                        </div>
                                        <div className="col-3 bg-success " >
                                            <div className="text-center mt-5 pt-5">
                                                <i class="fas fa-10x fa-plus-circle"></i>
                                            </div>
                                        </div>
                                        <div className="col-3 bg-primary " >
                                            <div className="text-center mt-5 pt-5">
                                                <i class="fas fa-10x fa-plus-circle"></i>
                                            </div>
                                        </div>
                                        <div className="col-3 bg-warning " >
                                            <div className="text-center mt-5 pt-5">
                                                <i class="fas fa-10x fa-plus-circle"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="App_Introduction__Upload col-3" >
                                    <div className="row px-5" style={{ height: '25rem' }}>
                                        <div className="col-12 bg-danger" >
                                            <div className="text-center mt-5 pt-5">
                                                <i class="fas fa-10x fa-plus-circle"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="row">
                            <div className="col-9">
                                <input type="file" className="form-control p-3" placeholder="Title" />
                            </div>
                        </div> */}
                        <button type="submit" className="btn btn-primary Btn-lg mt-5">Submit</button>
                    </form>
                </div>

            </section>

        );
    }
}

export default Post;