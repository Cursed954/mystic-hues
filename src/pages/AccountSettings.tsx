
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  User, Mail, Phone, Home, MapPin, Settings, 
  Save, Loader2, Camera, Check, X
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const AccountSettings = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // React Hook Form setup
  const form = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      phone: user?.phone || '',
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      notifications: user?.preferences?.notifications || false,
      newsletter: user?.preferences?.newsletter || false,
      travelAlerts: user?.preferences?.travelAlerts || false,
    },
  });

  React.useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Restructure data to match user object structure
      const updatedData = {
        name: data.name,
        email: data.email,
        bio: data.bio,
        phone: data.phone,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode
        },
        preferences: {
          notifications: data.notifications,
          newsletter: data.newsletter,
          travelAlerts: data.travelAlerts
        }
      };
      
      const result = await updateProfile(updatedData);
      
      if (result.success) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
      } else {
        toast({
          title: "Update Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Update Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfilePicture = async () => {
    // In a real app, this would open a file picker and upload the image
    // For this demo, we'll just generate a new random avatar
    setIsLoading(true);
    try {
      const seed = Math.random().toString(36).substring(2, 8);
      const newProfilePicture = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
      
      const result = await updateProfile({ profilePicture: newProfilePicture });
      
      if (result.success) {
        toast({
          title: "Profile Picture Updated",
          description: "Your profile picture has been successfully updated.",
        });
      } else {
        toast({
          title: "Update Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Profile picture update error:", error);
      toast({
        title: "Update Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-1/4 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === 'profile' ? 'bg-violet-900/30 text-violet-300' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === 'address' ? 'bg-violet-900/30 text-violet-300' : ''}`}
                    onClick={() => setActiveTab('address')}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Address
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === 'preferences' ? 'bg-violet-900/30 text-violet-300' : ''}`}
                    onClick={() => setActiveTab('preferences')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Preferences
                  </Button>
                </div>

                <Separator className="my-4" />
                
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => navigate('/profile')}
                >
                  Back to Profile
                </Button>
              </div>
              
              {/* Main Content */}
              <div className="w-full md:w-3/4 bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Profile Information</h2>
                        <p className="text-gray-400">Update your personal information and profile picture.</p>
                        
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="text-center">
                            <div className="relative inline-block">
                              <img 
                                src={user.profilePicture} 
                                alt={user.name} 
                                className="w-32 h-32 rounded-full border-4 border-violet-500/50 object-cover"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="absolute bottom-0 right-0 rounded-full bg-violet-500 text-white hover:bg-violet-600"
                                onClick={updateProfilePicture}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Camera className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">Click the camera icon to update</p>
                          </div>
                          
                          <div className="flex-1 space-y-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400 h-5 w-5" />
                                      <Input placeholder="Your full name" className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400 h-5 w-5" />
                                      <Input placeholder="Your email address" className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400 h-5 w-5" />
                                      <Input placeholder="Your phone number" className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about yourself and your travel interests..." 
                                  className="min-h-[120px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                This bio will be visible on your public profile.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Address Tab */}
                    {activeTab === 'address' && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Address Information</h2>
                        <p className="text-gray-400">Update your address details for billing and shipping.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Street Address</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400 h-5 w-5" />
                                    <Input placeholder="Street address" className="pl-10" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400 h-5 w-5" />
                                    <Input placeholder="State" className="pl-10" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ZIP Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="ZIP code" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Preferences Tab */}
                    {activeTab === 'preferences' && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Notification Preferences</h2>
                        <p className="text-gray-400">Manage how you want to receive updates and notifications.</p>
                        
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="notifications"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    App Notifications
                                  </FormLabel>
                                  <FormDescription>
                                    Receive notifications about your account and trips.
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="newsletter"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    Email Newsletter
                                  </FormLabel>
                                  <FormDescription>
                                    Subscribe to our newsletter for travel tips and destination guides.
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="travelAlerts"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    Travel Alerts
                                  </FormLabel>
                                  <FormDescription>
                                    Get notified about travel deals and special offers.
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/profile')}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                      
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountSettings;
