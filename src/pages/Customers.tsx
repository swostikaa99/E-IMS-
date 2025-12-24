import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, Plus, Mail, Phone, MapPin, MoreHorizontal, UserPlus, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  totalSpent: number;
  status: "active" | "inactive";
  joinDate: string;
}

const initialCustomers: Customer[] = [
  { id: "CUS-001", name: "John Doe", email: "john@example.com", phone: "+1 234-567-8901", location: "New York, USA", orders: 15, totalSpent: 2450.00, status: "active", joinDate: "2023-06-15" },
  { id: "CUS-002", name: "Jane Smith", email: "jane@example.com", phone: "+1 234-567-8902", location: "Los Angeles, USA", orders: 8, totalSpent: 1280.50, status: "active", joinDate: "2023-08-22" },
  { id: "CUS-003", name: "Bob Wilson", email: "bob@example.com", phone: "+1 234-567-8903", location: "Chicago, USA", orders: 3, totalSpent: 459.99, status: "inactive", joinDate: "2023-10-10" },
  { id: "CUS-004", name: "Alice Brown", email: "alice@example.com", phone: "+1 234-567-8904", location: "Houston, USA", orders: 22, totalSpent: 5670.00, status: "active", joinDate: "2023-03-05" },
  { id: "CUS-005", name: "Charlie Davis", email: "charlie@example.com", phone: "+1 234-567-8905", location: "Phoenix, USA", orders: 11, totalSpent: 1890.75, status: "active", joinDate: "2023-07-18" },
  { id: "CUS-006", name: "Eva Martinez", email: "eva@example.com", phone: "+1 234-567-8906", location: "Philadelphia, USA", orders: 5, totalSpent: 720.00, status: "inactive", joinDate: "2023-11-02" },
  { id: "CUS-007", name: "Frank Lee", email: "frank@example.com", phone: "+1 234-567-8907", location: "San Antonio, USA", orders: 19, totalSpent: 3450.25, status: "active", joinDate: "2023-04-12" },
  { id: "CUS-008", name: "Grace Kim", email: "grace@example.com", phone: "+1 234-567-8908", location: "San Diego, USA", orders: 7, totalSpent: 980.00, status: "active", joinDate: "2023-09-28" },
];

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", location: "" });
  };

  const handleAddCustomer = () => {
    const newCustomer: Customer = {
      id: `CUS-${String(customers.length + 1).padStart(3, "0")}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      orders: 0,
      totalSpent: 0,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
    };
    setCustomers([...customers, newCustomer]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("Customer added successfully");
  };

  const toggleCustomerStatus = (customerId: string) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId
          ? { ...c, status: c.status === "active" ? "inactive" : "active" }
          : c
      )
    );
    toast.success("Customer status updated");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activePage="customers" />
      <div className="ml-64">
        <Header />
        <main className="p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Customers</h1>
              <p className="text-muted-foreground">Manage your customer relationships</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="customer@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 234-567-8900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddCustomer}
                    disabled={!formData.name || !formData.email}
                  >
                    Add Customer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold text-foreground">{totalCustomers}</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Customers</p>
                  <p className="text-2xl font-bold text-foreground">{activeCustomers}</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">$</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Customers Table */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer, index) => (
                  <TableRow
                    key={customer.id}
                    className="animate-fade-in hover:bg-muted/30 transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">{customer.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        {customer.location}
                      </div>
                    </TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell className="font-semibold">${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          customer.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                        }
                      >
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedCustomer(customer)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleCustomerStatus(customer.id)}>
                            {customer.status === "active" ? "Mark Inactive" : "Mark Active"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No customers found</p>
            </div>
          )}

          {/* Customer Details Dialog */}
          <Dialog open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Customer Details</DialogTitle>
              </DialogHeader>
              {selectedCustomer && (
                <div className="space-y-4 mt-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xl">
                        {getInitials(selectedCustomer.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedCustomer.id}</p>
                      <Badge
                        variant="secondary"
                        className={
                          selectedCustomer.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mt-1"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 mt-1"
                        }
                      >
                        {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCustomer.location}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-xl font-bold">{selectedCustomer.orders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="text-xl font-bold text-primary">${selectedCustomer.totalSpent.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Customer Since</p>
                    <p className="font-medium">{selectedCustomer.joinDate}</p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default Customers;