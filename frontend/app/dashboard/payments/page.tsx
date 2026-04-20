'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { mockPayments, mockViolations } from '@/lib/mock-data';
import { DataTable, type Column } from '@/components/data-table';
import { Modal } from '@/components/modal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DollarSign, CreditCard, AlertCircle } from 'lucide-react';
import { formatDate, formatCurrency, getStatusColor } from '@/lib/ui-utils';

interface Payment {
  id: string;
  violationId: string;
  citizenId: string;
  amount: number;
  method: string;
  status: string;
  transactionId: string;
  date: string;
  reference: string;
}

export default function PaymentsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  // Get user's payments and unpaid violations
  const userPayments = mockPayments.filter(p => p.citizenId === user?.id) as Payment[];
  const unpaidViolations = mockViolations.filter(v => v.citizenId === user?.id && v.status !== 'paid');

  const columns: Column<Payment>[] = [
    {
      key: 'transactionId',
      header: 'Transaction ID',
      sortable: true,
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (value) => formatCurrency(value),
    },
    {
      key: 'method',
      header: 'Method',
      sortable: true,
      render: (value) => {
        const methods: any = {
          credit_card: 'Credit Card',
          debit_card: 'Debit Card',
          upi: 'UPI',
          net_banking: 'Net Banking',
        };
        return methods[value] || value;
      },
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      render: (value) => formatDate(value),
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
    },
  ];

  const handlePaymentClick = (violation: any) => {
    setSelectedViolation(violation);
    setIsPaymentModalOpen(true);
  };

  const handleProcessPayment = async () => {
    if (!selectedViolation) return;

    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create payment record
      const newPayment: Payment = {
        id: `p${Date.now()}`,
        violationId: selectedViolation.id,
        citizenId: user?.id || '',
        amount: selectedViolation.fine,
        method: paymentMethod,
        status: 'success',
        transactionId: `TXN${Date.now()}`,
        date: new Date().toISOString(),
        reference: `Payment for Violation #${selectedViolation.id}`,
      };

      mockPayments.push(newPayment);

      // Update violation status
      const violation = mockViolations.find(v => v.id === selectedViolation.id) as any;
      if (violation) {
        violation.status = 'paid';
        violation.paidDate = new Date().toISOString();
        violation.paymentMethod = paymentMethod;
      }

      setIsPaymentModalOpen(false);
      setSelectedViolation(null);
      router.refresh();
    } finally {
      setIsProcessing(false);
    }
  };

  const totalPaid = userPayments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = unpaidViolations.reduce((sum, v) => sum + v.fine, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Payments</h1>
        <p className="text-muted-foreground">Manage and track your violation payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold text-foreground mt-2">{formatCurrency(totalPaid)}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <CreditCard className="w-6 h-6" />
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
                <p className="text-sm text-muted-foreground">Payment History</p>
                <p className="text-2xl font-bold text-foreground mt-2">{userPayments.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unpaid Violations */}
      {unpaidViolations.length > 0 && (
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-900">Pending Payment Required</CardTitle>
            <CardDescription className="text-orange-800">
              You have {unpaidViolations.length} violation(s) awaiting payment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unpaidViolations.slice(0, 3).map(violation => (
                <div key={violation.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                  <div>
                    <p className="font-semibold text-foreground">{violation.violationType}</p>
                    <p className="text-sm text-muted-foreground">{violation.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-foreground">{formatCurrency(violation.fine)}</p>
                    <Button
                      size="sm"
                      onClick={() => handlePaymentClick(violation)}
                      className="mt-1"
                    >
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your previous payments and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {userPayments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No payment history yet</p>
            </div>
          ) : (
            <DataTable<Payment>
              data={userPayments}
              columns={columns}
              searchFields={['transactionId', 'reference']}
            />
          )}
        </CardContent>
      </Card>

      {/* Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        title="Make Payment"
        description={`Pay ${formatCurrency(selectedViolation?.fine)} for ${selectedViolation?.violationType}`}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setSelectedViolation(null);
          setPaymentMethod('credit_card');
        }}
        onConfirm={handleProcessPayment}
        confirmLabel={isProcessing ? 'Processing...' : 'Pay Now'}
        isLoading={isProcessing}
        size="md"
      >
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
            <p className="text-3xl font-bold text-foreground">{formatCurrency(selectedViolation?.fine)}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-3">Payment Method</label>
            <div className="space-y-2">
              {[
                { value: 'credit_card', label: 'Credit Card', icon: '💳' },
                { value: 'debit_card', label: 'Debit Card', icon: '💳' },
                { value: 'upi', label: 'UPI', icon: '📱' },
                { value: 'net_banking', label: 'Net Banking', icon: '🏦' },
              ].map(method => (
                <label key={method.value} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors" style={{
                  borderColor: paymentMethod === method.value ? 'var(--primary)' : 'var(--border)',
                  backgroundColor: paymentMethod === method.value ? 'hsl(var(--primary) / 0.05)' : 'transparent',
                }}>
                  <input
                    type="radio"
                    name="payment-method"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={e => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 mr-2 text-lg">{method.icon}</span>
                  <span className="font-medium text-foreground">{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          {paymentMethod === 'credit_card' || paymentMethod === 'debit_card' ? (
            <div className="space-y-3">
              <Input placeholder="Card Number" disabled={isProcessing} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="MM/YY" disabled={isProcessing} />
                <Input placeholder="CVV" disabled={isProcessing} />
              </div>
              <Input placeholder="Cardholder Name" disabled={isProcessing} />
            </div>
          ) : paymentMethod === 'upi' ? (
            <Input placeholder="UPI ID (e.g., user@bank)" disabled={isProcessing} />
          ) : (
            <Input placeholder="Select your bank" disabled={isProcessing} />
          )}

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
            Your payment information is secure and encrypted. We accept all major payment methods.
          </div>
        </div>
      </Modal>
    </div>
  );
}
