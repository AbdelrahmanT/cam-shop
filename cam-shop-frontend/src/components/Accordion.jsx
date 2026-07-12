import React, { useState } from "react";
import { useBundle } from "../context/BundleContext.jsx";
import ProductCard from "./ProductCard.jsx"; 

export default function Accordion({catalog}) {
    const { cart } = useBundle();

    const [activeSteps, setActiveSteps] = useState([catalog[0].id]);

    function handleToggle(step) {
        setActiveSteps(prevSteps =>{
            return prevSteps.includes(step)?
             prevSteps.filter(item => item!==step):
             [...prevSteps, step]
        });
    }

    function handleNext(currentIndex) {
        if (currentIndex < catalog.length - 1) {
            setActiveSteps(prevSteps=>([...prevSteps, catalog[currentIndex+1 ].id]))
            handleToggle(catalog[currentIndex ].id);
        }
    }

    return (
        <section className="accordion">
            {catalog.map((category, index) => {
                const isOpen = activeSteps.includes(category.id);
                const stepNumber = index + 1;
                const totalSteps = catalog.length;

                // no items of categ in cart
                const itemsSelected = Object.values(cart)
                    .filter(item => item.category === category.id)
                    .reduce((sum, item) => sum + item.count, 0);
                console.log(category.img);
                
                return (
                    <div key={category.id} className={`accordion-step ${isOpen ? "active" : ""}`}>
                        
                        <div className="step-no">
                            STEP {stepNumber} OF {totalSteps}
                            
                        </div>

                        
                        <button 
                            className="step-header" 
                            onClick={() => handleToggle(category.id)}
                        >
                            <div className="header-left">
                                <img src={category.img}  alt={category.title} />
                                <h2>{category.title}</h2>
                            </div>
                            
                            <div className="header-right">
                                {itemsSelected > 0 && (
                                    <span >{itemsSelected} selected</span>
                                )}
                                <span >{isOpen ? "▲" : "▼"}</span>
                            </div>
                        </button>

                        {isOpen && (
                            <div>
                                <div className="products">
                                    {category.products.map(product => (
                                        <ProductCard 
                                            key={product.id} 
                                            product={product} 
                                            category={category.id} 
                                        />
                                    ))}
                                </div>

                                <div className="next-buttons-container">
                                    {index < catalog.length - 1 ? (
                                        
                                            <button 
                                                onClick={() => handleNext(index)}
                                            >
                                                Next: {catalog[index + 1].title}
                                            </button>
                                        
                                    ) : <button  onClick={()=>setActiveSteps([])}>
                                        Close All Steps
                                        </button>
                                        }
                                </div>

                            </div>
                        )}
                        
                    </div>
                );
            })}
        </section>
    );
}