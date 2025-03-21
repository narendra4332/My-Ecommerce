import "./Style/addProductForm.css";

function ProductForm({ newProduct, setNewProduct, handleAddProduct }) {
  return (
    <div className="add-product-form p-4 mb-2 shadow-sm rounded">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Product Name"
        value={newProduct.Name}
        onChange={(e) => setNewProduct({ ...newProduct, Name: e.target.value })}
      />
      <input
        type="file"
        className="form-control mb-2"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setNewProduct({
                ...newProduct,
                ImageFile: file,
                ImageURL: reader.result, // ✅ Store Base64 Image
              });
            };
            reader.readAsDataURL(file); // ✅ Convert Image to Base64
          }
        }}
      />
      {newProduct.ImageURL && (
        <img
          src={newProduct.ImageURL}
          className="img-thumbnail mb-2"
          style={{ maxWidth: "150px" }}
          alt="Product"
        />
      )}
      <button className="btn btn-success w-100" onClick={handleAddProduct}>
        Add Product
      </button>
    </div>
  );
}

export default ProductForm;
