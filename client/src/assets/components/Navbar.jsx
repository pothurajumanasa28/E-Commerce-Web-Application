import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState(null);

    const updateCartCount = () => {
        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const count = cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        );

        setCartCount(count);
    };

    const updateUser = () => {
        const storedUser =
            JSON.parse(localStorage.getItem("user"));

        setUser(storedUser);
    };

    useEffect(() => {
        updateCartCount();
        updateUser();

        window.addEventListener(
            "cartUpdated",
            updateCartCount
        );

        window.addEventListener(
            "userUpdated",
            updateUser
        );

        return () => {
            window.removeEventListener(
                "cartUpdated",
                updateCartCount
            );

            window.removeEventListener(
                "userUpdated",
                updateUser
            );
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

        window.dispatchEvent(
            new Event("userUpdated")
        );

        alert("Logged out successfully");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link
                    to="/"
                    className="navbar-logo"
                >
                    MyShop
                </Link>

                <div className="navbar-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/products">
                        Products
                    </Link>

                    <Link to="/cart">
                        🛒 Cart
                        {cartCount > 0 && (
                            <span className="cart-count">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <>
                            <span className="welcome-user">
    👤 {user.name}

    <span className="user-role">
        {user.role === "admin"
            ? "Admin"
            : "User"}
    </span>
</span>
                          
                            

                            <button
                                onClick={handleLogout}
                                className="logout-button"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;