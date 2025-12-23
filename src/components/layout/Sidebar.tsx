import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  HelpCircle,
  ChevronDown,
  Store
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}

const SidebarLink = ({ icon, label, active, badge, onClick }: SidebarLinkProps) => (
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

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Store className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-sidebar-foreground">E-ims</h1>
            <p className="text-xs text-sidebar-foreground/60">Inventory Management</p>
          </div>
        </div>
      </div>

      {/* Store Selector */}
      <div className="p-3 border-b border-sidebar-border">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-sidebar-primary">M</span>
          </div>
          <span className="flex-1 text-left text-sm font-medium text-sidebar-foreground">My Store</span>
          <ChevronDown className="w-4 h-4 text-sidebar-foreground/60" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <SidebarLink 
          icon={<LayoutDashboard className="w-5 h-5" />} 
          label="Dashboard" 
          active 
        />
        <SidebarLink 
          icon={<ShoppingCart className="w-5 h-5" />} 
          label="Orders" 
          badge={12}
        />
        <SidebarLink 
          icon={<Package className="w-5 h-5" />} 
          label="Products" 
        />
        <SidebarLink 
          icon={<Users className="w-5 h-5" />} 
          label="Customers" 
        />
        <SidebarLink 
          icon={<BarChart3 className="w-5 h-5" />} 
          label="Analytics" 
        />
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
  );
};

export default Sidebar;