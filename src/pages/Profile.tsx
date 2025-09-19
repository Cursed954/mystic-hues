import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Edit, Settings, LogOut, MapPin, Calendar, Star, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useSupabaseAuthContext } from '@/context/SupabaseAuthContext';

const Profile = () => {
  const { user, signOut } = useSupabaseAuthContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<number | null>(null);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTrip = async (tripId: number) => {
    setTripToDelete(tripId);
    setConfirmDeleteDialogOpen(true);
  };

  const confirmDeleteTrip = async () => {
    if (tripToDelete) {
      try {
        // TODO: Implement trip deletion with Supabase
        toast({
          title: "Feature Coming Soon",
          description: "Trip management functionality will be available soon!",
        });
      } catch (error) {
        console.error('Delete trip error:', error);
        toast({
          title: "Delete Failed",
          description: "Failed to delete the trip. Please try again.",
          variant: "destructive"
        });
      }
    }
    setConfirmDeleteDialogOpen(false);
    setTripToDelete(null);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-slate-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage 
                    src={user.user_metadata?.avatar_url || ''} 
                  />
                  <AvatarFallback className="text-2xl">
                    {user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        {user.user_metadata?.full_name || 'Travel Enthusiast'}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {user.email}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Exploring the beauty of India, one destination at a time.
                      </p>
                    </div>
                    
                    <div className="flex gap-3">
                      <Link to="/account-settings">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>India</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(user.created_at || '').toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  0
                </div>
                <div className="text-gray-600 dark:text-gray-300">States Visited</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  0
                </div>
                <div className="text-gray-600 dark:text-gray-300">Trips Planned</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  0
                </div>
                <div className="text-gray-600 dark:text-gray-300">Favorites</div>
              </CardContent>
            </Card>
          </div>

          {/* Trips Section */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Trips</CardTitle>
                  <CardDescription>
                    Your planned and completed journeys
                  </CardDescription>
                </div>
                <Link to="/journey-planner">
                  <Button>
                    <Calendar className="w-4 h-4 mr-2" />
                    Plan New Trip
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  No trips yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Start planning your first adventure through India!
                </p>
                <Link to="/journey-planner">
                  <Button>
                    Plan Your First Trip
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest interactions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <Star className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  No recent activity to show.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDeleteDialogOpen} onOpenChange={setConfirmDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Trip</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this trip? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteTrip}>
              Delete Trip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Profile;