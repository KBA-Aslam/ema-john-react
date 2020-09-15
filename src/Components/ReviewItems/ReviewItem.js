import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom:'1px solid lightgray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h1 className="name">{name}</h1>
            <h5>Quantity: {quantity}</h5>
            <p><small>${price}</small></p>
            <br/>
            <button className="cart-btn"
            onClick={() => props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;