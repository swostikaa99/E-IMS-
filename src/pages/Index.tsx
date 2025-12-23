import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MetricCard from "@/components/dashboard/MetricCard";
import RecentOrders from "@/components/dashboard/RecentOrders";
import TopProducts from "@/components/dashboard/TopProducts";
import QuickActions from "@/components/dashboard/QuickActions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64">
        <Header />
        
        <main className="p-6">
          {/* Page Title */}
          <div className="mb-8 opacity-0 animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Revenue"
              value="$45,231.89"
              change={20.1}
              changeLabel="vs last month"
              icon={DollarSign}
              className="stagger-1"
            />
            <MetricCard
              title="Orders"
              value="2,345"
              change={15.3}
              changeLabel="vs last month"
              icon={ShoppingCart}
              className="stagger-2"
            />
            <MetricCard
              title="Customers"
              value="1,234"
              change={8.2}
              changeLabel="vs last month"
              icon={Users}
              className="stagger-3"
            />
            <MetricCard
              title="Conversion"
              value="3.24%"
              change={-2.4}
              changeLabel="vs last month"
              icon={TrendingUp}
              className="stagger-4"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders - Takes 2 columns */}
            <div className="lg:col-span-2">
              <RecentOrders />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <QuickActions />
              <TopProducts />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;