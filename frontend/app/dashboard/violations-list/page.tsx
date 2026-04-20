'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface Violation {
  id: string;
  ticketNumber: string;
  vehicle: string;
  violation: string;
  date: string;
  location: string;
  fine: string;
  status: 'Pending' | 'Paid' | 'Overdue' | 'Disputed';
  issuedBy: string;
}

const violations: Violation[] = [
  {
    id: '1',
    ticketNumber: 'TK-2024-001',
    vehicle: 'KA-01-AB-1234',
    violation: 'Speeding',
    date: '2024-03-15',
    location: 'Main Street',
    fine: '₹1,500',
    status: 'Pending',
    issuedBy: 'Officer John Smith',
  },
  {
    id: '2',
    ticketNumber: 'TK-2024-002',
    vehicle: 'KA-01-CD-5678',
    violation: 'Signal Jump',
    date: '2024-03-14',
    location: 'City Center',
    fine: '₹2,000',
    status: 'Paid',
    issuedBy: 'Officer Jane Doe',
  },
  {
    id: '3',
    ticketNumber: 'TK-2024-003',
    vehicle: 'KA-01-XY-9999',
    violation: 'No Helmet',
    date: '2024-03-13',
    location: 'Highway',
    fine: '₹500',
    status: 'Overdue',
    issuedBy: 'Officer Mike Wilson',
  },
];

export default function ViolationsListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredViolations = violations.filter((v) => {
    const matchSearch =
      v.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.violation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = !filterStatus || v.status === filterStatus;

    return matchSearch && matchStatus;
  });

  const stats = {
    total: violations.length,
    pending: violations.filter((v) => v.status === 'Pending').length,
    paid: violations.filter((v) => v.status === 'Paid').length,
    overdue: violations.filter((v) => v.status === 'Overdue').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">All Violations</h1>
        <p className="text-muted-foreground">View and manage all traffic violations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard
          label="Total Violations"
          value={stats.total}
          icon={<FileText className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          label="Pending Payment"
          value={stats.pending}
          icon={<Clock className="w-5 h-5" />}
          color="orange"
        />
        <StatCard
          label="Paid"
          value={stats.paid}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="green"
        />
        <StatCard
          label="Overdue"
          value={stats.overdue}
          icon={<AlertCircle className="w-5 h-5" />}
          color="red"
        />
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by ticket, vehicle, or violation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="w-full md:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Violations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Violation Records</CardTitle>
          <CardDescription>
            {filteredViolations.length} violation{filteredViolations.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Ticket</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Vehicle</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Violation</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Fine</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredViolations.map((violation) => (
                  <tr
                    key={violation.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium text-foreground">
                      {violation.ticketNumber}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{violation.vehicle}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-foreground font-medium">{violation.violation}</p>
                        <p className="text-xs text-muted-foreground">{violation.location}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{violation.date}</td>
                    <td className="py-4 px-4 text-muted-foreground">{violation.location}</td>
                    <td className="py-4 px-4 font-semibold text-foreground">{violation.fine}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          violation.status === 'Pending'
                            ? 'bg-orange-100 text-orange-800'
                            : violation.status === 'Paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {violation.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredViolations.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">No violations found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Summary</CardTitle>
          <CardDescription>Key metrics for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <p className="text-sm text-muted-foreground">Most Common Violation</p>
              </div>
              <p className="text-2xl font-bold text-foreground">Speeding</p>
              <p className="text-xs text-muted-foreground mt-1">34% of all violations</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <p className="text-sm text-muted-foreground">Avg. Collection Time</p>
              </div>
              <p className="text-2xl font-bold text-foreground">8.5 days</p>
              <p className="text-xs text-muted-foreground mt-1">From issue to payment</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <p className="text-sm text-muted-foreground">Collection Rate</p>
              </div>
              <p className="text-2xl font-bold text-foreground">87%</p>
              <p className="text-xs text-muted-foreground mt-1">Of violations paid on time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    orange: 'bg-orange-100 text-orange-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
