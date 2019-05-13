import React from 'react';
import axios from '../../../axios';
import { Comment, Avatar, Form, Button, Input, Rate, Progress, message, Modal } from 'antd';
import Comments from '../../Comment/Comment';
import PrimaryHeading from '../../UI/Headings/PrimaryHeading';
import SecondaryHeading from '../../UI/Headings/SecondaryHeading';


message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
});

const TextArea = Input.TextArea;

// const CommentList = ({ comments }) => (
//     <List
//         dataSource={comments}
//         header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//         itemLayout="horizontal"
//         renderItem={props => <Comment {...props} />}
//     />
// );

const Editor = ({
    onChange, onSubmit, submitting, value,
}) => (
        <div>

            <Form.Item>
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    type="primary"
                >
                    Give your feedback
        </Button>
            </Form.Item>
        </div>
    );

class Feedback extends React.Component {
    state = {
        comments: [],
        progress1: 0,
        progress2: 0,
        progress3: 0,
        progress4: 0,
        progress5: 0,
        submitting: false,
        value: '',
        visible: false,
        confirmLoading: false,
        purchased: false
    }

    componentDidMount() {
        const q = this.props.id;
        const user = localStorage.getItem('userId');
        axios.get('/comments/', {
            params: {
                q
            }
        })
            .then(response => {
                if (response.status === 200) {
                    axios.get(`/order/?user=${user}`)
                        .then(response => {
                            const projects = response.data;
                            projects.map(el => {
                                el.project.map(el => {
                                    if (el.id === q) {
                                        this.setState({ purchased: true })
                                    }
                                })

                            })
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
                let avg1, avg2, avg3, avg4, avg5 = 0;
                response.data.map(el => {
                    let sum = 0;
                    if (el.rating >= 4.0 && el.rating <= 5.0) {
                        sum += parseFloat(el.rating);
                        avg1 = sum / response.data.length;
                    }
                    if (el.rating >= 3.0 && el.rating <= 3.9) {
                        sum += parseFloat(el.rating);
                        avg2 = sum / response.data.length;
                    }
                    if (el.rating >= 2.0 && el.rating <= 2.9) {
                        sum += parseFloat(el.rating);
                        avg3 = sum / response.data.length;
                    }
                    if (el.rating >= 1.0 && el.rating <= 1.9) {
                        sum += parseFloat(el.rating);
                        avg4 = sum / response.data.length;
                    }
                    if (el.rating >= 0.0 && el.rating <= 0.9) {
                        sum += parseFloat(el.rating);
                        avg5 = sum / response.data.length;
                    }

                })
                this.setState({
                    comments: response.data,
                    progress1: avg1,
                    progress2: avg2,
                    progress3: avg3,
                    progress4: avg4,
                    progress5: avg5
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    }

    handleSubmit = () => {
        if (localStorage.getItem('userId') === null) {
            message.error('Please login to give feedback');
            return;
        }

        this.showModal();

    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });

        setTimeout(() => {

            const type = 'project';
            const user = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            const slug = this.props.slug;
            const data = {
                content: this.state.value,
                rating: this.state.rating
            }
            axios.post('/comments/create/', data, {
                params: {
                    type,
                    slug,
                    user
                },
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then(response => {
                    if (response.status === 201) {
                        const comments = this.state.comments;
                        comments.push(response.data);
                        this.setState({
                            visible: false,
                            confirmLoading: false,
                            comments: comments,
                            submitting: false,
                            value: ''
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }, 1000);
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    inputChangeHandler = (event) => {
        this.setState({ value: event.target.value });
    }

    ratingChangeHandler = (val) => {
        this.setState({ rating: val });
    }

    deleteHandler = (event, id, index) => {
        setTimeout(() => {
            axios.delete(`/comments/${id}/`)
                .then(response => {
                    if (response.status === 204) {
                        const comments = this.state.comments;
                        comments.splice(index, 1);
                        this.setState({ comments: comments })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }, 500)

    }

    render() {
        const { submitting } = this.state;

        return (
            <section className='Feedback-Section mt-5'>
                <div className=''>
                    <PrimaryHeading >Feedback</PrimaryHeading>
                    <div className='row'>
                        <div className='col-md-2 '>
                            <PrimaryHeading className='text-center'>{this.props.rating}</PrimaryHeading>
                            <span className='ml-3 '>
                                <Rate
                                    style={{ fontSize: '2rem' }}
                                    disabled
                                    allowHalf
                                    defaultValue={+this.props.rating} />
                            </span>
                        </div>

                        <div className='col-md-5 '>
                            <Progress
                                percent={this.state.progress1 / 5.0 * 100}
                                strokeColor='#ccc' />
                            <Progress
                                percent={this.state.progress2 / 5.0 * 100}
                                strokeColor='#ccc' />
                            <Progress
                                percent={this.state.progress3 / 5.0 * 100}
                                strokeColor='#ccc' />
                            <Progress
                                percent={this.state.progress4 / 5.0 * 100}
                                strokeColor='#ccc' />
                            <Progress
                                percent={this.state.progress5 / 5.0 * 100}
                                strokeColor='#ccc' />
                        </div>

                    </div>
                </div>

                <div className='mt-5 '>
                    <SecondaryHeading >Reviews</SecondaryHeading>

                    {this.state.comments.length > 0 ?


                        this.state.comments.map((comment, index) => (
                            <div key={comment.id}>
                                <Comments
                                    content={comment.content}
                                    rating={comment.rating}
                                    author={comment.username}
                                    user={comment.user}
                                    email={comment.email}
                                    timestamp={comment.timestamp}
                                    delete={(event) => this.deleteHandler(event, comment.id, index)} />
                                <hr />
                            </div>
                        ))

                        :
                        null
                    }
                    {/* {comments.length > 0 && <CommentList comments={comments} />} */}
                    {this.state.purchased ?
                        <Comment

                            content={(
                                <Editor

                                    onSubmit={this.handleSubmit}
                                    submitting={submitting}

                                />
                            )}
                        />
                        : null
                    }

                    <Modal
                        title={<h2>Feedback</h2>}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel}
                    >
                        <span style={{ marginLeft: '17rem' }}>
                            <Rate
                                allowHalf
                                defaultValue={0}
                                onChange={(val) => this.ratingChangeHandler(val)} />
                        </span>
                        <br /> <br />
                        <Form.Item>
                            <TextArea
                                rows={4}
                                onChange={(event) => this.inputChangeHandler(event)}
                                value={this.state.value} />
                        </Form.Item>

                    </Modal>
                </div>
            </section>
        );
    }
}

export default Feedback;