import React from 'react'

const cartItem = (props) => {
    return (
        <div className='row col-12 mx-auto border-bottom bg-white text-dark' >
            <div className='col-3 col-sm-3 col-md-3 '>
                <img className='img-fluid my-4' src={props.src} alt={props.src} />
            </div>
            <div className='col-7 mt-3 col-sm-7 col-md-7'>
                <div className='col-12'>
                    <h3>{props.title}</h3>
                    <span>{props.description.substring(0, 40)}</span>
                </div>
            </div>
            <div className='col-2 mt-3 col-sm-2 col-md-2 '>
                <h3>
                    <strong>${props.price}</strong>
                    <br />
                    <br />

                    <span style={{ cursor: 'pointer' }}> <i onClick={props.delete} className='fas fa-trash ml-5' ></i></span>
                </h3>
            </div>

        </div>
    )
}

export default cartItem;
