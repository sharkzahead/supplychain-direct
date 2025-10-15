import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Crop {
  id: string;
  crop_name: string;
  category: string;
  quantity: number;
  unit: string;
  price_per_unit: number;
  harvest_date: string;
  description: string;
  image_url: string;
  farmer: {
    profiles: {
      full_name: string;
      location: string;
    };
  };
}

export default function Marketplace() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const { data, error } = await supabase
        .from('crops')
        .select(`
          *,
          farmer:farmers!inner (
            profiles!inner (
              full_name,
              location
            )
          )
        `)
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCrops(data || []);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.crop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || crop.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Crop Marketplace</h1>
          <p className="text-muted-foreground">Browse available crops from farmers across the region</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
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

        {/* Crops Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <Card key={crop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-muted flex items-center justify-center relative overflow-hidden">
                {crop.image_url ? (
                  <img src={crop.image_url} alt={crop.crop_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-6xl">🌾</div>
                )}
                <Badge className="absolute top-3 right-3 capitalize">
                  {crop.category}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {crop.crop_name}
                  <span className="text-primary">₹{crop.price_per_unit}/{crop.unit}</span>
                </CardTitle>
                <CardDescription className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {crop.farmer.profiles.full_name} • {crop.farmer.profiles.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Harvest: {new Date(crop.harvest_date).toLocaleDateString()}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">Available: {crop.quantity} {crop.unit}</p>
                {crop.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{crop.description}</p>
                )}
                <Link to="/auth">
                  <Button className="w-full">Contact Farmer</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No crops found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
