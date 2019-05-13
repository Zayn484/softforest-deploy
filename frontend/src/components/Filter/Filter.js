import React, { Component } from 'react';
import { Icon, Checkbox } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Button from '../UI/Button/Button';

const CheckboxGroup = Checkbox.Group;

class Filter extends Component {

    state = {
        active: false,
        platformList: [
            { label: 'Desktop', value: 'Desktop', active: false },
            { label: 'Mobile', value: 'Mobile', active: false },
            { label: 'Web', value: 'Web', active: false },
        ],
        technologiesList: [
            { label: 'C++', value: 'C++', active: false },
            { label: 'C#', value: 'C#', active: false },
            { label: 'Java', value: 'Java', active: false },
        ],
        priceList: [
            { label: 'Paid', value: 'Paid', active: false },
            { label: 'Free', value: 'Free', active: false }
        ]
    };

    filterToggleHandler = () => {
        const updatedState = this.state.active;
        this.setState({ active: !updatedState });
    };

    applyHandler = () => {
        this.props.applyFilter(true);
    }

    onChange(checkedValues, type) {
        if (type === 'platform') {
            this.props.platformList(checkedValues);
        }

        if (type === 'technologies') {
            this.props.addTechnologyList(checkedValues);
        }

        if (type === 'price') {
            this.props.addPriceList(checkedValues);
        }

    }

    render() {

        return (

            <div className={(this.state.active ? 'Filter-Open' : 'Filter-Close') + ' Filter row col-12 mx-auto mb-5'}>
                <div className='Filter-Container row col-8'>

                    <div className='Filter-Container__Option col-sm-10 col-md-3'  >
                        <h1 className='Tertiary-Heading'>Platform</h1>
                        <CheckboxGroup
                            className="col-12"
                            options={this.state.platformList}
                            onChange={(checkedValues) => this.onChange(checkedValues, 'platform')} />
                    </div>
                    <div className='Filter-Container__Option col-sm-10 col-md-3 no-gutters ' >
                        <h1 className='Tertiary-Heading'>Technologies</h1>
                        <div className='col-9'>
                            <CheckboxGroup
                                options={this.state.technologiesList}
                                onChange={(checkedValues) => this.onChange(checkedValues, 'technologies')} />
                        </div>
                    </div>
                    <div className='Filter-Container__Option col-sm-10 col-md-3 no-gutters' >
                        <h1 className='Tertiary-Heading'>Price</h1>
                        <div className='col-9'>
                            <CheckboxGroup
                                className="col-12"
                                options={this.state.priceList}
                                onChange={(checkedValues) => this.onChange(checkedValues, 'price')} />
                        </div>
                    </div>
                </div>

                <div className='ml-auto'>
                    <Button btnType="Btn-Apply Btn-primary Btn-sm btn-block ml-auto"
                        clicked={this.applyHandler}>apply</Button>
                    <Button btnType="Btn-Cancel Btn-primary Btn-sm btn-block ml-auto"
                        clicked={this.filterToggleHandler}>cancel</Button>
                </div>

                <Button btnType="Btn-Filter Btn-primary Btn-md btn-block ml-auto mr-5 text-center justify-content-center align-self-center"
                    clicked={this.filterToggleHandler}><Icon type="filter" /> filter</Button>
            </div >

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        platformList: (list) => dispatch(actions.addPlatformFilter(list)),
        addTechnologyList: (list) => dispatch(actions.addTechnologyFilter(list)),
        addPriceList: (list) => dispatch(actions.addPriceFilter(list)),
        applyFilter: (apply) => dispatch(actions.applyFilter(apply))
    }
}

export default connect(null, mapDispatchToProps)(Filter);
