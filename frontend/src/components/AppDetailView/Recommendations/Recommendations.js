import React from 'react';
import { Rate } from 'antd';

const recommendations = (props) => {
    return (
        <div className='row col-md-7  bg-white ml-md-5 border-bottom mt-2' style={{ height: '8rem' }} >

            <div className='col-3 h-100'  >
                <img className='img-fluid h-100 w-100' src={props.img} alt='thumbnail' />
            </div>
            <div className='col-5 mt-md-3'>
                <h2>{props.title}</h2>
            </div>
            <div className='col-1 mt-md-3'>
                <Rate
                    style={{ fontSize: '1.8rem' }}
                    disabled
                    defaultValue={5}
                    count={1} />
                <span>{props.rating}</span>
            </div>
            <div className='col-3 mt-md-3 text-center'>
                <h2>${props.price}</h2>
            </div>

        </div>
    )
}

export default recommendations;
