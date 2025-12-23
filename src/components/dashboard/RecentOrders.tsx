import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "#ORD-7821", customer: "Sarah Johnson", email: "sarah@email.com", amount: "$249.00", status: "Completed", date: "Dec 23, 2024" },
  { id: "#ORD-7820", customer: "Mike Chen", email: "mike@email.com", amount: "$129.00", status: "Processing", date: "Dec 23, 2024" },
  { id: "#ORD-7819", customer: "Emma Wilson", email: "emma@email.com", amount: "$89.00", status: "Completed", date: "Dec 22, 2024" },
  { id: "#ORD-7818", customer: "James Brown", email: "james@email.com", amount: "$349.00", status: "Pending", date: "Dec 22, 2024" },
  { id: "#ORD-7817", customer: "Lisa Anderson", email: "lisa@email.com", amount: "$199.00", status: "Completed", date: "Dec 21, 2024" },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-accent text-primary border-primary/20",
  Processing: "bg-warning/10 text-warning border-warning/20",
  Pending: "bg-secondary text-muted-foreground border-border",
};

const RecentOrders = () => {
  return (
    <div className="bg-card rounded-xl border border-border opacity-0 animate-fade-in stagger-3">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
          <p className="text-sm text-muted-foreground">Latest customer orders</p>
        </div>
        <Button variant="outline" size="sm">View All</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Order</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Customer</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Amount</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Date</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="table-row-hover border-b border-border last:border-0">
                <td className="px-6 py-4">
                  <span className="font-medium text-foreground">{order.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-foreground">{order.amount}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className={statusStyles[order.status]}>
                    {order.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <span className="text-muted-foreground">{order.date}</span>
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;