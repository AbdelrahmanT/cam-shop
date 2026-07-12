import React, { useState, useEffect } from "react";
import {useBundle} from "../context/BundleContext.jsx"

export default function ProductCard({product, category}) {
    const {cart, setCart} = useBundle()
    const hasVariants = product.variants && product.variants.length > 0
    const [selectedVariantId, setSelectedVariantId] = useState(
        hasVariants ? product.variants[0].id : "standard"
    )
    let selectedVariantIndex = selectedVariantId === "standard" ?
        null:
        product.variants.findIndex(variant=>variant.id === selectedVariantId)

    const currentKey = `${product.id}_${selectedVariantId}`
    let currentCount = cart[currentKey]?.count || 0
    
    function handleQuantityChange(change) {
        const newCount = currentCount + change

        setCart(prevCart => {
            const updatedCart = { ...prevCart }

            if (newCount <= 0) {
                delete updatedCart[currentKey]
            } else {
                updatedCart[currentKey] = {
                    id: product.id,
                    variantId: selectedVariantId,
                    title: hasVariants 
                        ? `${product.title} (${product.variants?.find(v => v.id === selectedVariantId).label || ""})` 
                        : product.title,
                    price: product.price ?? product.variants[selectedVariantIndex].price,
                    oldPrice: product?.oldPrice ? product.oldPrice : null , 
                    count: newCount,
                    category: category,
                    required: product.required ?? false,
                    image:  product?.variants?.[selectedVariantIndex]?.image || product.image
                }
            }
            return updatedCart
        });
    }

    function handlePlanChange() {
        setCart(prevCart =>{
            const updatedCart = {...prevCart}
            
            for(const key in updatedCart){
                updatedCart[key].category ==="plan" ?
                delete updatedCart[key] :
                null
            }
            updatedCart[currentKey] = {
                    id: product.id,
                    variantId: selectedVariantId,
                    title: hasVariants 
                        ? `${product.title} (${product.variants?.find(v => v.id === selectedVariantId).label || ""})` 
                        : product.title,
                    price: product.price ?? product.variants[selectedVariantIndex].price,
                    oldPrice: product?.oldPrice ? product.oldPrice : null , 
                    count: 1,
                    category: category,
                    required: product.required ?? false,
                    image:  product?.variants?.[selectedVariantIndex]?.image || product.image
                }
            return updatedCart
        })
    }

    useEffect(()=>{
        if(product.required && currentCount===0 ){
            handleQuantityChange(1)
        }
    },[])
    console.log(product,product.title);
    
    return (
        <div className={`productCard ${currentCount>0 ? "highlight" : ""}`}>
            <div className="left">
                {
                    product.badge? <span className="badge">{product.badge}</span> : null
                }
                {product.image && <img  src={product.image} alt={product.title}/>}
            </div>
            <div className="right">
                <h3>{product.title}{product.required? " (Required)" : null}</h3>
                <p>{product.description}    <a href="#" className="learnMore">Learn more</a></p>
                
                {hasVariants && (
                    <div className="variants">
                        {product.variants.map((variant,index) => (
                            <button 
                                key={`${product.id}_${variant.id}`} 
                                className={`variant ${variant.id === selectedVariantId ? "highlight" : ""}`}
                                onClick={() => {
                                    setSelectedVariantId(variant.id)
                                }}
                            >
                                <img src={variant.image || product.image} alt={variant.label} />
                                <div className="label">{variant.label}</div>
                            </button>
                        ))}
                    </div>
                )}
                <div className="bottom">
                    <div className="controller">
                        {category === "plan" ?
                        <input  type="radio" 
                                name={category} 
                                value={currentKey} 
                                onChange={handlePlanChange}
                            >
                        </input>
                        : <><button disabled={product.required || currentCount<1 } onClick={()=> handleQuantityChange(-1)}>-</button>
                            <div>{cart[currentKey]?.count || 0}</div>
                            <button disabled={product.required} onClick={()=> handleQuantityChange(1)}>+</button>
                        </>
                        
                        }
                    </div>
                    <div className="prices">
                        {
                            product.oldPrice ? <div className="oldPrice">${product.oldPrice}</div> : null   
                        }
                        <div className="price">
                            {
                               (product.price ?? product.variants?.[selectedVariantIndex]?.price) === 0 
                                ? "FREE" 
                                : `$${(product.price ?? product.variants?.[selectedVariantIndex]?.price)}`
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}
