import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PurchaseRequestDialogProps {
  crop: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function PurchaseRequestDialog({ crop, open, onOpenChange, onSuccess }: PurchaseRequestDialogProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase.from('purchase_requests').insert({
        crop_id: crop.id,
        factory_id: user?.id,
        farmer_id: crop.farmer_id,
        quantity: parseFloat(formData.get('quantity') as string),
        offered_price: parseFloat(formData.get('offered_price') as string),
        message: formData.get('message') as string,
      });

      if (error) throw error;

      toast.success('Purchase request sent!');
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Purchase Request</DialogTitle>
          <DialogDescription>Request to purchase {crop?.crop_name}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity ({crop?.unit}) *</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              step="0.01"
              min="0"
              max={crop?.quantity}
              placeholder={`Max: ${crop?.quantity}`}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="offered_price">Your Offer (₹/{crop?.unit}) *</Label>
            <Input
              id="offered_price"
              name="offered_price"
              type="number"
              step="0.01"
              min="0"
              placeholder={`Listed at ₹${crop?.price_per_unit}`}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Add any specific requirements or questions..."
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
