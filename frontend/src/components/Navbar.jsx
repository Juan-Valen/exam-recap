import { useAuthContext } from "../contexts/AuthContext";

const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuthContext();
    return (
        <nav className="navbar">
            <h1>Property Search</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/properties/add-property">Add Property</a>
                {isAuthenticated && (
                    <button onClick={() => {
                        localStorage.removeItem("user");
                        setIsAuthenticated(false);
                    }}>Logout</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
