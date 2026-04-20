'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  FileText,
} from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground">View system statistics and generate reports</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <MetricCard
          label="Total Revenue"
          value="₹45.8L"
          change="+12.5%"
          icon={<DollarSign className="w-6 h-6" />}
          color="green"
          trend="up"
        />
        <MetricCard
          label="Total Violations"
          value="3,450"
          change="+8.2%"
          icon={<AlertCircle className="w-6 h-6" />}
          color="orange"
          trend="up"
        />
        <MetricCard
          label="Collection Rate"
          value="87%"
          change="+3.1%"
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="blue"
          trend="up"
        />
        <MetricCard
          label="Dispute Rate"
          value="4.2%"
          change="-1.2%"
          icon={<TrendingDown className="w-6 h-6" />}
          color="purple"
          trend="down"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Violation by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Violations by Type</CardTitle>
            <CardDescription>Most common violations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'Speeding', count: 1200, percentage: 35 },
              { name: 'Signal Jump', count: 850, percentage: 25 },
              { name: 'Wrong Parking', count: 680, percentage: 20 },
              { name: 'No Helmet', count: 450, percentage: 13 },
              { name: 'Others', count: 270, percentage: 7 },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <span className="text-xs text-muted-foreground">{item.count}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { month: 'Oct 2024', violations: 450, revenue: '₹6.8L' },
              { month: 'Nov 2024', violations: 520, revenue: '₹7.2L' },
              { month: 'Dec 2024', violations: 580, revenue: '₹8.1L' },
              { month: 'Jan 2025', violations: 610, revenue: '₹8.5L' },
              { month: 'Feb 2025', violations: 670, revenue: '₹9.3L' },
              { month: 'Mar 2025', violations: 620, revenue: '₹8.9L' },
            ].map((item) => (
              <div key={item.month} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm text-foreground font-medium">{item.month}</span>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{item.violations} violations</p>
                  <p className="text-sm font-semibold text-primary">{item.revenue}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods Used</CardTitle>
            <CardDescription>Distribution of payment methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { method: 'Online Payment', percentage: 45, color: 'bg-blue-500' },
              { method: 'Credit Card', percentage: 28, color: 'bg-green-500' },
              { method: 'UPI', percentage: 18, color: 'bg-orange-500' },
              { method: 'Bank Transfer', percentage: 9, color: 'bg-purple-500' },
            ].map((item) => (
              <div key={item.method}>
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">{item.method}</p>
                  <span className="text-xs text-muted-foreground">{item.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Reports</CardTitle>
          <CardDescription>Download detailed analytics reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Violation Report',
                description: 'Detailed list of all violations with status',
                icon: <AlertCircle className="w-5 h-5" />,
              },
              {
                title: 'Revenue Report',
                description: 'Payment collection and revenue analysis',
                icon: <DollarSign className="w-5 h-5" />,
              },
              {
                title: 'Dispute Report',
                description: 'Dispute resolution statistics and trends',
                icon: <FileText className="w-5 h-5" />,
              },
              {
                title: 'Officer Performance',
                description: 'Individual officer statistics and metrics',
                icon: <BarChart3 className="w-5 h-5" />,
              },
            ].map((report) => (
              <div
                key={report.title}
                className="border border-border rounded-lg p-4 flex items-start justify-between hover:bg-muted/50 transition-colors"
              >
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
                <Button size="sm" variant="outline" className="ml-3">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
          <CardDescription>Build reports with custom filters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Date Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Violation Type
                </label>
                <select className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>All Types</option>
                  <option>Speeding</option>
                  <option>Signal Jump</option>
                  <option>Wrong Parking</option>
                  <option>No Helmet</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Payment Status
                </label>
                <select className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>All</option>
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline">Reset</Button>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
          <CardDescription>This month's summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { label: 'Violations Issued', value: '620', unit: 'tickets', color: 'text-orange-600' },
              { label: 'Revenue Generated', value: '₹8.9L', unit: 'collected', color: 'text-green-600' },
              { label: 'Avg. Resolution Time', value: '5.2', unit: 'days', color: 'text-blue-600' },
              { label: 'Dispute Success Rate', value: '34%', unit: 'approved', color: 'text-purple-600' },
              { label: 'System Uptime', value: '99.8%', unit: 'available', color: 'text-emerald-600' },
            ].map((kpi) => (
              <div key={kpi.label} className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{kpi.label}</p>
                <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{kpi.unit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({
  label,
  value,
  change,
  icon,
  color,
  trend,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
  trend: 'up' | 'down';
}) {
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    orange: 'bg-orange-100 text-orange-800',
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'} mt-2`}>
              {trend === 'up' ? '↑' : '↓'} {change}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
