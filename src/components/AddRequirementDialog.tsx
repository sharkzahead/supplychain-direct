import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AddRequirementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function AddRequirementDialog({ open, onOpenChange, onSuccess }: AddRequirementDialogProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [urgent, setUrgent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase.from('requirements').insert({
        factory_id: user?.id,
        material_name: formData.get('material_name') as string,
        category: formData.get('category') as string,
        quantity_needed: parseFloat(formData.get('quantity_needed') as string),
        unit: formData.get('unit') as string,
        price_willing: parseFloat(formData.get('price_willing') as string),
        description: formData.get('description') as string,
        urgent,
      });

      if (error) throw error;

      toast.success('Requirement posted!');
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Failed to post requirement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Post Material Requirement</DialogTitle>
          <DialogDescription>Let farmers know what you need</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="material_name">Material Name *</Label>
              <Input id="material_name" name="material_name" placeholder="e.g., Wheat" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select name="category" required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grains">Grains</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="spices">Spices</SelectItem>
                  <SelectItem value="pulses">Pulses</SelectItem>
                  <SelectItem value="oilseeds">Oilseeds</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity_needed">Quantity Needed *</Label>
              <Input
                id="quantity_needed"
                name="quantity_needed"
                type="number"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit *</Label>
              <Select name="unit" required>
                <SelectTrigger id="unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="quintal">Quintal</SelectItem>
                  <SelectItem value="ton">Ton</SelectItem>
                  <SelectItem value="liters">Liters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price_willing">Willing to Pay (₹/unit) *</Label>
            <Input
              id="price_willing"
              name="price_willing"
              type="number"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Specify quality, certifications, or other requirements..."
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="urgent" checked={urgent} onCheckedChange={(checked) => setUrgent(checked as boolean)} />
            <Label htmlFor="urgent" className="cursor-pointer">Mark as urgent</Label>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post Requirement
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
