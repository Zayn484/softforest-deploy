import React from 'react';

import { Link } from 'react-router-dom';

import Button from '../UI/Button/Button';

const optionSecton = (props) => (
    <section className='Content Option-Section'>
        <div className='container row h-100 mx-auto'>
            <div className='col-sm-12 col-md-6 text-center my-auto'>
                <h1 className='Primary-Heading'>Want to buy?</h1>
                <p className='Normal-Font-Size'>Buy any software that meets your requirements</p>
                <div className='row'>
                    <div className='mx-auto'>
                        <Link to="/buying">
                            <Button btnType="Btn-primary Btn-md btn-block">learn more</Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='col-sm-12 col-md-6 text-center my-auto'>
                <h1 className='Primary-Heading'>Want to sell?</h1>
                <p className='Normal-Font-Size'>Sale what you have made</p>
                <div className='row'>
                    <div className='mx-auto'>
                        <Button btnType="Btn-primary Btn-md btn-block">learn more</Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default optionSecton;