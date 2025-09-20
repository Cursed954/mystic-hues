import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserCircle, Save, ArrowLeft, MapPin, Bell, Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const AccountSettings = () => {
  const { user, userProfile, updateProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const handleUpdateProfile = async (updates: any) => {
    const result = await updateProfile(updates);
    
    if (result.success) {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } else {
      toast({
        title: "Update Failed",
        description: result.error || "Failed to update profile",
        variant: "destructive"
      });
    }
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
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/profile')}
              className="mb-4 text-violet-400 hover:text-violet-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>

            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-600">
                Account Settings
              </h1>
              <p className="text-gray-400">Manage your account preferences and profile information</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-md border border-white/10">
                <TabsTrigger value="profile" className="text-white data-[state=active]:bg-violet-600/50">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="address" className="text-white data-[state=active]:bg-violet-600/50">
                  Address
                </TabsTrigger>
                <TabsTrigger value="preferences" className="text-white data-[state=active]:bg-violet-600/50">
                  Preferences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your personal information and profile picture.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        {userProfile?.avatar_url ? (
                          <img
                            src={userProfile.avatar_url}
                            alt="Profile"
                            className="w-20 h-20 rounded-full border-4 border-violet-500/50 object-cover"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <UserCircle className="w-12 h-12 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{userProfile?.full_name || user.email}</h3>
                        <p className="text-gray-400">{user.email}</p>
                        <Badge variant="secondary" className="mt-2">
                          Email Verified
                        </Badge>
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Full Name
                        </label>
                        <Input
                          defaultValue={userProfile?.full_name || ""}
                          placeholder="Enter your full name"
                          className="bg-gray-800/50 border-violet-500/30 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Phone Number
                        </label>
                        <Input
                          defaultValue={userProfile?.phone || ""}
                          placeholder="Enter your phone number"
                          className="bg-gray-800/50 border-violet-500/30 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Bio
                      </label>
                      <Textarea
                        defaultValue={userProfile?.bio || ""}
                        placeholder="Tell us about yourself..."
                        className="bg-gray-800/50 border-violet-500/30 text-white resize-none"
                        rows={4}
                      />
                    </div>

                    <Button
                      onClick={() => toast({ title: "Feature Coming Soon", description: "Profile editing will be available soon" })}
                      className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="address">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-violet-400" />
                      Address Information
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your address for personalized travel recommendations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Street Address
                      </label>
                      <Input
                        defaultValue={userProfile?.address?.street || ""}
                        placeholder="Enter your street address"
                        className="bg-gray-800/50 border-violet-500/30 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          City
                        </label>
                        <Input
                          defaultValue={userProfile?.address?.city || ""}
                          placeholder="City"
                          className="bg-gray-800/50 border-violet-500/30 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          State
                        </label>
                        <Input
                          defaultValue={userProfile?.address?.state || ""}
                          placeholder="State"
                          className="bg-gray-800/50 border-violet-500/30 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          ZIP Code
                        </label>
                        <Input
                          defaultValue={userProfile?.address?.zipCode || ""}
                          placeholder="ZIP Code"
                          className="bg-gray-800/50 border-violet-500/30 text-white"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => toast({ title: "Feature Coming Soon", description: "Address editing will be available soon" })}
                      className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Address Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-violet-400" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage how you receive notifications and updates.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center py-8">
                      <Shield className="w-16 h-16 mx-auto mb-4 text-violet-400" />
                      <h3 className="text-xl font-semibold text-white mb-2">Preferences Coming Soon</h3>
                      <p className="text-gray-400">
                        Notification and preference settings will be available in a future update.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountSettings;