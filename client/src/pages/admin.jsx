import { useEffect, useState } from "react";
import API from "../api/axios";
import "./admin.css";

function Admin() {

    // -----------------------------
    // PRODUCT FORM
    // -----------------------------

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: ""
    });

    // -----------------------------
    // PRODUCTS
    // -----------------------------

    const [products, setProducts] = useState([]);

    // -----------------------------
    // EDIT MODE
    // -----------------------------

    const [editingId, setEditingId] = useState(null);

    // -----------------------------
    // MESSAGES
    // -----------------------------

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // -----------------------------
    // LOADING
    // -----------------------------

    const [loading, setLoading] = useState(false);


    // ==========================================
    // GET PRODUCTS
    // ==========================================

    const fetchProducts = async () => {

        try {

            const response = await API.get("/products");

            console.log(
                "Products:",
                response.data
            );

            setProducts(response.data);

        } catch (error) {

            console.error(
                "Fetch products error:",
                error
            );

            setError(
                "Failed to load products."
            );
        }
    };


    // ==========================================
    // LOAD PRODUCTS WHEN PAGE OPENS
    // ==========================================

    useEffect(() => {

        fetchProducts();

    }, []);


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {

        setFormData({
            name: "",
            description: "",
            price: "",
            category: "",
            image: "",
            stock: ""
        });

        setEditingId(null);
    };


    // ==========================================
    // ADD / UPDATE PRODUCT
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {

            const productData = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                category: formData.category,
                image: formData.image,
                stock: Number(formData.stock)
            };


            // -----------------------------
            // UPDATE
            // -----------------------------

            if (editingId) {

                const response = await API.put(
                    `/products/${editingId}`,
                    productData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                console.log(
                    "Product updated:",
                    response.data
                );

                setMessage(
                    "Product updated successfully! ✅"
                );

            }

            // -----------------------------
            // ADD
            // -----------------------------

            else {

                const response = await API.post(
                    "/products",
                    productData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                console.log(
                    "Product added:",
                    response.data
                );

                setMessage(
                    "Product added successfully! ✅"
                );
            }


            // Clear form
            resetForm();

            // Refresh products
            fetchProducts();

        } catch (error) {

            console.error(
                "Product operation error:",
                error.response?.data ||
                error.message
            );

            setError(
                error.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // EDIT PRODUCT
    // ==========================================

    const handleEdit = (product) => {

        setEditingId(product._id);

        setFormData({
            name: product.name || "",
            description: product.description || "",
            price: product.price || "",
            category: product.category || "",
            image: product.image || "",
            stock: product.stock || ""
        });

        setMessage("");
        setError("");

        // Scroll to form
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        setMessage("");
        setError("");

        try {

            await API.delete(
                `/products/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setMessage(
                "Product deleted successfully! 🗑️"
            );

            // Refresh products
            fetchProducts();

        } catch (error) {

            console.error(
                "Delete error:",
                error.response?.data ||
                error.message
            );

            setError(
                error.response?.data?.message ||
                "Failed to delete product."
            );
        }
    };


    // ==========================================
    // CANCEL EDIT
    // ==========================================

    const handleCancelEdit = () => {

        resetForm();

        setMessage("");
        setError("");
    };


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <div className="admin-page">

            {/* =================================
                HEADER
            ================================= */}

            <div className="admin-header">

                <h1>
                    Admin Dashboard
                </h1>

                <p>
                    Manage your e-commerce products
                </p>

            </div>


            {/* =================================
                MESSAGE
            ================================= */}

            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}


            {/* =================================
                PRODUCT FORM
            ================================= */}

            <div className="admin-card">

                <h2>
                    {editingId
                        ? "Edit Product"
                        : "Add New Product"}
                </h2>


                <form
                    onSubmit={handleSubmit}
                    className="product-form"
                >

                    {/* PRODUCT NAME */}

                    <div className="form-group">

                        <label>
                            Product Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            required
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            rows="4"
                            required
                        />

                    </div>


                    {/* PRICE */}

                    <div className="form-group">

                        <label>
                            Price (₹)
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            min="0"
                            required
                        />

                    </div>


                    {/* CATEGORY */}

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Example: Shoes"
                            required
                        />

                    </div>


                    {/* IMAGE */}

                    <div className="form-group">

                        <label>
                            Product Image URL
                        </label>

                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />

                        <small>
                            Paste a direct image URL.
                        </small>

                    </div>


                    {/* STOCK */}

                    <div className="form-group">

                        <label>
                            Stock
                        </label>

                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="Enter stock quantity"
                            min="0"
                            required
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="form-buttons">

                        <button
                            type="submit"
                            className="add-product-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Saving..."
                                : editingId
                                    ? "Update Product"
                                    : "Add Product"}

                        </button>


                        {editingId && (

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={handleCancelEdit}
                            >
                                Cancel Edit
                            </button>

                        )}

                    </div>

                </form>

            </div>


            {/* =================================
                PRODUCT LIST
            ================================= */}

            <div className="admin-card">

                <div className="product-list-header">

                    <h2>
                        All Products
                    </h2>

                    <span>
                        {products.length} product
                        {products.length !== 1
                            ? "s"
                            : ""}
                    </span>

                </div>


                {products.length === 0 ? (

                    <div className="no-products">

                        <h3>
                            No products available
                        </h3>

                        <p>
                            Add your first product above.
                        </p>

                    </div>

                ) : (

                    <div className="admin-product-grid">

                        {products.map((product) => (

                            <div
                                className="admin-product-card"
                                key={product._id}
                            >

                                {/* IMAGE */}

                                <div className="admin-product-image">

                                    {product.image ? (

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                        />

                                    ) : (

                                        <div className="no-image">
                                            No Image
                                        </div>

                                    )}

                                </div>


                                {/* INFORMATION */}

                                <div className="admin-product-info">

                                    <h3>
                                        {product.name}
                                    </h3>

                                    <p>
                                        {product.description}
                                    </p>

                                    <div className="product-details">

                                        <strong>
                                            ₹{product.price}
                                        </strong>

                                        <span>
                                            {product.category}
                                        </span>

                                        <span>
                                            Stock: {product.stock}
                                        </span>

                                    </div>


                                    {/* ACTIONS */}

                                    <div className="admin-actions">

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                handleEdit(product)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    product._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Admin;