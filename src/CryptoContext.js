import React, { createContext, useContext, useState, useEffect } from 'react'

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("VND")
    const [symbol, setSymbol] = useState("đ")

    useEffect(() => {
        if (currency === "USD") setSymbol("$")
        else if (currency === "VND") setSymbol("₫")
    }, [currency])


    return (
        <Crypto.Provider
            value={{ currency, symbol, setCurrency }}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto)
};