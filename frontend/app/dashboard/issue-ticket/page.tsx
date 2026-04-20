'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FileText,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
} from 'lucide-react';

interface ViolationType {
  id: string;
  name: string;
  baseFine: number;
  description: string;
}

const violationTypes: ViolationType[] = [
  {
    id: '1',
    name: 'Speeding',
    baseFine: 1500,
    description: 'Exceeding speed limit',
  },
  {
    id: '2',
    name: 'Signal Jump',
    baseFine: 2000,
    description: 'Crossing signal when red',
  },
  {
    id: '3',
    name: 'No Helmet',
    baseFine: 500,
    description: 'Two-wheeler rider without helmet',
  },
  {
    id: '4',
    name: 'Wrong Parking',
    baseFine: 1000,
    description: 'Parking in prohibited area',
  },
  {
    id: '5',
    name: 'No Seatbelt',
    baseFine: 800,
    description: 'Vehicle occupant without seatbelt',
  },
  {
    id: '6',
    name: 'Rash Driving',
    baseFine: 3000,
    description: 'Dangerous or reckless driving',
  },
];

export default function IssueTicketPage() {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    violationType: '',
    location: '',
    notes: '',
  });
  const [selectedViolation, setSelectedViolation] = useState<ViolationType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleViolationSelect = (violation: ViolationType) => {
    setSelectedViolation(violation);
    setFormData({ ...formData, violationType: violation.id });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.vehicleNumber || !formData.violationType || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ vehicleNumber: '', violationType: '', location: '', notes: '' });
        setSelectedViolation(null);
      }, 3000);
    } catch (error) {
      alert('Error issuing ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Issue Violation Ticket</h1>
        <p className="text-muted-foreground">Record a traffic violation and issue a ticket</p>
      </div>

      {success && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900 mb-1">Ticket Issued Successfully!</p>
                <p className="text-sm text-green-800">
                  Ticket ID: TK-2024-{Math.floor(Math.random() * 10000)
                    .toString()
                    .padStart(4, '0')} has been issued to the vehicle owner.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
              <CardDescription>Fill in the violation information</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Vehicle Number */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Vehicle Registration Number *
                  </label>
                  <Input
                    placeholder="e.g., KA-01-AB-1234"
                    value={formData.vehicleNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicleNumber: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter the vehicle registration number from the number plate
                  </p>
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Violation Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="e.g., Main Street, Downtown"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      disabled={isSubmitting}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Violation Type Selection */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Select Violation Type *
                  </label>
                  <div className="space-y-2">
                    {violationTypes.map((violation) => (
                      <button
                        key={violation.id}
                        type="button"
                        onClick={() => handleViolationSelect(violation)}
                        disabled={isSubmitting}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          selectedViolation?.id === violation.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{violation.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {violation.description}
                            </p>
                          </div>
                          <div className="text-right ml-3">
                            <p className="font-bold text-primary">
                              ₹{violation.baseFine.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">Base fine</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Additional Notes
                  </label>
                  <textarea
                    placeholder="Optional: Add any additional details about the violation..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !selectedViolation}
                  className="w-full h-11"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Issuing Ticket...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Issue Ticket
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Summary Section */}
        <div className="space-y-4">
          {/* Ticket Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ticket Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.vehicleNumber && (
                <div>
                  <p className="text-xs text-muted-foreground">Vehicle</p>
                  <p className="font-semibold text-foreground">{formData.vehicleNumber}</p>
                </div>
              )}

              {formData.location && (
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">{formData.location}</p>
                </div>
              )}

              {selectedViolation && (
                <>
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">Violation Type</p>
                    <p className="font-semibold text-foreground">{selectedViolation.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Fine Amount</p>
                    <p className="text-2xl font-bold text-primary">
                      ₹{selectedViolation.baseFine.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-900">
                      <strong>Auto-calculated:</strong> Fine is automatically set based on violation type
                    </p>
                  </div>
                </>
              )}

              {!selectedViolation && (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">Select a violation to see preview</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-amber-900 mb-1">Important</p>
                  <ul className="text-xs text-amber-800 space-y-1">
                    <li>• Ensure vehicle number is correct</li>
                    <li>• Issue ticket at violation time</li>
                    <li>• Vehicle owner will receive notification</li>
                    <li>• Payment due date: 30 days from issue</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
