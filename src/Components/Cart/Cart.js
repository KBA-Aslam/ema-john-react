import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total += product.price;
    }
    let shipping = 0;
    if (total > 50) {
        shipping = 0;
    }
    else if(total > 30){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 11.99;
    }
    const tax = (total / 10).toFixed(2);
    const gTotal = (total + shipping + Number(tax)).toFixed(2);

//    const round = num => {
//        const precision = num.toFixed(2);
//        return Number(precision);
//    }



    return (
        <div>
            <h3>Order Summary</h3>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price:{total} </p>
            <p><small>Shipping: {shipping} </small></p>
            <p><small>Tax and VAT: {tax} </small></p>
            <p>Total: {gTotal} </p>

        </div>
    );
};

export default Cart;