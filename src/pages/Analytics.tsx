import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4000, orders: 240 },
  { month: "Feb", revenue: 3000, orders: 198 },
  { month: "Mar", revenue: 5000, orders: 320 },
  { month: "Apr", revenue: 4500, orders: 278 },
  { month: "May", revenue: 6000, orders: 389 },
  { month: "Jun", revenue: 5500, orders: 349 },
  { month: "Jul", revenue: 7000, orders: 430 },
  { month: "Aug", revenue: 6500, orders: 402 },
  { month: "Sep", revenue: 8000, orders: 498 },
  { month: "Oct", revenue: 7500, orders: 460 },
  { month: "Nov", revenue: 9000, orders: 550 },
  { month: "Dec", revenue: 10000, orders: 620 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "#008060" },
  { name: "Sports", value: 25, color: "#5c6ac4" },
  { name: "Home", value: 20, color: "#f49342" },
  { name: "Accessories", value: 15, color: "#50b83c" },
  { name: "Clothing", value: 5, color: "#9c6ade" },
];

const weeklyData = [
  { day: "Mon", sales: 1200, visitors: 320 },
  { day: "Tue", sales: 1800, visitors: 450 },
  { day: "Wed", sales: 1400, visitors: 380 },
  { day: "Thu", sales: 2200, visitors: 520 },
  { day: "Fri", sales: 2800, visitors: 680 },
  { day: "Sat", sales: 3200, visitors: 750 },
  { day: "Sun", sales: 2400, visitors: 580 },
];

const topProducts = [
  { name: "Wireless Headphones", sales: 245, revenue: 48755 },
  { name: "Smart Watch", sales: 189, revenue: 56511 },
  { name: "Running Shoes", sales: 156, revenue: 20274 },
  { name: "Laptop Stand", sales: 134, revenue: 6699 },
  { name: "Bluetooth Speaker", sales: 98, revenue: 8811 },
];

const Analytics = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$76,500",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Total Orders",
      value: "4,234",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "New Customers",
      value: "573",
      change: "+23.1%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Products Sold",
      value: "8,456",
      change: "-2.4%",
      trend: "down",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activePage="analytics" />
      <div className="ml-64">
        <Header />
        <main className="p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
              <p className="text-muted-foreground">
                Track your business performance
              </p>
            </div>
            <Select defaultValue="30d">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <Card
                key={stat.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span
                          className={
                            stat.trend === "up"
                              ? "text-green-600 text-sm"
                              : "text-red-600 text-sm"
                          }
                        >
                          {stat.change}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          vs last period
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue Chart */}
            <Card className="animate-fade-in stagger-2">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient
                          id="colorRevenue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#008060"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#008060"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                      <YAxis
                        stroke="#6b7280"
                        fontSize={12}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        formatter={(value: number) => [
                          `$${value.toLocaleString()}`,
                          "Revenue",
                        ]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#008060"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="animate-fade-in stagger-3">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`${value}%`, "Share"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {cat.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Performance & Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Performance */}
            <Card className="animate-fade-in stagger-4">
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="sales"
                        name="Sales ($)"
                        fill="#008060"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="visitors"
                        name="Visitors"
                        fill="#5c6ac4"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="animate-fade-in stagger-5">
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={product.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.sales} units sold
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-primary">
                        ${product.revenue.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Trend */}
          <Card className="mt-6 animate-fade-in">
            <CardHeader>
              <CardTitle>Orders Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#5c6ac4"
                      strokeWidth={2}
                      dot={{ fill: "#5c6ac4", strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
