'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { mockVehicles } from '@/lib/mock-data';
import { DataTable, type Column } from '@/components/data-table';
import { Modal } from '@/components/modal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Vehicle {
  id: string;
  citizenId: string;
  licensePlate: string;
  vehicleType: string;
  manufacturer: string;
  model: string;
  color: string;
  year: number;
  registrationNo: string;
  registrationExpiry: string;
}

export default function VehiclesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    licensePlate: '',
    vehicleType: 'Car',
    manufacturer: '',
    model: '',
    color: '',
    year: new Date().getFullYear(),
    registrationNo: '',
    registrationExpiry: '',
  });

  // Get user's vehicles
  const userVehicles = mockVehicles.filter(v => v.citizenId === user?.id) as Vehicle[];

  const columns: Column<Vehicle>[] = [
    {
      key: 'licensePlate',
      header: 'License Plate',
      sortable: true,
    },
    {
      key: 'vehicleType',
      header: 'Type',
      sortable: true,
    },
    {
      key: 'manufacturer',
      header: 'Manufacturer',
      sortable: true,
    },
    {
      key: 'model',
      header: 'Model',
      sortable: true,
    },
    {
      key: 'year',
      header: 'Year',
      sortable: true,
      render: (value) => value.toString(),
      width: 'w-16',
    },
  ];

  const resetForm = () => {
    setFormData({
      licensePlate: '',
      vehicleType: 'Car',
      manufacturer: '',
      model: '',
      color: '',
      year: new Date().getFullYear(),
      registrationNo: '',
      registrationExpiry: '',
    });
  };

  const handleAddVehicle = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const newVehicle: Vehicle = {
        id: `v${Date.now()}`,
        citizenId: user?.id || '',
        ...formData,
      };

      mockVehicles.push(newVehicle);
      resetForm();
      setIsAddModalOpen(false);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditVehicle = async () => {
    if (!selectedVehicle) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const vehicleIndex = mockVehicles.findIndex(v => v.id === selectedVehicle.id);
      if (vehicleIndex >= 0) {
        mockVehicles[vehicleIndex] = {
          ...selectedVehicle,
          ...formData,
        };
      }

      resetForm();
      setSelectedVehicle(null);
      setIsEditModalOpen(false);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteVehicle = async () => {
    if (!selectedVehicle) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const index = mockVehicles.findIndex(v => v.id === selectedVehicle.id);
      if (index >= 0) {
        mockVehicles.splice(index, 1);
      }

      setSelectedVehicle(null);
      setIsDeleteModalOpen(false);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      licensePlate: vehicle.licensePlate,
      vehicleType: vehicle.vehicleType,
      manufacturer: vehicle.manufacturer,
      model: vehicle.model,
      color: vehicle.color,
      year: vehicle.year,
      registrationNo: vehicle.registrationNo,
      registrationExpiry: vehicle.registrationExpiry,
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Vehicles</h1>
          <p className="text-muted-foreground">Manage your registered vehicles</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Summary Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Vehicles</p>
              <p className="text-3xl font-bold text-foreground mt-2">{userVehicles.length}</p>
            </div>
            <Button variant="outline" onClick={() => setIsAddModalOpen(true)}>
              Add New Vehicle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Vehicles</CardTitle>
          <CardDescription>All your vehicles registered in the system</CardDescription>
        </CardHeader>
        <CardContent>
          {userVehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No vehicles registered yet</p>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Register Your First Vehicle
              </Button>
            </div>
          ) : (
            <DataTable<Vehicle>
              data={userVehicles}
              columns={columns}
              searchFields={['licensePlate', 'manufacturer', 'model']}
              actions={(vehicle) => (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(vehicle)}
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setIsDeleteModalOpen(true);
                    }}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              )}
            />
          )}
        </CardContent>
      </Card>

      {/* Add Vehicle Modal */}
      <Modal
        isOpen={isAddModalOpen}
        title="Add New Vehicle"
        description="Register a new vehicle to your account"
        onClose={() => {
          resetForm();
          setIsAddModalOpen(false);
        }}
        onConfirm={handleAddVehicle}
        confirmLabel={isSubmitting ? 'Adding...' : 'Add Vehicle'}
        isLoading={isSubmitting}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">License Plate</label>
              <Input
                placeholder="DL01AB1234"
                value={formData.licensePlate}
                onChange={e => setFormData({ ...formData, licensePlate: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Vehicle Type</label>
              <select
                value={formData.vehicleType}
                onChange={e => setFormData({ ...formData, vehicleType: e.target.value })}
                disabled={isSubmitting}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
              >
                <option>Car</option>
                <option>Motorcycle</option>
                <option>Truck</option>
                <option>Bus</option>
                <option>Scooter</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Manufacturer</label>
              <Input
                placeholder="Honda"
                value={formData.manufacturer}
                onChange={e => setFormData({ ...formData, manufacturer: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Model</label>
              <Input
                placeholder="Civic"
                value={formData.model}
                onChange={e => setFormData({ ...formData, model: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Color</label>
              <Input
                placeholder="Silver"
                value={formData.color}
                onChange={e => setFormData({ ...formData, color: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Year</label>
              <Input
                type="number"
                placeholder={new Date().getFullYear().toString()}
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Registration Number</label>
            <Input
              placeholder="DL01AB1234"
              value={formData.registrationNo}
              onChange={e => setFormData({ ...formData, registrationNo: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Registration Expiry</label>
            <Input
              type="date"
              value={formData.registrationExpiry}
              onChange={e => setFormData({ ...formData, registrationExpiry: e.target.value })}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </Modal>

      {/* Edit Vehicle Modal */}
      <Modal
        isOpen={isEditModalOpen}
        title="Edit Vehicle"
        description="Update vehicle details"
        onClose={() => {
          resetForm();
          setSelectedVehicle(null);
          setIsEditModalOpen(false);
        }}
        onConfirm={handleEditVehicle}
        confirmLabel={isSubmitting ? 'Updating...' : 'Update Vehicle'}
        isLoading={isSubmitting}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">License Plate</label>
              <Input
                placeholder="DL01AB1234"
                value={formData.licensePlate}
                onChange={e => setFormData({ ...formData, licensePlate: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Vehicle Type</label>
              <select
                value={formData.vehicleType}
                onChange={e => setFormData({ ...formData, vehicleType: e.target.value })}
                disabled={isSubmitting}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
              >
                <option>Car</option>
                <option>Motorcycle</option>
                <option>Truck</option>
                <option>Bus</option>
                <option>Scooter</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Manufacturer</label>
              <Input
                placeholder="Honda"
                value={formData.manufacturer}
                onChange={e => setFormData({ ...formData, manufacturer: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Model</label>
              <Input
                placeholder="Civic"
                value={formData.model}
                onChange={e => setFormData({ ...formData, model: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Color</label>
              <Input
                placeholder="Silver"
                value={formData.color}
                onChange={e => setFormData({ ...formData, color: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Year</label>
              <Input
                type="number"
                placeholder={new Date().getFullYear().toString()}
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Registration Number</label>
            <Input
              placeholder="DL01AB1234"
              value={formData.registrationNo}
              onChange={e => setFormData({ ...formData, registrationNo: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Registration Expiry</label>
            <Input
              type="date"
              value={formData.registrationExpiry}
              onChange={e => setFormData({ ...formData, registrationExpiry: e.target.value })}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Vehicle"
        description={`Are you sure you want to delete ${selectedVehicle?.manufacturer} ${selectedVehicle?.model}?`}
        onClose={() => {
          setSelectedVehicle(null);
          setIsDeleteModalOpen(false);
        }}
        onConfirm={handleDeleteVehicle}
        confirmLabel={isSubmitting ? 'Deleting...' : 'Delete Vehicle'}
        cancelLabel="Cancel"
        isDangerous={true}
        isLoading={isSubmitting}
      />
    </div>
  );
}
