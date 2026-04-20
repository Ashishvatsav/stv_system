'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { mockViolations, mockDisputes } from '@/lib/mock-data';
import { DataTable, type Column } from '@/components/data-table';
import { Modal } from '@/components/modal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Eye, FileText, DollarSign, Scale } from 'lucide-react';
import { formatDate, formatCurrency, getStatusColor } from '@/lib/ui-utils';
import Link from 'next/link';

interface Violation {
  id: string;
  citizenId: string;
  violationType: string;
  fine: number;
  status: string;
  location: string;
  dateTime: string;
  description: string;
  photoUrl: string;
}

export default function ViolationsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isDisputing, setIsDisputing] = useState(false);

  // Get user's violations
  const userViolations = mockViolations.filter(v => v.citizenId === user?.id) as Violation[];

  const columns: Column<Violation>[] = [
    {
      key: 'violationType',
      header: 'Violation Type',
      sortable: true,
    },
    {
      key: 'dateTime',
      header: 'Date',
      sortable: true,
      render: (value) => formatDate(value),
      width: 'w-28',
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
    },
    {
      key: 'fine',
      header: 'Fine Amount',
      sortable: true,
      render: (value) => formatCurrency(value),
      width: 'w-32',
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${getStatusColor(value)}`}>
          {value}
        </span>
      ),
      width: 'w-20',
    },
  ];

  const handleViewDetails = (violation: Violation) => {
    setSelectedViolation(violation);
    setIsViewModalOpen(true);
  };

  const handlePayViolation = async (violationId: string) => {
    setIsPaying(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update violation status to paid
      const violation = mockViolations.find(v => v.id === violationId) as any;
      if (violation) {
        violation.status = 'paid';
        violation.paidDate = new Date().toISOString();
        violation.paymentMethod = 'online';
      }

      setIsViewModalOpen(false);
      // Refresh the page
      router.refresh();
    } finally {
      setIsPaying(false);
    }
  };

  const handleDispute = async (violationId: string, reason: string) => {
    setIsDisputing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      // Create dispute
      const violation = mockViolations.find(v => v.id === violationId) as any;
      if (violation) {
        violation.status = 'disputed';
        
        const newDispute: any = {
          id: `d${Date.now()}`,
          violationId,
          citizenId: user?.id || '',
          status: 'open',
          reason,
          description: reason,
          filedDate: new Date().toISOString(),
          reviewerId: '3',
          remarks: null,
          decision: null,
        };
        mockDisputes.push(newDispute);
      }

      setIsViewModalOpen(false);
      router.refresh();
    } finally {
      setIsDisputing(false);
    }
  };

  const pendingViolations = userViolations.filter(v => v.status === 'pending' || v.status === 'overdue');
  const paidViolations = userViolations.filter(v => v.status === 'paid');
  const disputedViolations = userViolations.filter(v => v.status === 'disputed');
  const totalAmount = userViolations.reduce((sum, v) => sum + v.fine, 0);
  const pendingAmount = pendingViolations.reduce((sum, v) => sum + v.fine, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Violations</h1>
        <p className="text-muted-foreground">View and manage your traffic violations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Violations</p>
                <p className="text-2xl font-bold text-foreground mt-2">{userViolations.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground mt-2">{pendingViolations.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold text-foreground mt-2">{paidViolations.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Amount Due</p>
                <p className="text-2xl font-bold text-foreground mt-2">{formatCurrency(pendingAmount)}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-100 text-red-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Violations Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Violations</CardTitle>
          <CardDescription>Click on a violation to view details or take action</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable<Violation>
            data={userViolations}
            columns={columns}
            searchFields={['violationType', 'location', 'description']}
            onRowClick={handleViewDetails}
            actions={(violation) => (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewDetails(violation)}
              >
                <Eye className="w-4 h-4" />
              </Button>
            )}
          />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {pendingViolations.length > 0 && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground mb-1">You have {pendingViolations.length} pending violation(s)</p>
              <p className="text-sm text-muted-foreground">Amount due: {formatCurrency(pendingAmount)}</p>
            </div>
            <Link href="/dashboard/payments">
              <Button>
                <DollarSign className="w-4 h-4 mr-2" />
                Pay Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Detail Modal */}
      {selectedViolation && (
        <Modal
          isOpen={isViewModalOpen}
          title="Violation Details"
          onClose={() => setIsViewModalOpen(false)}
          size="lg"
        >
          <div className="space-y-6">
            {/* Violation Image */}
            <div className="rounded-lg overflow-hidden bg-muted border border-border">
              <img
                src={selectedViolation.photoUrl}
                alt="Violation"
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Violation Type</p>
                <p className="text-foreground font-medium mt-1">{selectedViolation.violationType}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Fine Amount</p>
                <p className="text-foreground font-medium mt-1 text-lg">{formatCurrency(selectedViolation.fine)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Date & Time</p>
                <p className="text-foreground font-medium mt-1">{formatDate(selectedViolation.dateTime)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Status</p>
                <p className={`font-medium mt-1 capitalize ${getStatusColor(selectedViolation.status)}`}>
                  {selectedViolation.status}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Location</p>
                <p className="text-foreground font-medium mt-1">{selectedViolation.location}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Description</p>
                <p className="text-foreground mt-1">{selectedViolation.description}</p>
              </div>
            </div>

            {/* Actions */}
            {selectedViolation.status !== 'paid' && (
              <div className="flex gap-2">
                {selectedViolation.status !== 'disputed' && (
                  <Button
                    className="flex-1"
                    onClick={() => handlePayViolation(selectedViolation.id)}
                    disabled={isPaying || isDisputing}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    {isPaying ? 'Processing...' : 'Pay Fine'}
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    handleDispute(selectedViolation.id, 'I would like to dispute this violation');
                  }}
                  disabled={isPaying || isDisputing || selectedViolation.status === 'disputed'}
                >
                  <Scale className="w-4 h-4 mr-2" />
                  {isDisputing ? 'Filing...' : 'Dispute'}
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
