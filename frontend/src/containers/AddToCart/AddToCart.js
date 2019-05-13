import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import CartItem from '../../components/CartItem/CartItem';
import { Modal } from 'antd';
import { Empty } from 'antd';
import * as actions from '../../store/actions/index';

const confirm = Modal.confirm;

class AddToCart extends Component {

    state = {
        cart: [],
        loading: true,
        totalPrice: 0,
        status: false,
    }

    componentWillMount() {
        //console.log(` Will Mount ${this.props.userId}`);
        if (this.props.token && this.props.userId) {
            axios.get(`http://127.0.0.1:8000/api/cart-details/${this.props.userId}/`)
                .then(response => {
                    let total = Math.round(response.data.total);
                    this.setState({ cart: response.data.projects, loading: false, totalPrice: total });
                })
                .catch(error => console.log(error));
        }
    }


    deleteHandler = () => {
        console.log(this.state.check);
    }

    showConfirm = (event, id, title) => {
        confirm({
            title: 'Are you sure?',
            content: title,
            onOk: () => {
                const project = [...this.props.check.projects];
                const projectDetail = [...this.state.cart];
                let index = project.indexOf(id);
                let deletePrice = Math.round(projectDetail[index].price);
                project.splice(index, 1);
                projectDetail.splice(index, 1);
                const data = {
                    ...this.props.check,
                    projects: project
                }

                axios.patch(`http://127.0.0.1:8000/api/cart/${this.props.userId}/`, data)
                    .then(res => {
                        this.props.onCheckToCart(this.props.userId, 0);
                        this.setState({ status: true, cart: projectDetail, check: data, totalPrice: this.state.totalPrice - deletePrice });
                    })
                    .catch(err => console.log(err))
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onCheckout = () => {
        const data = {
            cart_id: this.props.cart_id,
            cart: this.state.cart,
            totalPrice: this.state.totalPrice
        }

        if (data.cart.length === 0) {
            return;
        }
        else {
            this.props.history.push(
                {
                    pathname: '/order',
                    search: '',
                    state: data
                }
            );
        }

    }

    render() {
        const result = this.state.cart.map(res => {
            return (
                <CartItem key={res.id}
                    src={res.image}
                    title={res.title}
                    description={res.description}
                    price={res.price}
                    delete={(event) => this.showConfirm(event, res.id, res.title)} />

            );
        })

        let data = <div className='mx-auto'><Spinner /></div>
        if (!this.state.loading && this.state.cart.length != 0) {
            data = (
                <>
                    {result}

                    < h1 className='ml-auto mt-4' > Total < strong > ${Math.round(this.state.totalPrice)}</strong ></h1 >
                </>
            );

        }
        else if (this.state.cart.length == 0) {
            data = <Empty />
        }
        return (
            <section className="container">
                <div className='container'>

                    <div className='d-md-flex flex-md-row'>
                        <div className='row  border d-flex col-md-7  '>
                            <div className='row col-12'>
                                <h1 className=''>Your cart</h1>
                            </div>
                            <div className='row col-12 '>
                                {data}
                            </div>

                        </div>
                        <div className='d-flex col-md-1 '>

                        </div>
                        <div className='row col-md-3 border mr-auto text-center bg-white'
                            style={{ height: '20rem' }}>
                            <h1 className='col-12 mt-3'>Your cart total</h1>
                            <h1 className='col-12'>${Math.round(this.state.totalPrice)}</h1>
                            <Button
                                btnType="Btn-primary Btn-md btn-block mx-auto d-block"
                                clicked={this.onCheckout} >Checkout</Button>
                            {this.state.cart.length === 0 ?
                                <div className='col-12'>
                                    <span className='text-danger'>Please add items in order to checkout</span>
                                </div>
                                :
                                null
                            }

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.authReducer.userId,
        token: state.authReducer.token,
        check: state.cartReducer.check,
        cart_id: state.cartReducer.check.id
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onCheckToCart: (userId, softwareId) => dispatch(actions.checkToCart(userId, softwareId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);