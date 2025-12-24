import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PRODUCTS_KEY = "products";

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  createdAt: number;
};

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    const items = raw ? JSON.parse(raw) : [];
    setProducts(items);
  }, []);

  const filtered = products.filter((p) => {
    if (!q) return true;
    return p.name.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64">
        <Header />

        <main className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Products</h1>
              <p className="text-muted-foreground">Manage your products</p>
            </div>

            <button
              onClick={() => navigate("/products/new")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Add Product
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="p-6 bg-card border border-border rounded-md">
              <p className="text-muted-foreground">No products found.</p>

              <button
                onClick={() => navigate("/products/new")}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                Create your first product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="p-4 bg-card border border-border rounded-md"
                >
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Rs. {p.price}
                  </div>
                  <p className="mt-2 text-sm">{p.description}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
