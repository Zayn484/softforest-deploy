import React from 'react'

import BenefitsPhoto from '../../assets/img/DumyImages/benefits-picture.jpg';

const benefitsSection = (props) => (
    <section className='Content'>
        <div className='Benefits-Section container'>
            <div className='text-center' >
                <h1 className='Primary-Heading'>benefits</h1>
            </div>
            <div className='row'>
                <div className='col-md-7'>
                    <div className='Normal-Font-Size'>
                        <p>Looking to sell your project? Then you are in right place.</p>
                        <p>Simply upload your project with complete details to help customers.
                            Want to upload demo version of your project? No worry, just upload your demo
                project.</p>
                    </div>
                    <h1 className='Secondary-Heading'>Things to know:</h1>
                    <ul className="Normal-Font-Size">
                        <li>Search any project you need.</li>
                        <li>See your choosed project details before adding it to cart.</li>
                        <li>Request developer to add more features.</li>
                        <li>Add it to cart and go to checkout.</li>
                        <li>Payments are 100% secured.</li>
                    </ul>
                </div >
                <div className='col-md-5 mt-5'>
                    <img className='img-fluid' src={BenefitsPhoto} alt='benefits' />
                </div>
            </div>
        </div>

    </section>
);

export default benefitsSection;