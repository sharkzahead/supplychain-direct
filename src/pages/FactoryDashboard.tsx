import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search, Plus, Package, Send, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PurchaseRequestDialog from '@/components/PurchaseRequestDialog';
import AddRequirementDialog from '@/components/AddRequirementDialog';

export default function FactoryDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [crops, setCrops] = useState<any[]>([]);
  const [requirements, setRequirements] = useState<any[]>([]);
  const [sentRequests, setSentRequests] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [showRequirementDialog, setShowRequirementDialog] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [cropsRes, requirementsRes, requestsRes] = await Promise.all([
        supabase
          .from('crops')
          .select(`
            *,
            farmer:farmers!inner(
              profiles!inner(full_name, location)
            )
          `)
          .eq('available', true)
          .order('created_at', { ascending: false }),
        supabase
          .from('requirements')
          .select('*')
          .eq('factory_id', user?.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('purchase_requests')
          .select(`
            *,
            crop:crops(*),
            farmer:farmers(
              profiles(full_name, location)
            )
          `)
          .eq('factory_id', user?.id)
          .order('created_at', { ascending: false }),
      ]);

      setCrops(cropsRes.data || []);
      setRequirements(requirementsRes.data || []);
      setSentRequests(requestsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.crop_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || crop.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Factory Dashboard</h1>
            <p className="text-muted-foreground mt-1">Browse crops and manage procurement</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Available Crops</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{crops.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sent Requests</CardTitle>
              <Send className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sentRequests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Requirements</CardTitle>
              <Package className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requirements.filter(r => r.active).length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Crops</TabsTrigger>
            <TabsTrigger value="requirements">My Requirements</TabsTrigger>
            <TabsTrigger value="requests">Sent Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCrops.map((crop) => (
                <Card key={crop.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {crop.crop_name}
                      <Badge className="capitalize">{crop.category}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {crop.farmer.profiles.full_name} • {crop.farmer.profiles.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Available</p>
                          <p className="font-semibold">{crop.quantity} {crop.unit}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Price</p>
                          <p className="font-semibold text-primary">₹{crop.price_per_unit}/{crop.unit}</p>
                        </div>
                      </div>
                      {crop.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{crop.description}</p>
                      )}
                      <Button onClick={() => setSelectedCrop(crop)} className="w-full">
                        Send Purchase Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Requirements</h2>
              <Button onClick={() => setShowRequirementDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Post Requirement
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requirements.map((req) => (
                <Card key={req.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{req.material_name}</CardTitle>
                      <Badge variant={req.active ? 'default' : 'secondary'}>
                        {req.active ? 'Active' : 'Closed'}
                      </Badge>
                    </div>
                    <CardDescription className="capitalize">{req.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>Needed: {req.quantity_needed} {req.unit}</p>
                      <p className="font-semibold text-secondary">Willing to pay: ₹{req.price_willing}/{req.unit}</p>
                      {req.urgent && <Badge variant="destructive">Urgent</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {requirements.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No requirements posted yet</p>
                  <Button onClick={() => setShowRequirementDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Post Your First Requirement
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <h2 className="text-2xl font-semibold">Sent Purchase Requests</h2>

            <div className="space-y-4">
              {sentRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{request.crop.crop_name}</CardTitle>
                        <CardDescription>
                          To: {request.farmer.profiles.full_name} • {request.farmer.profiles.location}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          request.status === 'pending' ? 'default' :
                          request.status === 'accepted' ? 'default' :
                          request.status === 'rejected' ? 'destructive' : 'secondary'
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Quantity</p>
                        <p className="font-semibold">{request.quantity} {request.crop.unit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Your Offer</p>
                        <p className="font-semibold text-secondary">₹{request.offered_price}/{request.crop.unit}</p>
                      </div>
                    </div>
                    {request.message && (
                      <div className="mt-3">
                        <p className="text-muted-foreground text-sm">Your message</p>
                        <p className="text-sm">{request.message}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {sentRequests.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">No purchase requests sent yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {selectedCrop && (
        <PurchaseRequestDialog
          crop={selectedCrop}
          open={!!selectedCrop}
          onOpenChange={(open) => !open && setSelectedCrop(null)}
          onSuccess={fetchData}
        />
      )}

      <AddRequirementDialog
        open={showRequirementDialog}
        onOpenChange={setShowRequirementDialog}
        onSuccess={fetchData}
      />
    </div>
  );
}
