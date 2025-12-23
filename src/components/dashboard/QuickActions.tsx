import { Package, FileText, Tag, Truck } from "lucide-react";

const actions = [
  { icon: Package, label: "Add Product", description: "List new inventory", color: "bg-primary" },
  { icon: FileText, label: "Create Order", description: "Process new sale", color: "bg-warning" },
  { icon: Tag, label: "Run Discount", description: "Set up promotion", color: "bg-destructive" },
  { icon: Truck, label: "Track Shipment", description: "Monitor delivery", color: "bg-accent-foreground" },
];

const QuickActions = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 opacity-0 animate-fade-in stagger-2">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-muted transition-all duration-200 hover:scale-[1.02] group"
          >
            <div className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
              <action.icon className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="text-left">
              <p className="font-medium text-sm text-foreground">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;