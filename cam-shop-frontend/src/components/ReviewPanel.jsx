import React from 'react';
import { useBundle } from '../context/BundleContext';
import ReviewCartItem from './ReviewCartItem'; 

export default function ReviewPanel({content , categories}) {
    const { cart, setCart } = useBundle();

    const cartItems = Object.values(cart);
    
    const itemsByCategory = cartItems.reduce((acc, item) => { //group by categ
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});
    
    let currentTotal = content.shipping.price;
    let originalTotal = content.shipping.oldPrice;
    
    cartItems.forEach(item => {
        currentTotal += item.price * item.count;
        originalTotal += (item.oldPrice || item.price) * item.count;
    });
    const totalSavings = originalTotal - currentTotal;
    
    const savingsMessage = content.checkout.savings.replace(
        '{{amount}}', 
        `$${totalSavings.toFixed(2)}`
    );

    function handleSave() {
        cart? localStorage.setItem("cart", JSON.stringify(cart)) : localStorage.removeItem("cart")
    }

    function handleCheckout(){
        localStorage.removeItem("cart")
        setCart(prevCart=>{return {}})
    }

    return (
        <aside className="review-panel">

            <header className="review-title">{content.label}</header>
            <section className="review-main">
                <header>
                    <h1>{content.title}</h1>
                    <h2>{content.description}</h2>
                </header>
                <div className="review-categories-container">
                    
                    {categories.map(categoryKey => {
                        const items = itemsByCategory[categoryKey];
                        if (!items || items.length === 0) return null; 

                        return (
                            <div key={categoryKey} className="review-category">
                                <h3 className="label">{categoryKey.toUpperCase()}</h3>
                                
                                <div className="category-items">
                                    {items.map(item => (
                                        <ReviewCartItem key={`${item.id}_${item.variantId}_reviewCart`} item={item} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    
                </div>
                <div className="review-category ">
                    <div className="review-cart-item">
                        <div className="image-container">
                            <img src={content.shipping.icon} alt="Shipping Icon" />
                            <span>Fast Shipping</span>
                        </div>
                        <div className="right">
                            <div className="prices">
                            <span className="oldPrice">${content.shipping.oldPrice.toFixed(2)}</span>
                            <span className="price">
                                {content.shipping.price === 0 ? "FREE" : `$${content.shipping.price.toFixed(2)}`}
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
                

                <footer className="review-footer">
                    <div className="footer-top">

                         <img className="checkout-badge" src={content.checkout.image} alt="Satisfaction Guarantee" width={50}/>  
                         <span className="tablet-only">{content.checkout.title}: {content.checkout.description}</span>
                        
                        <div className="checkout-info">
                            <span className="financing">{content.checkout["image-label"]}</span>
                            <div className="prices">
                                <span className="oldPrice">${originalTotal.toFixed(2)}</span>
                                <span className="price">${currentTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {totalSavings > 0 && (
                        <div className="savings-banner">
                            {savingsMessage}
                        </div>
                    )}
                    
                    <button className="btn-checkout" onClick={handleCheckout}>{content.checkout.button}</button>
                    <button className="btn-save" onClick={handleSave} >{content.checkout.save}</button>
                </footer>
            </section>
        </aside>
    );
}