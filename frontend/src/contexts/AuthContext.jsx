import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);
export default function AuthContextProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        JSON.parse(localStorage.getItem("user")) || false
    );
    const auth = { isAuthenticated, setIsAuthenticated };
    return (<AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>);
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within a AuthContextProvider");
    }
    return context;
}
