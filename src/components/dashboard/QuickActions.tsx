import { Package, FileText, Tag, Truck } from "lucide-react";
import { useState } from "react";

const actions = [
  {
    icon: Package,
    label: "Add Product",
    description: "List new inventory",
    color: "bg-primary",
  },
  {
    icon: FileText,
    label: "Create Order",
    description: "Process new sale",
    color: "bg-warning",
  },
  {
    icon: Tag,
    label: "Run Discount",
    description: "Set up promotion",
    color: "bg-destructive",
  },
  {
    icon: Truck,
    label: "Track Shipment",
    description: "Monitor delivery",
    color: "bg-accent-foreground",
  },
];

const NOTIFICATIONS_KEY = "notifications";
const PRODUCTS_KEY = "products";
const ORDERS_KEY = "orders";
const DISCOUNTS_KEY = "discounts";

const addNotification = (title: string, body: string) => {
  const raw = localStorage.getItem(NOTIFICATIONS_KEY);
  const list = raw ? JSON.parse(raw) : [];
  const newNotif = { id: Date.now(), title, body, read: false, ts: Date.now() };
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([newNotif, ...list]));
  window.dispatchEvent(
    new CustomEvent("notifications-updated", { detail: newNotif })
  );
};

const QuickActions = () => {
  // modal states
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openCreateOrder, setOpenCreateOrder] = useState(false);
  const [openRunDiscount, setOpenRunDiscount] = useState(false);
  const [openTrackShipment, setOpenTrackShipment] = useState(false);

  // form states: Add Product
  const [pName, setPName] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pDesc, setPDesc] = useState("");

  // Create Order
  const [oCustomer, setOCustomer] = useState("");

  // Run Discount
  const [dPercent, setDPercent] = useState("");

  // Track Shipment
  const [tOrderId, setTOrderId] = useState("");

  const onAddProductSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!pName.trim()) return;
    const raw = localStorage.getItem(PRODUCTS_KEY);
    const products = raw ? JSON.parse(raw) : [];
    const newProduct = {
      id: `PRD-${Date.now()}`,
      name: pName.trim(),
      price: pPrice.trim(),
      description: pDesc.trim(),
      createdAt: Date.now(),
    };
    products.unshift(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    addNotification("Product added", `${newProduct.name} was added.`);
    setPName("");
    setPPrice("");
    setPDesc("");
    setOpenAddProduct(false);
  };

  const onCreateOrderSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!oCustomer.trim()) return;
    const raw = localStorage.getItem(ORDERS_KEY);
    const orders = raw ? JSON.parse(raw) : [];
    const newOrder = {
      id: `ORD-${Date.now()}`,
      customer: oCustomer.trim(),
      createdAt: Date.now(),
      status: "pending",
    };
    orders.unshift(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    addNotification(
      "Order created",
      `Order ${newOrder.id} for ${newOrder.customer} created.`
    );
    setOCustomer("");
    setOpenCreateOrder(false);
    if (typeof window !== "undefined") window.location.href = "/orders";
  };

  const onRunDiscountSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const pct = parseFloat(dPercent);
    if (isNaN(pct) || pct <= 0) return;
    const raw = localStorage.getItem(DISCOUNTS_KEY);
    const discounts = raw ? JSON.parse(raw) : [];
    const newDiscount = {
      id: `DSC-${Date.now()}`,
      percent: pct,
      createdAt: Date.now(),
    };
    discounts.unshift(newDiscount);
    localStorage.setItem(DISCOUNTS_KEY, JSON.stringify(discounts));
    addNotification("Discount created", `A ${pct}% discount was created.`);
    setDPercent("");
    setOpenRunDiscount(false);
  };

  const onTrackShipmentSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const id = tOrderId.trim();
    const raw = localStorage.getItem(ORDERS_KEY);
    const orders = raw ? JSON.parse(raw) : [];
    const order = orders.find((o: any) => o.id === id);
    if (order) {
      order.status = "shipped";
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      addNotification("Shipment updated", `Order ${id} marked as shipped.`);
    } else {
      addNotification(
        "Tracking started",
        id ? `No order ${id} found — opened orders.` : "Opened orders."
      );
    }
    setTOrderId("");
    setOpenTrackShipment(false);
    if (typeof window !== "undefined") window.location.href = "/orders";
  };

  return (
    <>
      <div className="bg-card rounded-xl border border-border p-6 opacity-0 animate-fade-in stagger-2">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            let onClick: () => void = () => {};
            if (action.label === "Add Product")
              onClick = () => setOpenAddProduct(true);
            if (action.label === "Create Order")
              onClick = () => setOpenCreateOrder(true);
            if (action.label === "Run Discount")
              onClick = () => setOpenRunDiscount(true);
            if (action.label === "Track Shipment")
              onClick = () => setOpenTrackShipment(true);

            return (
              <button
                key={action.label}
                onClick={onClick}
                className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-muted transition-all duration-200 hover:scale-[1.02] group"
              >
                <div
                  className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm text-foreground">
                    {action.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Product Modal */}
      {openAddProduct && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenAddProduct(false)}
          />
          <form
            onSubmit={onAddProductSubmit}
            className="relative z-10 w-full max-w-md bg-card border border-border rounded-md p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Add Product</h3>
              <button
                type="button"
                onClick={() => setOpenAddProduct(false)}
                className="text-sm"
              >
                Close
              </button>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-sm">Name</label>
                <input
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="text-sm">Price</label>
                <input
                  value={pPrice}
                  onChange={(e) => setPPrice(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm">Description</label>
                <textarea
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenAddProduct(false)}
                  className="px-3 py-1 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-primary text-primary-foreground rounded-md"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Create Order Modal */}
      {openCreateOrder && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenCreateOrder(false)}
          />
          <form
            onSubmit={onCreateOrderSubmit}
            className="relative z-10 w-full max-w-md bg-card border border-border rounded-md p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Create Order</h3>
              <button
                type="button"
                onClick={() => setOpenCreateOrder(false)}
                className="text-sm"
              >
                Close
              </button>
            </div>
            <div>
              <label className="text-sm">Customer name</label>
              <input
                value={oCustomer}
                onChange={(e) => setOCustomer(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setOpenCreateOrder(false)}
                className="px-3 py-1 border rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-primary text-primary-foreground rounded-md"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Run Discount Modal */}
      {openRunDiscount && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenRunDiscount(false)}
          />
          <form
            onSubmit={onRunDiscountSubmit}
            className="relative z-10 w-full max-w-md bg-card border border-border rounded-md p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Run Discount</h3>
              <button
                type="button"
                onClick={() => setOpenRunDiscount(false)}
                className="text-sm"
              >
                Close
              </button>
            </div>
            <div>
              <label className="text-sm">Discount %</label>
              <input
                value={dPercent}
                onChange={(e) => setDPercent(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md"
                placeholder="e.g. 10"
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setOpenRunDiscount(false)}
                className="px-3 py-1 border rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-primary text-primary-foreground rounded-md"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Track Shipment Modal */}
      {openTrackShipment && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenTrackShipment(false)}
          />
          <form
            onSubmit={onTrackShipmentSubmit}
            className="relative z-10 w-full max-w-md bg-card border border-border rounded-md p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Track Shipment</h3>
              <button
                type="button"
                onClick={() => setOpenTrackShipment(false)}
                className="text-sm"
              >
                Close
              </button>
            </div>
            <div>
              <label className="text-sm">Order ID</label>
              <input
                value={tOrderId}
                onChange={(e) => setTOrderId(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md"
                placeholder="ORD-..."
              />
              <p className="text-xs text-muted-foreground mt-2">
                Leave empty to open orders page.
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setOpenTrackShipment(false)}
                className="px-3 py-1 border rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-primary text-primary-foreground rounded-md"
              >
                Track
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default QuickActions;
