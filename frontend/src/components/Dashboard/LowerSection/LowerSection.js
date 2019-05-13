import React from 'react';

import Calendar from '../Calender/Calender';
import Table from '../Table/Table';

const lowerSection = () => (
    <div className="row Lower-section align-items-center">
        <div className="Dashboard__Calender col-md-4">
            <div className="Dashboard__Calender__Container pt-5 pb-5  pl-sm-3 pl-md-0">
                <div className="ml-sm-5 p-5 py-md-4 px-md-0 ml-md-0 ">
                    <Calendar />
                </div>
            </div>
        </div>

        <div className="Dashboard__ProjectTable col-md-7 ml-md-5 mt-sm-5 mt-md-0 ">
            <div className="Dashboard__ProjectTable__Container">
                <Table />
            </div>
        </div>
    </div>

);

export default lowerSection;