import { Search, Bell, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProductDialog, {
  ProductFormData,
} from "@/components/products/AddProductDialog";

const NOTIFICATIONS_KEY = "notifications";
const PRODUCTS_KEY = "products";

const Header = () => {
  const navigate = useNavigate();

  /* ================= USER ================= */
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userRef = useRef<HTMLDivElement | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const fullName = user?.name || "User";
  const initials = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  /* ================= SEARCH ================= */
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  /* ================= NOTIFICATIONS ================= */
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  /* ================= PRODUCTS ================= */
  const [products, setProducts] = useState<any[]>([]);

  const categories = [
    "Electronics",
    "Sports",
    "Accessories",
    "Home",
    "Clothing",
  ];

  // ref + position for notification popup
  const notifBtnRef = useRef<HTMLDivElement | null>(null);
  const [notifPos, setNotifPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const POPUP_WIDTH = 320; // px, matches max-w-md roughly

  const computeNotifPosition = () => {
    if (!notifBtnRef.current) return setNotifPos(null);
    const rect = notifBtnRef.current.getBoundingClientRect();
    const scrollX = typeof window !== "undefined" ? window.scrollX : 0;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    // Align popup so its RIGHT edge is flush with the bell icon's right edge.
    // left = iconRight - popupWidth
    let left = rect.right + scrollX - POPUP_WIDTH;
    const minLeft = 8 + scrollX;
    const maxLeft =
      (typeof window !== "undefined" ? window.innerWidth : POPUP_WIDTH) +
      scrollX -
      POPUP_WIDTH -
      8;
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;
    const top = rect.bottom + scrollY + 8; // small gap under icon
    setNotifPos({ top, left });
  };

  // update position when opening and on resize/scroll
  useEffect(() => {
    if (!showNotifications) return;
    computeNotifPosition();
    const onWin = () => computeNotifPosition();
    window.addEventListener("resize", onWin);
    window.addEventListener("scroll", onWin, { passive: true });
    return () => {
      window.removeEventListener("resize", onWin);
      window.removeEventListener("scroll", onWin);
    };
  }, [showNotifications, notifications]);

  /* ================= EFFECTS ================= */
  useEffect(() => {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    if (raw) {
      setNotifications(JSON.parse(raw));
    } else {
      const seed = [
        {
          id: Date.now(),
          title: "Welcome!",
          body: "Your dashboard is ready.",
          read: false,
        },
      ];
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(seed));
      setNotifications(seed);
    }

    const rawP = localStorage.getItem(PRODUCTS_KEY);
    setProducts(rawP ? JSON.parse(rawP) : []);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    setSuggestions(
      products
        .filter((p) => p.name?.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
    );
  }, [query, products]);

  /* ================= HANDLERS ================= */
  const onClickSuggestion = (s: any) => {
    setQuery(s.name);
    setShowSuggestions(false);
    navigate(`/products?q=${encodeURIComponent(s.name)}`);
  };

  const toggleNotifications = () => {
    setShowNotifications((s) => !s);
    if (!showNotifications) {
      const updated = notifications.map((n) => ({ ...n, read: true }));
      setNotifications(updated);
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([]));
  };

  const handleAddProduct = (data: ProductFormData) => {
    const newProduct = {
      id: `PRD-${String(products.length + 1).padStart(3, "0")}`,
      ...data,
      createdAt: Date.now(),
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
  };

  /* ================= RENDER ================= */
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6">
      {/* ===== SEARCH ===== */}
      <div className="relative flex-1 max-w-xs sm:max-w-md" ref={searchRef}>
        {/* Desktop */}
        <div className="hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            className="pl-10"
          />
        </div>

        {/* Mobile */}
        <div className="sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileSearch(true)}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-popover border rounded-md shadow z-50">
            {suggestions.map((s) => (
              <div
                key={s.id}
                onClick={() => onClickSuggestion(s)}
                className="px-3 py-2 hover:bg-accent cursor-pointer"
              >
                <div className="font-medium text-sm">{s.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== MOBILE SEARCH OVERLAY ===== */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-50 bg-black/40 p-4 sm:hidden">
          <div className="bg-card rounded-md p-3 flex items-center gap-2">
            <Search className="w-4 h-4" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setShowMobileSearch(false);
                  navigate(`/products?q=${encodeURIComponent(query)}`);
                }
              }}
              className="flex-1 outline-none bg-transparent"
              placeholder="Search products..."
            />
            <button onClick={() => setShowMobileSearch(false)}>
              <X />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div ref={notifBtnRef} className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (!showNotifications) {
                setShowNotifications(true);
              } else {
                setShowNotifications(false);
              }
            }}
          >
            <Bell className="w-4 h-4" />
          </Button>
        </div>

        {/* anchored notification popup */}
        {showNotifications && notifPos && (
          <>
            {/* full-screen invisible backdrop to close when clicking outside */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowNotifications(false)}
            />
            <div
              className="fixed z-50 bg-card border border-border rounded-md shadow-lg"
              style={{
                width: `${POPUP_WIDTH}px`,
                maxWidth: "90%",
                top: notifPos.top,
                left: notifPos.left,
              }}
            >
              <div className="relative px-4 py-3 border-b">
                <div className="font-semibold">Notifications</div>
                <button
                  aria-label="Close notifications"
                  onClick={() => setShowNotifications(false)}
                  className="absolute right-3 top-3 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-64 overflow-auto">
                {notifications.length === 0 && (
                  <div className="px-4 py-3 text-sm text-muted-foreground">
                    No notifications
                  </div>
                )}
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 border-b">
                    <div className="font-medium">{n.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {n.body}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 flex justify-end">
                <button
                  onClick={clearNotifications}
                  className="text-sm text-destructive"
                >
                  Clear
                </button>
              </div>
            </div>
          </>
        )}

        {/* Add Product */}
        <AddProductDialog categories={categories} onAdd={handleAddProduct} />

        {/* User Menu */}
        <div className="relative" ref={userRef}>
          <div
            onClick={() => setShowUserMenu((p) => !p)}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center cursor-pointer"
          >
            <span className="text-sm font-semibold text-primary-foreground">
              {initials}
            </span>
          </div>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-card border rounded-md shadow-lg z-50">
              <div className="px-4 py-3 border-b font-medium">{fullName}</div>
              <button
                className="w-full px-4 py-2 text-left hover:bg-accent"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-accent"
                onClick={() => navigate("/help-center")}
              >
                Help center
              </button>
              <button
                className="w-full px-4 py-2 text-left text-destructive hover:bg-accent"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
