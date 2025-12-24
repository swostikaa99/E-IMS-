import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronDown,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}

const SidebarLink = ({
  icon,
  label,
  active,
  badge,
  onClick,
}: SidebarLinkProps) => (
  <button
    onClick={onClick}
    className={cn(
      "sidebar-link w-full",
      active && "active bg-sidebar-accent text-sidebar-primary"
    )}
  >
    {icon}
    <span className="flex-1 text-left text-sm font-medium">{label}</span>
    {badge !== undefined && (
      <span className="bg-sidebar-primary text-sidebar-primary-foreground text-xs px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

interface SidebarProps {
  activePage?:
    | "dashboard"
    | "orders"
    | "products"
    | "customers"
    | "analytics"
    | "settings"
    | "help";
}

const Sidebar = ({ activePage = "dashboard" }: SidebarProps) => {
  return (
    <>
      {/* Mobile narrow icon-only sidebar (visible below sm) */}
      <aside className="flex sm:hidden fixed left-0 top-0 h-screen w-16 bg-sidebar flex-col border-r border-sidebar-border items-center py-4 space-y-2 z-40">
        {/* Logo / Home */}
        <a href="/" className="group relative">
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              activePage === "dashboard"
                ? "bg-sidebar-accent"
                : "bg-sidebar-primary/10"
            )}
            aria-label="Home"
            title="Dashboard"
          >
            <Store className="w-5 h-5 text-sidebar-foreground" />
          </div>
          <span className="sr-only">Dashboard</span>
        </a>

        {/* Navigation icons */}
        <nav className="flex-1 flex flex-col items-center justify-start mt-4 space-y-1 w-full">
          <a href="/" className="w-full flex justify-center">
            <div className="group relative">
              <button
                aria-label="Dashboard"
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-md",
                  activePage === "dashboard"
                    ? "bg-sidebar-accent"
                    : "hover:bg-sidebar-accent/70"
                )}
              >
                <LayoutDashboard className="w-5 h-5 text-sidebar-foreground" />
              </button>
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card px-2 py-1 rounded-md text-sm border border-border hidden group-hover:block">
                Dashboard
              </span>
            </div>
          </a>

          <a href="/orders" className="w-full flex justify-center">
            <div className="group relative">
              <button
                aria-label="Orders"
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-md",
                  activePage === "orders"
                    ? "bg-sidebar-accent"
                    : "hover:bg-sidebar-accent/70"
                )}
              >
                <ShoppingCart className="w-5 h-5 text-sidebar-foreground" />
              </button>
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card px-2 py-1 rounded-md text-sm border border-border hidden group-hover:block">
                Orders
              </span>
            </div>
          </a>

          <a href="/products" className="w-full flex justify-center">
            <div className="group relative">
              <button
                aria-label="Products"
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-md",
                  activePage === "products"
                    ? "bg-sidebar-accent"
                    : "hover:bg-sidebar-accent/70"
                )}
              >
                <Package className="w-5 h-5 text-sidebar-foreground" />
              </button>
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card px-2 py-1 rounded-md text-sm border border-border hidden group-hover:block">
                Products
              </span>
            </div>
          </a>

          <a href="/customers" className="w-full flex justify-center">
            <div className="group relative">
              <button
                aria-label="Customers"
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-md",
                  activePage === "customers"
                    ? "bg-sidebar-accent"
                    : "hover:bg-sidebar-accent/70"
                )}
              >
                <Users className="w-5 h-5 text-sidebar-foreground" />
              </button>
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card px-2 py-1 rounded-md text-sm border border-border hidden group-hover:block">
                Customers
              </span>
            </div>
          </a>

          <a href="/analytics" className="w-full flex justify-center">
            <div className="group relative">
              <button
                aria-label="Analytics"
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-md",
                  activePage === "analytics"
                    ? "bg-sidebar-accent"
                    : "hover:bg-sidebar-accent/70"
                )}
              >
                <BarChart3 className="w-5 h-5 text-sidebar-foreground" />
              </button>
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card px-2 py-1 rounded-md text-sm border border-border hidden group-hover:block">
                Analytics
              </span>
            </div>
          </a>
        </nav>

        {/* Bottom icons */}
        <div className="w-full flex flex-col items-center gap-2 pb-4">
          <a href="/settings" className="w-full flex justify-center">
            <div className="group relative">
              <button
                aria-label="Settings"
                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-sidebar-accent/70"
              >
                <Settings className="w-5 h-5 text-sidebar-foreground" />
              </button>
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card px-2 py-1 rounded-md text-sm border border-border hidden group-hover:block">
                Settings
              </span>
            </div>
          </a>

          <a href="/help" className="w-full flex justify-center">
            <div className="group relative">
              <button
                aria-label="Help & Support"
                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-sidebar-accent/70"
              >
                <HelpCircle className="w-5 h-5 text-sidebar-foreground" />
              </button>
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card px-2 py-1 rounded-md text-sm border border-border hidden group-hover:block">
                Help & Support
              </span>
            </div>
          </a>
        </div>
      </aside>

      {/* Desktop/full sidebar (visible from sm and up) */}
      <aside className="hidden sm:flex fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col border-r border-sidebar-border">
        {/* Logo */}
        <a
          href="/"
          className="p-4 border-b border-sidebar-border block"
          aria-label="Go to dashboard"
          title="Dashboard"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Store className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-sidebar-foreground">
                E-ims
              </h1>
              <p className="text-xs text-sidebar-foreground/60">
                Inventory Management
              </p>
            </div>
          </div>
        </a>

        {/* Store Selector */}
        <div className="p-3 border-b border-sidebar-border">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors">
            <div className="w-8 h-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-sidebar-primary">
                M
              </span>
            </div>
            <span className="flex-1 text-left text-sm font-medium text-sidebar-foreground">
              My Store
            </span>
            <ChevronDown className="w-4 h-4 text-sidebar-foreground/60" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <a href="/">
            <SidebarLink
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="Dashboard"
              active={activePage === "dashboard"}
            />
          </a>
          <a href="/orders">
            <SidebarLink
              icon={<ShoppingCart className="w-5 h-5" />}
              label="Orders"
              badge={12}
              active={activePage === "orders"}
            />
          </a>
          <a href="/products">
            <SidebarLink
              icon={<Package className="w-5 h-5" />}
              label="Products"
              active={activePage === "products"}
            />
          </a>
          <a href="/customers">
            <SidebarLink
              icon={<Users className="w-5 h-5" />}
              label="Customers"
              active={activePage === "customers"}
            />
          </a>
          <a href="/analytics">
            <SidebarLink
              icon={<BarChart3 className="w-5 h-5" />}
              label="Analytics"
              active={activePage === "analytics"}
            />
          </a>
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <SidebarLink
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
          />
          <SidebarLink
            icon={<HelpCircle className="w-5 h-5" />}
            label="Help & Support"
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
