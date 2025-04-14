import { useEffect, useState } from "react";
import {
  createProduct,
  fetchBrands,
  fetchCategories,
  fetchColors,
} from "../../services/adminService";
import toast from "react-hot-toast";

const CreateProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    sizes: "",
    colors: [],
    price: "",
    totalQty: "",
    files: [],
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [b, c, cl] = await Promise.all([
          fetchBrands(),
          fetchCategories(),
          fetchColors(),
        ]);
        setBrands(b);
        setCategories(c);
        setColors(cl);
      } catch (err) {
        toast.error(err);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "files") {
      setForm((prev) => ({ ...prev, files }));
    } else if (name === "colors") {
      const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );
      setForm((prev) => ({ ...prev, colors: selectedOptions }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === "files") {
        Array.from(val).forEach((file) => formData.append("files", file));
      } else if (Array.isArray(val)) {
        val.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, val);
      }
    });

    try {
      const res = await createProduct(formData);
      toast.success(res.message);
      setForm({
        name: "",
        description: "",
        brand: "",
        category: "",
        sizes: "",
        colors: [],
        price: "",
        totalQty: "",
        files: [],
      });
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>Create New Product</h2>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="sizes"
        value={form.sizes}
        onChange={handleChange}
        placeholder="Sizes (comma-separated)"
      />
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="number"
        name="totalQty"
        value={form.totalQty}
        onChange={handleChange}
        placeholder="Total Quantity"
        required
      />
      <select name="brand" value={form.brand} onChange={handleChange} required>
        <option value="">Select Brand</option>
        {brands.map((b) => (
          <option key={b._id} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        name="colors"
        multiple
        value={form.colors}
        onChange={handleChange}
      >
        {colors.map((color) => (
          <option key={color._id} value={color.name}>
            {color.name}
          </option>
        ))}
      </select>
      <input
        type="file"
        name="files"
        accept="image/*"
        multiple
        onChange={handleChange}
        required
      />
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProductForm;
