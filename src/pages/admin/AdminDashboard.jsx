import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  Users,
  Package,
  Tag,
  ShoppingCart,
  Star,
  Palette,
  LayoutGrid,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import AdminPageLayout from "../../components/AdminPageLayout";

const sections = [
  { name: "Dashboard", icon: <BarChart2 />, key: "dashboard" },
  { name: "Users", icon: <Users />, key: "users" },
  { name: "Categories", icon: <LayoutGrid />, key: "categories" },
  { name: "Products", icon: <Package />, key: "products" },
  { name: "Orders", icon: <ShoppingCart />, key: "orders" },
  { name: "Colors", icon: <Palette />, key: "colors" },
  { name: "Brands", icon: <Tag />, key: "brands" },
  { name: "Reviews", icon: <Star />, key: "reviews" },
];

const COLORS = ["#3bc9db", "#6c757d", "#e9ecef"];

const targetData = [
  { name: "Weekly Target", value: 234455, color: COLORS[0] },
  { name: "Monthly Target", value: 1900000, color: COLORS[1] },
];

const revenueData = [
  { name: "Week 1", revenue: 300000 },
  { name: "Week 2", revenue: 450000 },
  { name: "Week 3", revenue: 600000 },
  { name: "Week 4", revenue: 550000 },
  { name: "Week 5", revenue: 700000 },
  { name: "Week 6", revenue: 650000 },
  { name: "Week 7", revenue: 800000 },
  { name: "Week 8", revenue: 750000 },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent>
          <h2 className="text-lg font-bold mb-4">Targets</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={targetData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                label
              >
                {targetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around mt-4 text-sm">
            {targetData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  style={{ backgroundColor: entry.color }}
                  className="w-3 h-3 rounded-full"
                ></div>
                <span>{entry.name}</span>
                <span>${entry.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-lg font-bold mb-4">Revenue Made</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3bc9db" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "users":
        return <div>Manage Users</div>;
      case "categories":
        return <div>Manage Categories</div>;
      case "products":
        return <div>Manage Products</div>;
      case "orders":
        return <div>Manage Orders</div>;
      case "colors":
        return <div>Manage Colors</div>;
      case "brands":
        return <div>Manage Brands</div>;
      case "reviews":
        return <div>Manage Reviews</div>;
      case "dashboard":
      default:
        return renderDashboard();
    }
  };

  return (
    <AdminPageLayout>
      <div className="flex h-screen flex-col p-6 overflow-y-auto">
        {renderSection()}
      </div>
    </AdminPageLayout>
  );
}
