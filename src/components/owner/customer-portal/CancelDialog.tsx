import { toast } from 'sonner';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/owner/customer-portal/alert-dialog';
import { formatCurrency, type Appointment } from '@/data/customer-portal';

export function CancelDialog({
  appointment,
  open,
  onOpenChange,
}: {
  appointment: Appointment;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display text-2xl">
            Cancel {appointment.service}?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3 text-sm">
              <p>
                {appointment.date} · {appointment.time} with {appointment.staff}.
              </p>
              <div className="rounded-2xl bg-muted p-3 text-left">
                <p className="font-medium text-foreground">Cancellation policy</p>
                <p className="mt-1">
                  You are cancelling more than 24 hours ahead, so no fee applies.
                </p>
                <p className="mt-2">
                  Refund: {formatCurrency(appointment.price)} back to your original payment method
                  within 5–7 business days.
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Keep appointment</AlertDialogCancel>
          <AlertDialogAction
            className="rounded-full"
            onClick={() =>
              toast.success('Appointment cancelled', {
                description: 'Your refund is on its way.',
              })
            }
          >
            Cancel appointment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}