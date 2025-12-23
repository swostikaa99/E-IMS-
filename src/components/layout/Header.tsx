import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search products, orders, customers..." 
          className="pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
        
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>

        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
          <span className="text-sm font-semibold text-primary-foreground">JD</span>
        </div>
      </div>
    </header>
  );
};

export default Header;