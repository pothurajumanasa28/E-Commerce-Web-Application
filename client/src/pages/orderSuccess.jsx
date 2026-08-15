import { Link } from "react-router-dom";
import "./orderSuccess.css";

function OrderSuccess() {
    const order =
        JSON.parse(
            localStorage.getItem("latestOrder")
        ) || null;

    return (
        <div className="success-page">

            <div className="success-card">

                <div className="success-icon">
                    ✓
                </div>

                <h1>
                    Order Placed Successfully!
                </h1>

                <p>
                    Thank you for shopping with us.
                </p>

                {order && (
                    <div className="order-information">

                        <p>
                            <strong>
                                Order Total:
                            </strong>{" "}
                            ₹{Number(order.total).toFixed(2)}
                        </p>

                        <p>
                            <strong>
                                Customer:
                            </strong>{" "}
                            {order.customer.name}
                        </p>

                        <p>
                            <strong>
                                Delivery City:
                            </strong>{" "}
                            {order.customer.city}
                        </p>

                    </div>
                )}

                <div className="success-buttons">

                    <Link
                        to="/products"
                        className="shop-button"
                    >
                        Continue Shopping
                    </Link>

                    <Link
                        to="/"
                        className="home-button"
                    >
                        Go to Home
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default OrderSuccess;