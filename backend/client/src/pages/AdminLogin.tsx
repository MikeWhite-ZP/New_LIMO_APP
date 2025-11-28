import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useAuth, type LoginData, type RegisterData } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConstructionBackground } from "@/components/auth/ConstructionBackground";
import { Lock, LogIn, UserPlus, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AdminLogin() {
  const [, setLocation] = useLocation();
  const { loginMutation, registerMutation, user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  
  // Login form state
  const [loginForm, setLoginForm] = useState<LoginData>({
    username: '',
    password: '',
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState<RegisterData>({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    role: 'admin',
  });

  // Redirect if already authenticated
  if (user) {
    const pendingBookingData = localStorage.getItem('pendingBookingData');
    if (pendingBookingData) {
      setLocation('/booking');
    } else {
      const redirectPath = user.role === 'admin' ? '/admin' :
                          user.role === 'driver' ? '/driver' :
                          user.role === 'dispatcher' ? '/dispatcher' :
                          '/passenger';
      setLocation(redirectPath);
    }
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.username || !loginForm.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    try {
      await loginMutation.mutateAsync(loginForm);
      toast({
        title: "Administrator Access Granted",
        description: "Welcome to the admin dashboard",
      });
    } catch (error: any) {
      toast({
        title: "Authentication Failed",
        description: error.message || "Invalid administrator credentials",
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupForm.username || !signupForm.password || !signupForm.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (signupForm.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    try {
      await registerMutation.mutateAsync({
        ...signupForm,
        role: 'admin',
      });
      
      toast({
        title: "Administrator Account Created",
        description: `Welcome, ${signupForm.firstName || signupForm.username}!`,
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Could not create administrator account",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <ConstructionBackground />
      
      <div className="w-full max-w-md z-10 relative">
        {/* Main Login Card */}
        <Card className="border border-slate-700/50 bg-slate-800/95 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <CardHeader className="border-b border-slate-700/50 pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg border border-slate-600/30">
                <Lock className="w-6 h-6 text-slate-300" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-slate-100" data-testid="admin-login-title">
              Admin Access
            </CardTitle>
            <CardDescription className="text-center text-slate-400 text-sm mt-2">
              Secure portal for system administrators
            </CardDescription>
          </CardHeader>

          {/* Content */}
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-700/30 border border-slate-700 mb-6">
                <TabsTrigger 
                  value="login" 
                  data-testid="tab-login"
                  className="text-slate-400 data-[state=active]:text-slate-100 data-[state=active]:bg-slate-700/50"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  data-testid="tab-signup"
                  className="text-slate-400 data-[state=active]:text-slate-100 data-[state=active]:bg-slate-700/50"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-login-username" className="text-sm font-medium text-slate-300">
                      Username
                    </Label>
                    <Input
                      id="admin-login-username"
                      type="text"
                      placeholder="Enter your username"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                      required
                      className="bg-slate-700/30 border-slate-600/50 text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:ring-slate-500/50 focus:ring-1"
                      data-testid="input-login-username"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="admin-login-password" className="text-sm font-medium text-slate-300">
                        Password
                      </Label>
                      <Link 
                        to="/forgot-password" 
                        className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <Input
                      id="admin-login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                      className="bg-slate-700/30 border-slate-600/50 text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:ring-slate-500/50 focus:ring-1"
                      data-testid="input-login-password"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-slate-100 font-semibold py-2.5 rounded-lg transition-all duration-300"
                    disabled={loginMutation.isPending}
                    data-testid="button-login-submit"
                  >
                    {loginMutation.isPending ? 'Authenticating...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="admin-signup-firstname" className="text-sm font-medium text-slate-300">
                        First Name
                      </Label>
                      <Input
                        id="admin-signup-firstname"
                        type="text"
                        placeholder="First name"
                        value={signupForm.firstName}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, firstName: e.target.value }))}
                        className="bg-slate-700/30 border-slate-600/50 text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:ring-slate-500/50 focus:ring-1"
                        data-testid="input-signup-firstname"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-signup-lastname" className="text-sm font-medium text-slate-300">
                        Last Name
                      </Label>
                      <Input
                        id="admin-signup-lastname"
                        type="text"
                        placeholder="Last name"
                        value={signupForm.lastName}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, lastName: e.target.value }))}
                        className="bg-slate-700/30 border-slate-600/50 text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:ring-slate-500/50 focus:ring-1"
                        data-testid="input-signup-lastname"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-signup-email" className="text-sm font-medium text-slate-300">
                      Email Address
                    </Label>
                    <Input
                      id="admin-signup-email"
                      type="email"
                      placeholder="admin@example.com"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="bg-slate-700/30 border-slate-600/50 text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:ring-slate-500/50 focus:ring-1"
                      data-testid="input-signup-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-signup-username" className="text-sm font-medium text-slate-300">
                      Username
                    </Label>
                    <Input
                      id="admin-signup-username"
                      type="text"
                      placeholder="Choose a username"
                      value={signupForm.username}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, username: e.target.value }))}
                      required
                      className="bg-slate-700/30 border-slate-600/50 text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:ring-slate-500/50 focus:ring-1"
                      data-testid="input-signup-username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-signup-password" className="text-sm font-medium text-slate-300">
                      Password
                    </Label>
                    <Input
                      id="admin-signup-password"
                      type="password"
                      placeholder="Min. 6 characters"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                      minLength={6}
                      className="bg-slate-700/30 border-slate-600/50 text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:ring-slate-500/50 focus:ring-1"
                      data-testid="input-signup-password"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-slate-100 font-semibold py-2.5 rounded-lg transition-all duration-300"
                    disabled={registerMutation.isPending}
                    data-testid="button-signup-submit"
                  >
                    {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Security Notice */}
            <div className="mt-6 p-3 bg-slate-700/20 border border-slate-700/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-relaxed">
                  All administrative actions are logged. Unauthorized access attempts will be tracked.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center text-xs text-slate-500">
          <p>Secure Administrator Portal</p>
          <p className="mt-1">Multi-tenant Infrastructure Management</p>
        </div>
      </div>
    </div>
  );
}
