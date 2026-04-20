'use client';

import { useAuth } from '@/lib/auth-context';
import { mockViolations, mockDisputes, mockPayments, mockIssuedTickets } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Clock, CreditCard, FileText, TrendingUp, ArrowRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/ui-utils';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  const getDashboardContent = () => {
    switch (user.role) {
      case 'citizen':
        return <CitizenDashboard />;
      case 'traffic_officer':
        return <TrafficOfficerDashboard />;
      case 'review_officer':
        return <ReviewOfficerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <CitizenDashboard />;
    }
  };

  return getDashboardContent();
}

function CitizenDashboard() {
  const { user } = useAuth();
  const userViolations = mockViolations.filter(v => v.citizenId === user?.id);
  const pendingViolations = userViolations.filter(v => v.status === 'pending' || v.status === 'overdue');
  const paidViolations = userViolations.filter(v => v.status === 'paid');
  const totalFines = userViolations.reduce((sum, v) => sum + v.fine, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="opacity-90">Stay updated with your violations and payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Active Violations"
          value={pendingViolations.length.toString()}
          icon={<AlertCircle className="w-6 h-6" />}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
        <MetricCard
          label="Paid Violations"
          value={paidViolations.length.toString()}
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <MetricCard
          label="Total Fines"
          value={formatCurrency(totalFines)}
          icon={<CreditCard className="w-6 h-6" />}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <MetricCard
          label="Vehicles"
          value={mockViolations.filter(v => v.citizenId === user?.id).length.toString()}
          icon={<TrendingUp className="w-6 h-6" />}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Recent Violations</CardTitle>
            <CardDescription>Your latest traffic violations</CardDescription>
          </div>
          <Link href="/dashboard/violations">
            <Button variant="outline" size="sm">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {pendingViolations.length > 0 ? (
            <div className="space-y-3">
              {pendingViolations.slice(0, 3).map(violation => (
                <div key={violation.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors">
                  <div>
                    <p className="font-medium text-foreground">{violation.violationType}</p>
                    <p className="text-sm text-muted-foreground">{violation.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{formatCurrency(violation.fine)}</p>
                    <p className={`text-xs capitalize ${violation.status === 'pending' ? 'text-orange-600' : 'text-red-600'}`}>
                      {violation.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-6">No pending violations</p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/dashboard/violations" className="block">
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="mr-2 w-4 h-4" />
                View My Violations
              </Button>
            </Link>
            <Link href="/dashboard/payments" className="block">
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 w-4 h-4" />
                Pay Violations
              </Button>
            </Link>
            <Link href="/dashboard/vehicles" className="block">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 w-4 h-4" />
                Manage Vehicles
              </Button>
            </Link>
            <Link href="/dashboard/disputes" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 w-4 h-4" />
                Dispute Violations
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockPayments.filter(p => p.citizenId === user?.id).length > 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Paid</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(mockPayments.filter(p => p.citizenId === user?.id && p.status === 'success').reduce((sum, p) => sum + p.amount, 0))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Pending Payments</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(mockPayments.filter(p => p.citizenId === user?.id && p.status === 'pending').reduce((sum, p) => sum + p.amount, 0))}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground py-6">No payments yet</p>
            )}
            <Link href="/dashboard/payments" className="block mt-4">
              <Button className="w-full">Make a Payment</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TrafficOfficerDashboard() {
  const { user } = useAuth();
  const officerTickets = mockIssuedTickets.filter(t => t.officerId === user?.id);
  const totalFines = mockViolations.filter(v => officerTickets.find(t => t.violationId === v.id)).reduce((sum, v) => sum + v.fine, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Traffic Officer Dashboard</h1>
        <p className="opacity-90">Manage traffic violations and issue tickets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Tickets Issued"
          value={officerTickets.length.toString()}
          icon={<FileText className="w-6 h-6" />}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <MetricCard
          label="Total Fines"
          value={formatCurrency(totalFines)}
          icon={<CreditCard className="w-6 h-6" />}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <MetricCard
          label="Paid Violations"
          value={mockIssuedTickets.filter(t => t.officerId === user?.id && t.status === 'paid').length.toString()}
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <MetricCard
          label="Pending"
          value={mockIssuedTickets.filter(t => t.officerId === user?.id && t.status === 'issued').length.toString()}
          icon={<Clock className="w-6 h-6" />}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/dashboard/issue-ticket" className="block">
              <Button className="w-full justify-start">
                <FileText className="mr-2 w-4 h-4" />
                Issue New Ticket
              </Button>
            </Link>
            <Link href="/dashboard/violations-list" className="block">
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="mr-2 w-4 h-4" />
                View Violations
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Success Rate</span>
              <span className="font-semibold">98%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Average Fine</span>
              <span className="font-semibold">{formatCurrency(totalFines / Math.max(officerTickets.length, 1))}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ReviewOfficerDashboard() {
  const { user } = useAuth();
  const openDisputes = mockDisputes.filter(d => d.status === 'open');
  const resolvedDisputes = mockDisputes.filter(d => d.status !== 'open');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Dispute Review Dashboard</h1>
        <p className="opacity-90">Review and resolve traffic violation disputes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Open Disputes"
          value={openDisputes.length.toString()}
          icon={<AlertCircle className="w-6 h-6" />}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
        <MetricCard
          label="Resolved"
          value={resolvedDisputes.length.toString()}
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <MetricCard
          label="Approval Rate"
          value="75%"
          icon={<TrendingUp className="w-6 h-6" />}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open Disputes</CardTitle>
          <CardDescription>Disputes awaiting your review</CardDescription>
        </CardHeader>
        <CardContent>
          {openDisputes.length > 0 ? (
            <div className="space-y-3">
              {openDisputes.map(dispute => (
                <div key={dispute.id} className="p-3 border rounded-lg hover:bg-muted transition-colors">
                  <p className="font-medium text-foreground">{dispute.reason}</p>
                  <p className="text-sm text-muted-foreground mt-1">{dispute.description}</p>
                  <Link href="/dashboard/disputes" className="text-sm text-primary hover:text-primary/90 mt-2 inline-block">
                    Review Dispute <ArrowRight className="inline w-3 h-3 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-6">No open disputes</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AdminDashboard() {
  const totalViolations = mockViolations.length;
  const totalDisputes = mockDisputes.length;
  const totalFines = mockViolations.reduce((sum, v) => sum + v.fine, 0);
  const totalCollected = mockPayments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">System Administration</h1>
        <p className="opacity-90">Manage users, violations, and system reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total Violations"
          value={totalViolations.toString()}
          icon={<AlertCircle className="w-6 h-6" />}
          color="text-red-600"
          bgColor="bg-red-100"
        />
        <MetricCard
          label="Total Fines"
          value={formatCurrency(totalFines)}
          icon={<CreditCard className="w-6 h-6" />}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <MetricCard
          label="Revenue Collected"
          value={formatCurrency(totalCollected)}
          icon={<TrendingUp className="w-6 h-6" />}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <MetricCard
          label="Open Disputes"
          value={mockDisputes.filter(d => d.status === 'open').length.toString()}
          icon={<Clock className="w-6 h-6" />}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/dashboard/users" className="block">
              <Button className="w-full justify-start">
                <FileText className="mr-2 w-4 h-4" />
                Manage Users
              </Button>
            </Link>
            <Link href="/dashboard/reports" className="block">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 w-4 h-4" />
                Generate Reports
              </Button>
            </Link>
            <Link href="/dashboard/violations-list" className="block">
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="mr-2 w-4 h-4" />
                View All Violations
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Collection Rate</span>
              <span className="font-semibold">{((totalCollected / totalFines) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pending Disputes</span>
              <span className="font-semibold">{mockDisputes.filter(d => d.status === 'open').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Resolution Rate</span>
              <span className="font-semibold">
                {((mockDisputes.filter(d => d.status !== 'open').length / mockDisputes.length) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
  color,
  bgColor,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl md:text-3xl font-bold text-foreground mt-2">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${bgColor} ${color}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
