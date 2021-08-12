import React, { createContext, useState } from 'react';

export const IsLoadingContext = createContext();

export const IsLoadinProvider = ({ children }) => {
    const defaultState = {
        isLoading: false
    }

    const [loadingState, setLoadingState] = useState(defaultState);

    return (
        <IsLoadingContext.Provider value={{ loadingState, setLoadingState }}>
            { children }
        </IsLoadingContext.Provider>
    )
}