/* eslint-disable react/jsx-pascal-case */
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
    const defaultState = {
        id: null,
        username: null,
        displayName: null,
        isLoading: false,
        topScore: 0
    }

    const [state, setState] = useState(defaultState);

    return (
        <AppContext.Provider value={{ state, setState }}>
            { children }
        </AppContext.Provider>
    )
}
