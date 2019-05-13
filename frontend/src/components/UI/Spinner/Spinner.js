import React from 'react';

import ClipLoader from 'react-spinners/ClipLoader';

const spinner = () => {
    return (
        <div className='text-center mt-5 mb-5'>
            <ClipLoader
                sizeUnit={"px"}
                size={50}
                color={'#05C0BA'}
            />
        </div>
    )
};

export default spinner;