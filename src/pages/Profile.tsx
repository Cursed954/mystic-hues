
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { UserCircle, LogOut, Calendar, MapPin, Package, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                {user.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={user.name} 
                    className="w-32 h-32 rounded-full border-4 border-violet-500/50"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                    <UserCircle className="w-20 h-20 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-gray-400 mt-1">{user.email}</p>
                
                {user.provider && (
                  <div className="inline-flex items-center gap-2 mt-2 bg-violet-900/30 px-3 py-1 rounded-full text-violet-300 text-sm">
                    <span>Signed in with {user.provider}</span>
                  </div>
                )}
                
                <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button
                    variant="outline"
                    className="border-violet-500/50 hover:bg-violet-500/20"
                    onClick={() => navigate('/account-settings')}
                  >
                    Edit Profile
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-red-500/50 hover:bg-red-500/20 text-red-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">Your Trips</h2>
            
            {user.trips && user.trips.length > 0 ? (
              <div className="space-y-4">
                {user.trips.map((trip: any) => (
                  <motion.div
                    key={trip.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-5 flex justify-between items-center cursor-pointer border border-white/10 hover:border-violet-500/30 transition-all duration-300"
                    onClick={() => navigate(`/journey/${trip.destination.toLowerCase()}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-violet-900/20 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-violet-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{trip.destination}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{trip.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        trip.status === 'Upcoming' 
                          ? 'bg-emerald-900/30 text-emerald-400' 
                          : 'bg-blue-900/30 text-blue-400'
                      }`}>
                        {trip.status}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 text-center border border-white/10">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <h3 className="text-xl font-medium mb-2">No trips yet</h3>
                <p className="text-gray-400 mb-4">Looks like you haven't booked any journeys yet.</p>
                <Button onClick={() => navigate('/states')} className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                  Explore Destinations
                </Button>
              </div>
            )}
          </motion.div>
          
          <Separator className="my-8 bg-white/10" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-medium mb-4">Saved Destinations</h3>
              <p className="text-gray-400">You haven't saved any destinations yet.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-medium mb-4">Recent Activities</h3>
              <p className="text-gray-400">No recent activities to show.</p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
