import React, { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useState } from 'react';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItems/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [placedOrder, setPlacedOrder] = useState(false);

    const handlePlaceOrder = () => {
        setCart([])
        setPlacedOrder(true)
        processOrder();
    }

    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);

    const removeProduct= (productKey)=>{
        console.log('removed Item')
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    };

    let thankyou
    if (placedOrder) {
       thankyou = <img src={happyImage} alt=""/>
    }

    return (
        <div className="shop-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem 
                key = {pd.key}
                product={pd}
                removeProduct={removeProduct}>
                </ReviewItem> )
            }
            { thankyou }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="cart-btn">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;