import { useState } from "react";
import "../styles/LoginPage.css";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useLogin();

    // Password strength validation (at least 6 characters, one number, one letter)
    const isStrongPassword = (password) => password.length >= 6 && /\d/.test(password) && /[a-zA-Z]/.test(password);



    const onSubmit = (e) => {
        e.preventDefault();
        login({ username, password });
        // Reset the form state.
    }

    return (
        <main className="login">
            <form className="login-container" onSubmit={onSubmit}>
                <h1>Login</h1>

                <label>Username</label>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={password ? (isStrongPassword(password) ? "valid" : "invalid") : ""}
                />
                {password && (
                    <p className={isStrongPassword(password) ? "success-text" : "error-text"}>
                        {isStrongPassword(password)
                            ? "Strong password 💪"
                            : "Weak password (at least 6 chars, number, and letter)"}
                    </p>
                )}
                <Link to="/signup">Create an account</Link>

                <button className="login-btn">Login</button>
            </form>
        </main>
    );
}

export default LoginPage;
