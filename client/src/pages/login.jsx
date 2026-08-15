import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");

        try {
            const response = await API.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

            console.log(
                "Login successful:",
                response.data
            );

            // Save JWT token
            localStorage.setItem(
                "token",
                response.data.token
            );

            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            // Tell Navbar that user has logged in
            window.dispatchEvent(
                new Event("userUpdated")
            );

            setMessage(
                "Login successful! 🎉"
            );

            // Go to home page
            setTimeout(() => {
                navigate("/");
            }, 500);

        } catch (error) {

            console.error(
                "Login error:",
                error.response?.data ||
                error.message
            );

            setMessage(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        }
    };

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <div>

                    <label>
                        Email:
                    </label>

                    <br />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter your email"
                        required
                    />

                </div>

                <br />

                <div>

                    <label>
                        Password:
                    </label>

                    <br />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Enter your password"
                        required
                    />

                </div>

                <br />

                <button type="submit">
                    Login
                </button>

            </form>

            {message && (
                <p>{message}</p>
            )}

            <p>
                Don't have an account?{" "}
                <Link to="/register">
                    Register
                </Link>
            </p>

        </div>
    );
}

export default Login;