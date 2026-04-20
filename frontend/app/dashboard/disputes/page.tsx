'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { mockDisputes, mockViolations } from '@/lib/mock-data';
import { DataTable, type Column } from '@/components/data-table';
import { Modal } from '@/components/modal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface Dispute {
  id: string;
  violationId: string;
  citizenId: string;
  status: string;
  reason: string;
  description: string;
  filedDate: string;
  reviewerId: string;
  remarks: string | null;
  decision: string | null;
}

export default function DisputesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isNewDisputeModalOpen, setIsNewDisputeModalOpen] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reason, setReason] = useState('');

  // Get user's disputes
  const userDisputes = mockDisputes.filter(d => d.citizenId === user?.id) as Dispute[];
  const undisputedViolations = mockViolations.filter(v => v.citizenId === user?.id && v.status !== 'disputed' && v.status !== 'paid');

  const columns: Column<Dispute>[] = [
    {
      key: 'violationId',
      header: 'Violation ID',
      sortable: true,
    },
    {
      key: 'filedDate',
      header: 'Filed Date',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${
          value === 'open' ? 'bg-orange-100 text-orange-800' :
          value === 'under_review' ? 'bg-blue-100 text-blue-800' :
          value === 'approved' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'reason',
      header: 'Reason',
      sortable: false,
    },
  ];

  const handleFileDispute = async () => {
    if (!selectedViolation || !reason.trim()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newDispute: any = {
        id: `d${Date.now()}`,
        violationId: selectedViolation.id,
        citizenId: user?.id || '',
        status: 'open',
        reason,
        description: reason,
        filedDate: new Date().toISOString(),
        reviewerId: '',
        remarks: null,
        decision: null,
      };

      mockDisputes.push(newDispute);

      // Update violation status
      const violation = mockViolations.find(v => v.id === selectedViolation.id) as any;
      if (violation) {
        violation.status = 'disputed';
      }

      setIsNewDisputeModalOpen(false);
      setSelectedViolation(null);
      setReason('');
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  const disputeCounts = {
    open: userDisputes.filter(d => d.status === 'open').length,
    under_review: userDisputes.filter(d => d.status === 'under_review').length,
    approved: userDisputes.filter(d => d.status === 'approved').length,
    rejected: userDisputes.filter(d => d.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Disputes & Appeals</h1>
          <p className="text-muted-foreground">Raise and track disputes against traffic violations</p>
        </div>
        {undisputedViolations.length > 0 && (
          <Button onClick={() => {
            setSelectedViolation(undisputedViolations[0]);
            setIsNewDisputeModalOpen(true);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            New Dispute
          </Button>
        )}
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Open</p>
                <p className="text-3xl font-bold text-foreground">{disputeCounts.open}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-800" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Under Review</p>
                <p className="text-3xl font-bold text-foreground">{disputeCounts.under_review}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-800" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Approved</p>
                <p className="text-3xl font-bold text-foreground">{disputeCounts.approved}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-800" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rejected</p>
                <p className="text-3xl font-bold text-foreground">{disputeCounts.rejected}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-800" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disputes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Disputes</CardTitle>
          <CardDescription>{userDisputes.length} dispute(s) on record</CardDescription>
        </CardHeader>
        <CardContent>
          {userDisputes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No disputes raised yet</p>
              {undisputedViolations.length > 0 && (
                <Button onClick={() => {
                  setSelectedViolation(undisputedViolations[0]);
                  setIsNewDisputeModalOpen(true);
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Raise Your First Dispute
                </Button>
              )}
            </div>
          ) : (
            <DataTable<Dispute>
              data={userDisputes}
              columns={columns}
              searchFields={['violationId', 'reason']}
            />
          )}
        </CardContent>
      </Card>

      {/* New Dispute Modal */}
      <Modal
        isOpen={isNewDisputeModalOpen}
        title="Raise a Dispute"
        description="Appeal against a traffic violation"
        onClose={() => {
          setIsNewDisputeModalOpen(false);
          setSelectedViolation(null);
          setReason('');
        }}
        onConfirm={handleFileDispute}
        confirmLabel={isSubmitting ? 'Filing...' : 'Submit Dispute'}
        isLoading={isSubmitting}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Select Violation</label>
            <select
              value={selectedViolation?.id || ''}
              onChange={(e) => {
                const violation = undisputedViolations.find(v => v.id === e.target.value);
                setSelectedViolation(violation);
              }}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
              disabled={isSubmitting}
            >
              <option value="">Choose a violation to dispute...</option>
              {undisputedViolations.map(v => (
                <option key={v.id} value={v.id}>
                  {v.violationType} - {v.location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Reason for Dispute</label>
            <textarea
              placeholder="Explain why you believe this violation is incorrect. Provide details about the incident..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              rows={6}
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground mt-1">Minimum 10 characters required</p>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
            A review officer will examine your dispute and contact you with a decision within 5-7 business days.
          </div>
        </div>
      </Modal>
    </div>
  );
}
