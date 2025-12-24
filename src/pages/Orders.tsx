import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  Download,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: number;
  paymentMethod: string;
}

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    date: "2024-01-15",
    total: 299.99,
    status: "delivered",
    items: 3,
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2024-01-14",
    total: 149.5,
    status: "shipped",
    items: 2,
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-003",
    customer: "Bob Wilson",
    email: "bob@example.com",
    date: "2024-01-14",
    total: 89.99,
    status: "processing",
    items: 1,
    paymentMethod: "Debit Card",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    email: "alice@example.com",
    date: "2024-01-13",
    total: 459.0,
    status: "pending",
    items: 5,
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-005",
    customer: "Charlie Davis",
    email: "charlie@example.com",
    date: "2024-01-13",
    total: 199.99,
    status: "cancelled",
    items: 2,
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-006",
    customer: "Eva Martinez",
    email: "eva@example.com",
    date: "2024-01-12",
    total: 549.99,
    status: "delivered",
    items: 4,
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-007",
    customer: "Frank Lee",
    email: "frank@example.com",
    date: "2024-01-12",
    total: 79.99,
    status: "shipped",
    items: 1,
    paymentMethod: "Debit Card",
  },
  {
    id: "ORD-008",
    customer: "Grace Kim",
    email: "grace@example.com",
    date: "2024-01-11",
    total: 329.0,
    status: "processing",
    items: 3,
    paymentMethod: "PayPal",
  },
];

const statusColors = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  processing:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  shipped:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  delivered:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const exportOrders = () => {
    const csv = [
      ["Order ID", "Customer", "Email", "Date", "Total", "Status", "Items"],
      ...filteredOrders.map((o) => [
        o.id,
        o.customer,
        o.email,
        o.date,
        o.total,
        o.status,
        o.items,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    toast.success("Orders exported successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activePage="orders" />
      <div className="ml-64">
        <Header />
        <main className="p-6 animate-fade-in">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground">
              Manage and track your orders
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportOrders}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Orders Table */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow
                    key={order.id}
                    className="animate-fade-in hover:bg-muted/30 transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="font-semibold">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={statusColors[order.status]}
                        variant="secondary"
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>
                                Order Details - {order.id}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Customer
                                  </p>
                                  <p className="font-medium">
                                    {order.customer}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Email
                                  </p>
                                  <p className="font-medium">{order.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Order Date
                                  </p>
                                  <p className="font-medium">{order.date}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Payment
                                  </p>
                                  <p className="font-medium">
                                    {order.paymentMethod}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Items
                                  </p>
                                  <p className="font-medium">{order.items}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Total
                                  </p>
                                  <p className="font-bold text-primary">
                                    ${order.total.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Status
                                </p>
                                <Badge
                                  className={statusColors[order.status]}
                                  variant="secondary"
                                >
                                  {order.status.charAt(0).toUpperCase() +
                                    order.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "processing")
                              }
                            >
                              Mark as Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "shipped")
                              }
                            >
                              Mark as Shipped
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "delivered")
                              }
                            >
                              Mark as Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "cancelled")
                              }
                              className="text-destructive"
                            >
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Orders;
