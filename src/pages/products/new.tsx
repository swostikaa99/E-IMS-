import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const PRODUCTS_KEY = "products";
const NOTIFICATIONS_KEY = "notifications";

const NewProductPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Get existing products
    const raw = localStorage.getItem(PRODUCTS_KEY);
    const products = raw ? JSON.parse(raw) : [];

    const newProduct = {
      id: Date.now().toString(),
      name,
      price,
      description,
      createdAt: Date.now(),
    };

    products.unshift(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));

    // Add notification
    const rawN = localStorage.getItem(NOTIFICATIONS_KEY);
    const notifs = rawN ? JSON.parse(rawN) : [];

    notifs.unshift({
      id: Date.now(),
      title: "Product added",
      body: `${name} was added.`,
      read: false,
      ts: Date.now(),
    });

    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs));

    // Redirect to products list
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64">
        <Header />

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Add Product</h1>
            <p className="text-muted-foreground">
              Create a new product for your store.
            </p>
          </div>

          <form className="max-w-lg space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Price</label>
              <input
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {saving ? "Saving..." : "Create Product"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default NewProductPage;
