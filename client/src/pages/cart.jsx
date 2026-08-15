import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./cart.css";

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        const savedCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        setCart(savedCart);
    };

    const updateCart = (updatedCart) => {
        setCart(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };

    const increaseQuantity = (id) => {
        const updatedCart = cart.map((item) => {
            if (item._id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }

            return item;
        });

        updateCart(updatedCart);
    };

    const decreaseQuantity = (id) => {
        const updatedCart = cart
            .map((item) => {
                if (item._id === id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };
                }

                return item;
            })
            .filter((item) => item.quantity > 0);

        updateCart(updatedCart);
    };

    const removeFromCart = (id) => {
        const updatedCart = cart.filter(
            (item) => item._id !== id
        );

        updateCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);

        localStorage.removeItem("cart");

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price) * item.quantity,
        0
    );

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <div className="cart-page">

            <div className="cart-header">
                <h1>Shopping Cart</h1>

                {cart.length > 0 && (
                    <p>
                        {totalItems} item
                        {totalItems !== 1 ? "s" : ""}
                    </p>
                )}
            </div>

            {cart.length === 0 ? (

                <div className="empty-cart">

                    <div className="empty-cart-icon">
                        🛒
                    </div>

                    <h2>Your cart is empty</h2>

                    <p>
                        Looks like you haven't added
                        anything to your cart yet.
                    </p>

                    <Link
                        to="/products"
                        className="continue-shopping"
                    >
                        Continue Shopping
                    </Link>

                </div>

            ) : (

                <div className="cart-container">

                    <div className="cart-items">

                        {cart.map((item) => (

                            <div
                                className="cart-item"
                                key={item._id}
                            >

                                <div className="cart-product-image">

                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />
                                    ) : (
                                        <div className="cart-no-image">
                                            No Image
                                        </div>
                                    )}

                                </div>

                                <div className="cart-product-info">

                                    <h2>
                                        {item.name}
                                    </h2>

                                    <p className="cart-description">
                                        {item.description}
                                    </p>

                                    <p className="cart-category">
                                        Category:{" "}
                                        {item.category}
                                    </p>

                                    <h3>
                                        ₹{item.price}
                                    </h3>

                                </div>

                                <div className="cart-actions">

                                    <div className="quantity-control">

                                        <button
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item._id
                                                )
                                            }
                                        >
                                            −
                                        </button>

                                        <span>
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item._id
                                                )
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                    <p className="subtotal">
                                        Subtotal: ₹
                                        {(
                                            Number(item.price) *
                                            item.quantity
                                        ).toFixed(2)}
                                    </p>

                                    <button
                                        className="remove-button"
                                        onClick={() =>
                                            removeFromCart(
                                                item._id
                                            )
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                        <button
                            className="clear-cart-button"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </button>

                    </div>

                    <div className="cart-summary">

                        <h2>Order Summary</h2>

                        <div className="summary-row">
                            <span>
                                Items
                            </span>

                            <span>
                                {totalItems}
                            </span>
                        </div>

                        <div className="summary-row">
                            <span>
                                Subtotal
                            </span>

                            <span>
                                ₹{total.toFixed(2)}
                            </span>
                        </div>

                        <div className="summary-row">
                            <span>
                                Delivery
                            </span>

                            <span>
                                FREE
                            </span>
                        </div>

                        <hr />

                        <div className="summary-total">
                            <span>
                                Total
                            </span>

                            <span>
                                ₹{total.toFixed(2)}
                            </span>
                        </div>

                        <Link
                            to="/checkout"
                            className="checkout-button"
                        >
                            Proceed to Checkout
                        </Link>

                        <Link
                            to="/products"
                            className="continue-link"
                        >
                            ← Continue Shopping
                        </Link>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Cart;