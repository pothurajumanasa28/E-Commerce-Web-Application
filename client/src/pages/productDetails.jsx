import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./productDetails.css";

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/products/${id}`
                );

                console.log(
                    "Product details:",
                    response.data
                );

                setProduct(response.data);

            } catch (err) {
                console.error(
                    "Product details error:",
                    err
                );

                setError("Product not found.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = () => {
        const existingCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = existingCart.find(
            (item) => item._id === product._id
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            existingCart.push({
                ...product,
                quantity: 1
            });
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(existingCart)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );

        alert(`${product.name} added to cart!`);
    };

    if (loading) {
        return (
            <div className="details-page">
                <h2>Loading product...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="details-page">
                <h2>{error}</h2>

                <Link to="/products">
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="details-page">

            <Link
                to="/products"
                className="back-products"
            >
                ← Back to Products
            </Link>

            <div className="details-container">

                <div className="details-image">

                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                        />
                    ) : (
                        <div className="details-no-image">
                            No Image Available
                        </div>
                    )}

                </div>

                <div className="details-info">

                    <p className="details-category">
                        {product.category}
                    </p>

                    <h1>
                        {product.name}
                    </h1>

                    <h2 className="details-price">
                        ₹{product.price}
                    </h2>

                    <p className="details-description">
                        {product.description}
                    </p>

                    <p className="details-stock">
                        <strong>Available Stock:</strong>{" "}
                        {product.stock}
                    </p>

                    <button
                        className="details-cart-button"
                        onClick={addToCart}
                        disabled={product.stock === 0}
                    >
                        {product.stock === 0
                            ? "Out of Stock"
                            : "Add to Cart"}
                    </button>

                    <Link
                        to="/cart"
                        className="view-cart-button"
                    >
                        View Cart
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;