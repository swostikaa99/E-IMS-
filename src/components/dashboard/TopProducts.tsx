import { TrendingUp } from "lucide-react";

const products = [
  { name: "Wireless Headphones Pro", sales: 1234, revenue: "$61,700", trend: 12, image: "🎧" },
  { name: "Smart Watch Series X", sales: 987, revenue: "$49,350", trend: 8, image: "⌚" },
  { name: "Portable Charger 20K", sales: 856, revenue: "$25,680", trend: 15, image: "🔋" },
  { name: "Bluetooth Speaker Mini", sales: 743, revenue: "$22,290", trend: -3, image: "🔊" },
];

const TopProducts = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 opacity-0 animate-fade-in stagger-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Top Products</h2>
          <p className="text-sm text-muted-foreground">Best selling this month</p>
        </div>
        <TrendingUp className="w-5 h-5 text-primary" />
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div 
            key={product.name} 
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-2xl">
              {product.image}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{product.name}</p>
              <p className="text-sm text-muted-foreground">{product.sales} sales</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{product.revenue}</p>
              <p className={`text-xs ${product.trend >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {product.trend >= 0 ? '+' : ''}{product.trend}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;