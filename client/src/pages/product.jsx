import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./product.css";

function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/products"
                );

                console.log("Products received:", response.data);

                setProducts(response.data);
            } catch (err) {
                console.error("Product error:", err);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
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
            <div className="products-page">
                <h2>Loading products...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="products-page">
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div className="products-page">

            <h1>Our Products</h1>

            {products.length === 0 ? (
                <div className="empty-products">
                    <h2>No products available</h2>
                    <p>
                        Please check back later.
                    </p>
                </div>
            ) : (
                <div className="product-grid">

                    {products.map((product) => (

                        <div
                            className="product-card"
                            key={product._id}
                        >

                            <div className="product-image-container">

                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                ) : (
                                    <div className="no-image">
                                        No Image
                                    </div>
                                )}

                            </div>

                            <div className="product-info">

                                <h2>
                                    {product.name}
                                </h2>

                                <p className="description">
                                    {product.description}
                                </p>

                                <p className="category">
                                    Category:{" "}
                                    {product.category}
                                </p>

                                <h3>
                                    ₹{product.price}
                                </h3>

                                <p className="stock">
                                    Stock: {product.stock}
                                </p>

                                <div className="product-buttons">

                                    <Link
                                        to={`/products/${product._id}`}
                                        className="details-button"
                                    >
                                        View Details
                                    </Link>

                                    <button
                                        className="cart-button"
                                        onClick={() =>
                                            addToCart(product)
                                        }
                                    >
                                        Add to Cart
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default Product;