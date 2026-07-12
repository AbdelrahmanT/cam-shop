import React, { createContext, useState, useContext } from "react";

const BundleContext = createContext()

export function BundleProvider({children}) {
    const [cart, setCart] = useState(()=>{
        return localStorage.getItem("cart") ? 
            JSON.parse(localStorage.getItem("cart")) :
            {}
    })
    return <BundleContext.Provider value={{cart, setCart}}>
        {children}
    </BundleContext.Provider>
}

export function useBundle(){
    return useContext(BundleContext)
}