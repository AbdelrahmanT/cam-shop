import React from 'react';
import { useBundle } from '../context/BundleContext';

export default function ReviewCartItem({ item }) {
    const { setCart } = useBundle();
    const cartKey = `${item.id}_${item.variantId}`;
    
    function updateQuantity(change) {
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
            const newCount = item.count + change;

            if (newCount <= 0) {
                delete updatedCart[cartKey];
            } else {
                updatedCart[cartKey] = {
                    ...updatedCart[cartKey],
                    count: newCount
                };
            }
            return updatedCart;
        });
    }
    
    const rowCurrentPrice = item.price * item.count;
    const rowOldPrice = item.oldPrice ? item.oldPrice * item.count : rowCurrentPrice;

    return (
        <div className="review-cart-item">
            <div className="image-container">
                {item.image && <img src={item.image} alt={item.title} style={item.title? {} :{width:  125, backgroundColor:"transparent"}} />}
                <span className="title">{item.title}{item.required ? " (Required)" : ""}</span>
            </div>

            <div className="right">
                {
                    item.category==="plan"? null:
                    <div className="controller">
                        <button 
                            disabled={item.required}
                            onClick={() => updateQuantity(-1)}
                        >
                            -
                        </button>
                        <span >{item.count}</span>
                        <button 
                            disabled={item.required}
                            onClick={() => updateQuantity(1)}
                        >
                            +
                        </button>
                    </div>
                }
                
                <div className="prices">
                    {rowOldPrice > rowCurrentPrice && (
                        <span className="oldPrice">${rowOldPrice.toFixed(2)}</span>
                    )}
                    
                    <span className="price">
                        {rowCurrentPrice === 0 ? "FREE" : `$${rowCurrentPrice.toFixed(2)}`}
                    </span>
                </div>
            </div>
        </div>
    );
}