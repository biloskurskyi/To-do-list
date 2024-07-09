// src/context/HeaderContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextProps {
    headerContent: string;
    setHeaderContent: (content: string) => void;
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
    const [headerContent, setHeaderContent] = useState("To do list can help you to manage your day more effective!");

    return (
        <HeaderContext.Provider value={{ headerContent, setHeaderContent }}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = (): HeaderContextProps => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error("useHeader must be used within a HeaderProvider");
    }
    return context;
};
