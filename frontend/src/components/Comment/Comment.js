import React from 'react';
import { Comment, Tooltip, Rate } from 'antd';
import moment from 'moment';
import Gravatar from 'react-gravatar';

class CommentView extends React.Component {

    state = {
        user: null
    }

    componentDidMount() {
        this.setState({ user: localStorage.getItem('userId') });
    }

    render() {

        const actions = [
        ];

        return (
            <Comment
                actions={actions}
                author={this.props.author}
                avatar={(
                    <Gravatar email={this.props.email} />
                )}
                content={(
                    <>
                        <p>{this.props.content}</p>
                        <Rate
                            style={{ fontSize: '1.2rem' }}
                            disabled
                            allowHalf
                            defaultValue={+this.props.rating} />
                    </>
                )}
                datetime={(
                    <Tooltip title={moment(this.props.timestamp).format('HH:mm:ss')}>
                        <span>{moment(this.props.timestamp).format('MM-DD-YYYY')}</span>
                    </Tooltip>
                )
                }

            />
        );
    }
}

export default CommentView;