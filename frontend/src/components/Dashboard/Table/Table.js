import React from "react";
import { Table } from 'reactstrap';
import SecondaryHeading from '../../UI/Headings/SecondaryHeading';
import TertiaryHeading from '../../UI/Headings/TertiaryHeading';
const table=(props)=>(
<>
    <SecondaryHeading className="mb-5">Top Projects</SecondaryHeading>
    <Table hover responsive className="text-center Table">
        <thead>
            <tr style={{ backgroundColor: '#F5F6FA', fontSize: '1.5rem' }}>
            <th>Project</th>
            <th>Price</th>
            <th>Catagory</th>
            </tr>
        </thead>
        <tbody>
            <tr style={{ fontSize: '1.5rem' }}>
            <td>SoftForest</td>
            <td>$500</td>
            <td>E-Commerce</td>
            </tr>
            <tr style={{ fontSize: '1.5rem' }}>
            <td>SoftForest</td>
            <td>$500</td>
            <td>E-Commerce</td>
            </tr>
            <tr style={{ fontSize: '1.5rem' }}>
            <td>SoftForest</td>
            <td>$500</td>
            <td>E-Commerce</td>
            </tr>
            <tr style={{ fontSize: '1.5rem' }}>
            <td>SoftForest</td>
            <td>$500</td>
            <td>E-Commerce</td>
            </tr>
        </tbody>
    </Table>
    <div className="text-center">
    <TertiaryHeading><a href="/"> See All</a></TertiaryHeading>
    </div>
</>
)

export default table;