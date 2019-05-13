import React from 'react';
import { Link } from 'react-router-dom';
import SecondaryHeading from '../UI/Headings/SecondaryHeading';
import TertiaryHeading from '../UI/Headings/TertiaryHeading';
import Img from '../UI/Img/Img';

const profile = (props) => (
    <div className="Dashboard__Profile__Container " >
        <div className="Dashboard__Profile--Upper " onClick={props.clicked}>
            <div className="Dashboard__PicBox mx-auto">
                <Img src={props.ProfilePic} alt="Profile_Pic" className="Dashboard__ProfilePic img-fluid rounded-circle" />
            </div>
            <SecondaryHeading className="Dashboard__Profile__Name pt-2">{props.Name}</SecondaryHeading>
        </div>
        <div className="Dashboard__Profile--Lower ">
            <div className="row">
                <div className="col-8">
                    <TertiaryHeading>Sales</TertiaryHeading>
                </div>
                <div className="col-4 text-right">
                    <TertiaryHeading className="">{props.sales}</TertiaryHeading>
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <TertiaryHeading>Balance</TertiaryHeading>
                </div>
                <div className="col-4 text-right">
                    <TertiaryHeading className="">{props.balance}</TertiaryHeading>
                </div>
            </div>
            <div className="row">
                <div className="col-7">
                    <TertiaryHeading>Upload project</TertiaryHeading>
                </div>
                <div className="col-5 text-right">
                    <TertiaryHeading><Link to="/post-project" >Create</Link></TertiaryHeading>
                </div>
            </div>
        </div>
    </div>

);

export default profile;