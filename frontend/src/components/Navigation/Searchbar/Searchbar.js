import React, { Component } from 'react';
import axios from '../../../axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Searchbar extends Component {

    state = {
        searchBar: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Search...'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    }

    inputChangedHandler = (event) => {
        const updatedSearchbar = {
            ...this.state.searchBar,

        }
        updatedSearchbar.value = event.target.value;
        this.setState({ searchBar: updatedSearchbar });

    }

    searchHandler = () => {
        // Dispatching search funtion to redux to show loading
        this.props.search(true);

        const q = this.state.searchBar.value;
        axios.get(`/projects/?q=${q}`)
            .then(response => {
                if (response.status === 200) {
                    // Setting loading back to disable after response is fetched

                    this.props.search(false);

                    this.props.history.push({
                        pathname: '/shop',
                        search: `q=${q}`,
                        state: { projects: response.data }
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {

        const landingSearchbarWidth = this.props.landingSearchbar ? '40rem' : null;
        const landingSearchbarHeight = this.props.landingSearchbar ? '5rem' : null;

        return (
            <div
                className="input-group input-group-lg  mb-1"
                style={{ height: landingSearchbarHeight, width: landingSearchbarWidth }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search..."
                    aria-describedby="search-button"
                    onChange={(event) => this.inputChangedHandler(event)} />

                <div className="input-group-append">
                    <button
                        className="Btn-primary Btn-search btn"
                        type="button"
                        id="search-button"
                        onClick={this.searchHandler}>{this.props.landingSearchbar ? 'Search' :
                            <i className="fas fa-search"></i>}
                    </button>
                </div>
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        search: (search) => dispatch(actions.search(search))
    };
}

export default withRouter(connect(null, mapDispatchToProps)(Searchbar));