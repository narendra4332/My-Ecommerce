import React from "react";
import "./Style/productList.css";

function ProductList({
  products,
  role,
  addToCart,
  handleDeleteProduct,
  setEditingProduct,
  editingProduct,
  handleEditProduct,
}) {
  return (
    <div className="product-list-container">
      {products && products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.ImageURL}
                alt={product.Name}
                className="product-image"
              />
              <h3 className="product-name">{product.Name}</h3>

              {role === "admin" ? (
                <div className="admin-controls">
                  <button
                    className="btn btn-success"
                    onClick={() => setEditingProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  className="btn1 btn-add"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center">No products available</h2>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="edit-product-modal">
          <h3>Edit Product</h3>
          <input
            type="text"
            className="w-full p-2 mb-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={editingProduct.Name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, Name: e.target.value })
            }
          />

          <input
            type="file"
            className="w-full p-2 mb-3 border border-gray-300 rounded-md shadow-sm bg-white cursor-pointer focus:outline-none file:border-none file:bg-blue-600 file:text-white file:py-2 file:px-4 file:rounded-md hover:file:bg-blue-700"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setEditingProduct({
                    ...editingProduct,
                    ImageFile: file,
                    ImageURL: reader.result,
                  });
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          <button className="btn btn-success me-2 " onClick={handleEditProduct}>
            Save
          </button>
          <button
            className="btn btn-dark"
            onClick={() => setEditingProduct(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
