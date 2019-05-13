import React, { Component } from 'react';
import axios from '../../axios';
import LandingCover from '../../components/LandingCover/LandingCover';
import BuildTeamSection from '../../components/BuildTeamSection/BuildTeamSection';
import GetRecommendations from '../../components/GetRecommendations/GetRecommendations';
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection';
import OptionSection from '../../components/OptionSection/OptionSection';
import HorizontalScrollBar from '../HorizontalScrollBar/HorizontalScrollBar';
import HeadingPrimary from '../../components/UI/Headings/PrimaryHeading';
import Spinner from '../../components/UI/Spinner/Spinner';

class Home extends Component {

    state = {
        active: false,
        loaded: false,
        list1: [],
        list2: [],
        ulClick1: true,
        ulClick2: false,
        ulClick3: false,
    };

    componentDidMount() {
        this.fetchProjects('desktop');
    }

    fetchProjects = (category) => {
        this.setState({ loaded: false })
        setTimeout(() => {
            axios.get(`/projects-cards/?q=${category}`)
                .then(response => {
                    if (response.status === 200) {
                        this.setState({ list1: response.data });
                        axios.get('/projects-cards/?q=top-projects')
                            .then(response => {
                                this.setState({ list2: response.data, loaded: true });
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }, 1000)
    }

    handler = () => {
        this.setState({ active: true });
    };

    ulhandler = key => {
        switch (key) {
            case 1:
                this.setState({ ulClick1: true, ulClick2: false, ulClick3: false });
                this.fetchProjects('desktop');
                break;
            case 2:
                this.setState({ category: 'mobile', ulClick1: false, ulClick2: true, ulClick3: false });
                this.fetchProjects('mobile');
                break;
            case 3:
                this.setState({ category: 'web', ulClick1: false, ulClick2: false, ulClick3: true });
                this.fetchProjects('web');
                break;
            default:
                return;
        }
    };

    render() {

        const list = (
            <ul className="nav justify-content-center">
                <li className={(this.state.ulClick1 ? 'active ' : '') + 'nav-item p-2'} onClick={() => this.ulhandler(1)}>
                    Desktop
            </li>
                <li className={(this.state.ulClick2 ? 'active ' : '') + 'nav-item p-2'} onClick={() => this.ulhandler(2)}>
                    Mobile
            </li>
                <li className={(this.state.ulClick3 ? 'active ' : '') + 'nav-item p-2'} onClick={() => this.ulhandler(3)}>
                    Web
            </li>
            </ul>
        );

        return (
            <>
                <LandingCover />
                {this.state.loaded ?
                    <>
                        <HorizontalScrollBar
                            list={this.state.list1}
                            content={false}
                            routeProps={this.props} >{list}
                        </HorizontalScrollBar>
                        <HorizontalScrollBar list={this.state.list2} content={true} >
                            <HeadingPrimary>Top Rated Projects</HeadingPrimary>
                        </HorizontalScrollBar>
                    </> :
                    <Spinner />
                }

                <BuildTeamSection />
                <GetRecommendations />
                <BenefitsSection />
                <OptionSection />
            </>
        );
    }
}

export default Home;