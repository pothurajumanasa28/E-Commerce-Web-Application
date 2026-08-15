import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./checkout.css";

function Checkout() {
    const navigate = useNavigate();

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price) * item.quantity,
        0
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const order = {
            customer: formData,
            items: cart,
            total: total,
            createdAt: new Date().toISOString()
        };

        localStorage.setItem(
            "latestOrder",
            JSON.stringify(order)
        );

        localStorage.removeItem("cart");

        window.dispatchEvent(
            new Event("cartUpdated")
        );

        alert("Order placed successfully! 🎉");

        navigate("/order-success");
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-empty">
                <h2>Your cart is empty</h2>

                <Link to="/products">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="checkout-page">

            <h1>Checkout</h1>

            <div className="checkout-container">

                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >

                    <h2>Delivery Details</h2>

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />

                    <label>
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                    />

                    <label>
                        Address
                    </label>

                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter delivery address"
                        required
                    />

                    <label>
                        City
                    </label>

                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        required
                    />

                    <label>
                        State
                    </label>

                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter state"
                        required
                    />

                    <label>
                        Pincode
                    </label>

                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Enter pincode"
                        required
                    />

                    <button type="submit">
                        Place Order
                    </button>

                </form>

                <div className="checkout-summary">

                    <h2>Order Summary</h2>

                    {cart.map((item) => (
                        <div
                            className="checkout-item"
                            key={item._id}
                        >
                            <span>
                                {item.name} × {item.quantity}
                            </span>

                            <span>
                                ₹
                                {(
                                    Number(item.price) *
                                    item.quantity
                                ).toFixed(2)}
                            </span>
                        </div>
                    ))}

                    <hr />

                    <div className="checkout-total">
                        <strong>Total</strong>

                        <strong>
                            ₹{total.toFixed(2)}
                        </strong>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Checkout;