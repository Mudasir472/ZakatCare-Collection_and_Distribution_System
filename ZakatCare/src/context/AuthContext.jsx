import { createContext, useEffect, useState } from "react";

// Context creation
export const LoginContext = createContext(null);

const ContextProvider = ({ children }) => {
    // State for login data
    const [loginData, setLoginData] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    // Load stored data once when the component mounts
    useEffect(() => {
        const storedLoginData = localStorage.getItem("user");
        if (storedLoginData) {
            setLoginData(JSON.parse(storedLoginData));
        }
    }, []); // Empty dependency array ensures it runs only on mount

    // Update localStorage when loginData changes
    useEffect(() => {
        if (loginData) {
            localStorage.setItem("user", JSON.stringify(loginData));
        } else {
            localStorage.removeItem("user"); // Clean up if user logs out
        }
    }, [loginData]);

    return (
        <LoginContext.Provider value={{ loginData, setLoginData }}>
            {children}
        </LoginContext.Provider>
    );
};

export default ContextProvider;
