import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon } from 'antd';

const { Meta } = Card;


class LoadingCard extends React.Component {
    state = {
        loading: false,
    }

    onChange = (checked) => {
        this.setState({ loading: !checked });
    }

    render() {
        const { loading } = this.state;

        return (
            <div className='mx-auto ' >
                {/* <Switch checked={!loading} onChange={this.onChange} /> */}

                <Card
                    loading={loading}
                    className='Loading-Card'
                    style={{ width: 240, marginTop: 16 }}
                    cover={<div style={{ height: '12rem' }}>
                        <img className='card-img-top img-fluid h-100' alt="thumbnail" src={this.props.thumbnail} /></div>}
                >
                    <Meta
                        title={this.props.title}
                        description={this.props.developer}
                        onClick={this.props.clicked}
                    />
                    <br />
                    <div className='row'>
                        <div className='col-10'>
                            <strong>${this.props.price}</strong>
                        </div>
                        <div className='col-2'>
                            {this.props.occupation === 'seller' ?
                                <Icon
                                    type="delete"
                                    style={{ cursor: 'pointer' }}
                                    onClick={this.props.delete} /> :
                                null
                            }

                        </div>

                    </div>
                </Card>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        occupation: state.authReducer.occupation
    }
}

export default connect(mapStateToProps, null)(LoadingCard);