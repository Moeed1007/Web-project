import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProductContext } from "../context/ProductContext";
import { updateProduct } from "../services/productApi";

function ModifyProduct() {
  const { products, fetchProducts } = useContext(ProductContext);

  const [searchId, setSearchId] = useState("");
  const [foundProduct, setFoundProduct] = useState(null);
  const [message, setMessage] = useState("");

  const editSchema = z.object({
    name: z.string().min(3, "Name too short").max(100),
    price: z.string().min(1, "Price required"),
    quantity: z.string().min(1, "Quantity required"),
    category: z.string().min(1, "Category required"),
    sale: z.string().min(1, "Sale status required"),
    image: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(editSchema),
    mode: "onChange",
  });

  const handleSearch = () => {
    const product = products.find((p) => Number(p.id) === Number(searchId));

    if (product) {
      setFoundProduct(product);
      setMessage("");

      setValue("name", product.name);
      setValue("price", product.price);
      setValue("quantity", product.quantity);
      setValue("category", product.category || "");
      setValue("sale", product.sale || "No");
      setValue("image", product.image || "");
    } else {
      setFoundProduct(null);
      setMessage("Product not found!");
    }
  };

  const onUpdate = async (data) => {
    const updated = {
      id: foundProduct.id,
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      category: data.category,
      sale: data.sale,
      image: data.image || "",
    };

    const result = await updateProduct(updated);

    if (result.success) {
      setMessage(result.message);
      setFoundProduct(null);
      setSearchId("");
      fetchProducts();
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title text-center">Modify Product</h3>

        {message && <div className="alert alert-info">{message}</div>}

        <div className="row mb-4">
          <div className="col-md-8">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Product ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <button className="btn btn-info w-100" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {foundProduct && (
          <form onSubmit={handleSubmit(onUpdate)}>
            <div className="text-center mb-3">
              {foundProduct.image && (
                <img
                  src={foundProduct.image}
                  alt={foundProduct.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "150px" }}
                />
              )}

              <p className="mt-2 text-success">
                Editing Product ID: {foundProduct.id}
              </p>
            </div>

            <hr />

            <h5>Edit Details</h5>

            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Product Name *"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-danger small">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Price (Rs) *"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-danger small">{errors.price.message}</p>
              )}
            </div>

            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Quantity *"
                {...register("quantity")}
              />
              {errors.quantity && (
                <p className="text-danger small">{errors.quantity.message}</p>
              )}
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
              {errors.category && (
                <p className="text-danger small">{errors.category.message}</p>
              )}
            </div>

            <div className="mb-3">
              <select className="form-control" {...register("sale")}>
                <option value="">Is product on sale?</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              {errors.sale && (
                <p className="text-danger small">{errors.sale.message}</p>
              )}
            </div>

            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Image URL optional"
                {...register("image")}
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100"
              disabled={!isValid}
            >
              Update Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ModifyProduct;