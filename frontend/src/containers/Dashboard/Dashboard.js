import React, { Component } from 'react';


import UpperSection from '../../components/Dashboard/UpperSection/UpperSection';
import LowerSection from '../../components/Dashboard/LowerSection/LowerSection';

const ProfilePicture = require.context('../../assets/img/ProfilePic', true);

class Dashboard extends Component {
    state = {
        ProfilePic: ProfilePicture('./develperDumyProfilePic.png'),
        Name: "KHIZAR",
        Response_rate: '70%',
        Earning: '$500',
        data: null,
    }


    componentWillMount() {
        //Axios Request
        this.setState({
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 50, 3],
                    backgroundColor: [
                        'rgba(255, 0, 255, 0.4)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Khizar',
                    backgroundColor: "rgba(0, 255, 0, 0.4)",
                    data: [12, 18, 4, 10, 2, 3, 4]
                }
                ]
            },
        });
    }

    render() {
        return (
            <section className="Section-Dashboard">
                <div className="Dashboard container">
                    {/* UPPER SECTION */}
                    <UpperSection
                        ProfilePic={this.state.ProfilePic}
                        Name={this.state.Name}
                        Response_rate={this.state.Response_rate}
                        Earning={this.state.Earning}
                        data={this.state.data}
                    />
                    {/* LOWER SECTION */}
                    <LowerSection />
                </div>
            </section>
        );
    }
}

export default Dashboard; 