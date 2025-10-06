import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { Link } from "react-router-dom";

function SignupPage() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [gender, setGender] = useState("");
    const [date_of_birth, setDateOfBirth] = useState("");
    const [role, setRole] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const { signup } = useSignup();

    // Password strength validation (at least 6 characters, one number, one letter)
    const isStrongPassword = (password) => password.length >= 6 && /\d/.test(password) && /[a-zA-Z]/.test(password);



    const onSubmit = (e) => {
        e.preventDefault();
        signup({ name, username, password, phone_number, profilePicture, gender, date_of_birth, role, address: { street, city, state, zipCode } });
        // Reset the form state.
    }

    return (
        <main className="signup">
            <form className="signup-container" onSubmit={onSubmit}>
                <h1>Signup</h1>

                <label>name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                />
                {password && (
                    <p className={isStrongPassword(password) ? "success-text" : "error-text"}>
                        {isStrongPassword(password)
                            ? "Strong password 💪"
                            : "Weak password (at least 6 chars, number, and letter)"}
                    </p>
                )}
                <label>Phone Number</label>
                <input
                    type="text"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label>Profile picture</label>
                <input
                    type="text"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
                />
                <label>Gender</label>
                <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />
                <label>Date of birth
                    <input
                        type="date"
                        value={date_of_birth}
                        onChange={(e) => setDateOfBirth(e.target.value)} />
                </label>
                <label>Role
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>
                        <option value="admin">admin </option>
                        <option value="user">user </option>
                        <option value="moderator">moderator</option>
                    </select>
                </label>
                <label>Address</label>
                <div className="address">
                    <input
                        type="text"
                        placeholder="Street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    <input
                        type="text"
                        value={city}
                        placeholder="city"
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                        type="text"
                        value={state}
                        placeholder="state"
                        onChange={(e) => setState(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="zip code (001500)"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </div>
                <Link to="/login">Login</Link>

                <button className="signup-btn">Signup</button>
            </form>
        </main>
    );
}

export default SignupPage;
