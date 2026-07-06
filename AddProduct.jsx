import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { addProduct } from "../services/productApi";

function AddProduct() {
  const { fetchProducts } = useContext(ProductContext);
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");

  const schema = z.object({
    name: z.string().min(3, "Name too short").max(100),
    price: z.string().min(1, "Price required"),
    quantity: z.string().min(1, "Quantity required"),
    image: z.string().optional(),
    category: z.string().min(1, "Category required"),
    sale: z.string().min(1, "Sale status required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const newProduct = {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      image: data.image || "",
      category: data.category,
      sale: data.sale,
    };

    const result = await addProduct(newProduct);

    if (result.success) {
      setMessage(result.message);
      fetchProducts();
      reset();
      setImagePreview("");
    } else {
      setMessage(result.message);
    }
  };

  const handleImageChange = (e) => {
    setImagePreview(e.target.value);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title text-center">Add New Product</h3>

        {message && <div className="alert alert-info text-center">{message}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input className="form-control" placeholder="Product Name *" {...register("name")} />
            {errors.name && <p className="text-danger small">{errors.name.message}</p>}
          </div>

          <div className="mb-3">
            <input className="form-control" placeholder="Price (Rs) *" {...register("price")} />
            {errors.price && <p className="text-danger small">{errors.price.message}</p>}
          </div>

          <div className="mb-3">
            <input className="form-control" placeholder="Quantity *" {...register("quantity")} />
            {errors.quantity && <p className="text-danger small">{errors.quantity.message}</p>}
          </div>

          <div className="mb-3">
            <select className="form-control" {...register("category")}>
              <option value="">Select Category</option>
              <option value="Jerseys">Jerseys</option>
              <option value="Boots">Boots</option>
              <option value="Footballs">Footballs</option>
              <option value="Training Kits">Training Kits</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.category && <p className="text-danger small">{errors.category.message}</p>}
          </div>

          <div className="mb-3">
            <select className="form-control" {...register("sale")}>
              <option value="">Is product on sale?</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            {errors.sale && <p className="text-danger small">{errors.sale.message}</p>}
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Image URL optional"
              {...register("image")}
              onChange={handleImageChange}
            />
          </div>

          {imagePreview && (
            <div className="text-center mb-3">
              <img src={imagePreview} alt="Preview" style={{ maxHeight: "150px" }} className="img-fluid rounded" />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100" disabled={!isValid}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;