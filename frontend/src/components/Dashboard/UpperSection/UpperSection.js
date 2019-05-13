import React from 'react';

import SecondaryHeading from '../../UI/Headings/SecondaryHeading';
import Profile from '../../Profile/Profile';
import Chart from '../Chart/Chart';
const upperSection = (props) => (
    <div className="row">
        <div className="Dashboard__Profile col-md-4">
            <Profile {...props} />
        </div>
        <div className="Dashboard__Statistics col-md-7 ml-md-5 mt-sm-5 mt-md-0">
            <div className="Dashboard__Statistics__Container">
                <div className="Dashboard__Statistics--Upper row">
                    <div className="col-10 col-sm-10 col-md-10">
                        <SecondaryHeading>Statistics</SecondaryHeading>
                    </div>
                    <div className="col-2 col-sm-2 col-md-2">
                        <select>
                            <option>Last 6 Month</option>
                            <option>Last 7 Month</option>
                        </select>
                    </div>
                </div>

                <div className="Dashboard__Statistics--Lower row">
                    <div className="Dashboard__Statistics__GraphBox col-md-12">
                        <Chart data={props.data} legendPosition="bottom" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default upperSection;