import { createContext, useEffect, useState } from "react";
// Context creation
export const LoginContext = createContext(null);

const ContextProvider = ({ children }) => {
    const [loginData, setLoginData] = useState(null);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setLoginData(user);
        }
    }, [])
    return (
        <LoginContext.Provider value={{ loginData, setLoginData }}>
            {children}
        </LoginContext.Provider>
    );
};
export default ContextProvider;
