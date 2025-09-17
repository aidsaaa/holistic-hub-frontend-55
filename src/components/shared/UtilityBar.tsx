import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  LogOut, 
  User, 
  ArrowLeft,
  Settings,
  UserCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface UtilityBarProps {
  userRole: 'student' | 'faculty' | 'admin' | 'government';
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const UtilityBar = ({ userRole, showBackButton = true, onBackClick }: UtilityBarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
  };

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'student': return 'text-student-primary';
      case 'faculty': return 'text-faculty-primary';
      case 'admin': return 'text-admin-primary';
      case 'government': return 'text-government-primary';
      default: return 'text-primary';
    }
  };

  const getRoleGradient = () => {
    switch (userRole) {
      case 'student': return 'gradient-student';
      case 'faculty': return 'gradient-faculty';
      case 'admin': return 'gradient-admin';
      case 'government': return 'gradient-government';
      default: return 'bg-primary';
    }
  };

  const getRoleName = () => {
    switch (userRole) {
      case 'student': return 'Student Portal';
      case 'faculty': return 'Faculty Dashboard';
      case 'admin': return 'Admin Portal';
      case 'government': return 'Government Portal';
      default: return 'Portal';
    }
  };

  return (
    <div className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side - Back Button & Title */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="hover:bg-muted/50"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg ${getRoleGradient()} flex items-center justify-center`}>
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-lg font-bold ${getRoleColor()}`}>
                  {getRoleName()}
                </h1>
                <p className="text-xs text-muted-foreground">
                  Welcome back, {user?.name}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative hover:bg-muted/50">
                  <Bell className="h-4 w-4" />
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                  >
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-popover/95 backdrop-blur-sm border shadow-lg">
                <div className="p-3 border-b">
                  <h4 className="font-medium">Notifications</h4>
                  <p className="text-sm text-muted-foreground">You have 3 unread notifications</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <DropdownMenuItem className="p-4 cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">New assignment posted</p>
                      <p className="text-xs text-muted-foreground">Mathematics - Due in 3 days</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-4 cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Grade updated</p>
                      <p className="text-xs text-muted-foreground">Physics Lab Report - A+</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-4 cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Attendance reminder</p>
                      <p className="text-xs text-muted-foreground">Low attendance warning</p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                </div>
                <div className="p-2 border-t">
                  <Button variant="ghost" size="sm" className="w-full justify-center">
                    View All Notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                  <UserCircle className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover/95 backdrop-blur-sm border shadow-lg">
                <div className="p-3 border-b">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{userRole}</p>
                </div>
                <DropdownMenuItem className="cursor-pointer">
                  <UserCircle className="h-4 w-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};