'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  confirmLabel?: string;
  cancelLabel?: string;
  isDangerous?: boolean;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({
  isOpen,
  title,
  description,
  children,
  onClose,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDangerous = false,
  isLoading = false,
  size = 'md',
}: ModalProps) {
  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={sizeClasses[size]}>
        <DialogHeader>
          {isDangerous && (
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span className="text-xs font-semibold text-destructive uppercase">Caution</span>
            </div>
          )}
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children && (
          <div className="py-4">
            {children}
          </div>
        )}

        {(onConfirm || true) && (
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              {cancelLabel}
            </Button>
            {onConfirm && (
              <Button
                onClick={onConfirm}
                disabled={isLoading}
                variant={isDangerous ? 'destructive' : 'default'}
              >
                {confirmLabel}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
