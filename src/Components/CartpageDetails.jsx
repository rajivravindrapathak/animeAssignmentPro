import React from 'react'
import "./CartpageDetails.css"

const CartpageDetails = ({item}) => {
    return (
        <div>
            <p>{item.title}</p>
            <img src={item.images.jpg.image_url} />
            <p>{item.rating}</p>
            <p>{item.episodes}</p> 
        </div>
    )
}

export default CartpageDetails
