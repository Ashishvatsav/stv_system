'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Download,
  Shield,
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'TRAFFIC_OFFICER' | 'REVIEW_OFFICER' | 'CITIZEN';
  status: 'Active' | 'Inactive';
  createdDate: string;
}

const users: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@admin.com',
    phone: '+91 98765 43210',
    role: 'ADMIN',
    status: 'Active',
    createdDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Alice Johnson',
    email: 'alice.johnson@officer.com',
    phone: '+91 97654 32109',
    role: 'TRAFFIC_OFFICER',
    status: 'Active',
    createdDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Bob Williams',
    email: 'bob.williams@reviewer.com',
    phone: '+91 96543 21098',
    role: 'REVIEW_OFFICER',
    status: 'Active',
    createdDate: '2023-03-10',
  },
  {
    id: '4',
    name: 'Jane Davis',
    email: 'jane.davis@citizen.com',
    phone: '+91 95432 10987',
    role: 'CITIZEN',
    status: 'Active',
    createdDate: '2024-01-05',
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string | null>(null);

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchRole = !filterRole || u.role === filterRole;

    return matchSearch && matchRole;
  });

  const userStats = {
    total: users.length,
    admin: users.filter((u) => u.role === 'ADMIN').length,
    officers: users.filter((u) => u.role === 'TRAFFIC_OFFICER').length,
    reviewers: users.filter((u) => u.role === 'REVIEW_OFFICER').length,
    citizens: users.filter((u) => u.role === 'CITIZEN').length,
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800';
      case 'TRAFFIC_OFFICER':
        return 'bg-blue-100 text-blue-800';
      case 'REVIEW_OFFICER':
        return 'bg-purple-100 text-purple-800';
      case 'CITIZEN':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
          <p className="text-muted-foreground">Create and manage system users</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        <StatCard label="Total Users" value={userStats.total} color="blue" />
        <StatCard label="Admins" value={userStats.admin} color="red" />
        <StatCard label="Officers" value={userStats.officers} color="blue" />
        <StatCard label="Reviewers" value={userStats.reviewers} color="purple" />
        <StatCard label="Citizens" value={userStats.citizens} color="green" />
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterRole || ''}
              onChange={(e) => setFilterRole(e.target.value || null)}
              className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="TRAFFIC_OFFICER">Traffic Officer</option>
              <option value="REVIEW_OFFICER">Review Officer</option>
              <option value="CITIZEN">Citizen</option>
            </select>
            <Button variant="outline" className="w-full md:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
          <CardDescription>
            {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                          {user.name.charAt(0)}
                        </div>
                        <p className="font-medium text-foreground">{user.name}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-4 px-4 text-muted-foreground">{user.phone}</td>
                    <td className="py-4 px-4">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {user.role.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-xs">{user.createdDate}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">No users found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions Overview</CardTitle>
          <CardDescription>Access levels for each role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                role: 'ADMIN',
                permissions: ['User Management', 'System Configuration', 'View All Data', 'Generate Reports'],
              },
              {
                role: 'TRAFFIC_OFFICER',
                permissions: ['Issue Tickets', 'View Violations', 'Track Payments'],
              },
              {
                role: 'REVIEW_OFFICER',
                permissions: ['Review Disputes', 'Approve/Reject Appeals', 'View Dispute Reports'],
              },
              {
                role: 'CITIZEN',
                permissions: ['View Own Violations', 'Pay Fines', 'Raise Disputes', 'Manage Vehicles'],
              },
            ].map((roleData) => (
              <div key={roleData.role} className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold text-foreground">{roleData.role.replace(/_/g, ' ')}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {roleData.permissions.map((perm) => (
                    <span key={perm} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                      ✓ {perm}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
    green: 'bg-green-100 text-green-800',
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
            <Users className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
