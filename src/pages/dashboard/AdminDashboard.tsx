import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  BarChart3, 
  Settings, 
  AlertTriangle,
  TrendingUp,
  Database,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Brain,
  Bell,
  UserCog
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

import { UtilityBar } from '@/components/shared/UtilityBar';
import { ComprehensiveReports } from '@/components/dashboard/admin/ComprehensiveReports';
import { PredictiveAnalytics } from '@/components/dashboard/admin/PredictiveAnalytics';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data
  const [systemStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalCourses: 67,
    systemUptime: 99.8,
    storageUsed: 73,
    avgResponseTime: 245
  });

  const [userGrowth] = useState([
    { month: 'Jan', users: 856 },
    { month: 'Feb', users: 923 },
    { month: 'Mar', users: 1057 },
    { month: 'Apr', users: 1134 },
    { month: 'May', users: 1247 }
  ]);

  const [systemAlerts] = useState([
    { id: 1, type: 'warning', message: 'High database load detected', time: '10 minutes ago', severity: 'medium' },
    { id: 2, type: 'info', message: 'Scheduled maintenance completed', time: '2 hours ago', severity: 'low' },
    { id: 3, type: 'error', message: 'Failed login attempts exceeded threshold', time: '1 day ago', severity: 'high' }
  ]);

  const [recentActions] = useState([
    { action: 'User Created', details: 'New faculty member: Dr. Sarah Johnson', time: '1 hour ago' },
    { action: 'Course Updated', details: 'Mathematics 101 curriculum revised', time: '3 hours ago' },
    { action: 'System Backup', details: 'Daily backup completed successfully', time: '6 hours ago' },
    { action: 'User Suspended', details: 'Student account suspended for policy violation', time: '1 day ago' }
  ]);


  const handleSystemAction = (action: string) => {
    toast({
      title: `System ${action}`,
      description: `${action} has been initiated.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-admin-secondary/5 to-admin-primary/5">
      <UtilityBar userRole="admin" />

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-card/80 backdrop-blur-sm">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-admin-primary/20 data-[state=active]:text-admin-primary data-[state=active]:border-b-2 data-[state=active]:border-admin-primary"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="academics"
              className="data-[state=active]:bg-admin-primary/20 data-[state=active]:text-admin-primary data-[state=active]:border-b-2 data-[state=active]:border-admin-primary"
            >
              Academics
            </TabsTrigger>
            <TabsTrigger 
              value="attendance"
              className="data-[state=active]:bg-admin-primary/20 data-[state=active]:text-admin-primary data-[state=active]:border-b-2 data-[state=active]:border-admin-primary"
            >
              Attendance
            </TabsTrigger>
            <TabsTrigger 
              value="activities"
              className="data-[state=active]:bg-admin-primary/20 data-[state=active]:text-admin-primary data-[state=active]:border-b-2 data-[state=active]:border-admin-primary"
            >
              Activities
            </TabsTrigger>
            <TabsTrigger 
              value="career"
              className="data-[state=active]:bg-admin-primary/20 data-[state=active]:text-admin-primary data-[state=active]:border-b-2 data-[state=active]:border-admin-primary"
            >
              Career Twin
            </TabsTrigger>
            <TabsTrigger 
              value="portfolio"
              className="data-[state=active]:bg-admin-primary/20 data-[state=active]:text-admin-primary data-[state=active]:border-b-2 data-[state=active]:border-admin-primary"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger 
              value="achievements"
              className="data-[state=active]:bg-admin-primary/20 data-[state=active]:text-admin-primary data-[state=active]:border-b-2 data-[state=active]:border-admin-primary"
            >
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Welcome Section */}
            <Card className="glass-card border-admin-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">System Overview 🔧</h2>
                    <p className="text-muted-foreground mb-4">
                      Monitor and manage your institution's digital infrastructure.
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-admin-primary mr-1" />
                        <span>{systemStats.totalUsers} Users</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span>{systemStats.systemUptime}% Uptime</span>
                      </div>
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 text-blue-500 mr-1" />
                        <span>{systemStats.avgResponseTime}ms Response</span>
                      </div>
                    </div>
                  </div>
                  <Button className="gradient-admin" onClick={() => handleSystemAction('Backup')}>
                    <Database className="h-4 w-4 mr-2" />
                    Run Backup
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-admin-primary" />
                    <h3 className="font-medium">Active Users</h3>
                  </div>
                  <p className="text-2xl font-bold">{systemStats.activeUsers}</p>
                  <p className="text-xs text-muted-foreground">of {systemStats.totalUsers} total</p>
                  <Progress value={(systemStats.activeUsers / systemStats.totalUsers) * 100} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Database className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Storage Used</h3>
                  </div>
                  <p className="text-2xl font-bold">{systemStats.storageUsed}%</p>
                  <p className="text-xs text-muted-foreground">of available space</p>
                  <Progress value={systemStats.storageUsed} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">System Health</h3>
                  </div>
                  <p className="text-2xl font-bold">{systemStats.systemUptime}%</p>
                  <p className="text-xs text-muted-foreground">uptime this month</p>
                  <Progress value={systemStats.systemUptime} className="mt-2 h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Recent Admin Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-admin-primary" />
                  Recent Admin Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActions.map((action, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{action.action}</p>
                        <p className="text-xs text-muted-foreground">{action.details}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{action.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Growth Chart Placeholder */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-admin-primary" />
                  User Growth Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Analytics Chart Placeholder</p>
                    <p className="text-xs text-muted-foreground">Growth trend: +{((systemStats.totalUsers - 856) / 856 * 100).toFixed(1)}% since January</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* System Alerts */}
            <Card className="glass-card border-admin-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg border ${
                      alert.severity === 'high' ? 'bg-red-50/50 border-red-200 dark:bg-red-950/20' :
                      alert.severity === 'medium' ? 'bg-orange-50/50 border-orange-200 dark:bg-orange-950/20' :
                      'bg-blue-50/50 border-blue-200 dark:bg-blue-950/20'
                    }`}>
                      <div className="flex items-start space-x-2">
                        {alert.type === 'error' && <XCircle className="h-4 w-4 text-red-500 mt-0.5" />}
                        {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />}
                        {alert.type === 'info' && <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-admin-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => handleSystemAction('Maintenance')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Schedule Maintenance
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => handleSystemAction('User Export')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Export User Data
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => handleSystemAction('Security Scan')}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Run Security Scan
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => handleSystemAction('Cache Clear')}
                >
                  <Database className="h-4 w-4 mr-2" />
                  Clear System Cache
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-green-100 text-green-700">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Services</span>
                  <Badge className="bg-green-100 text-green-700">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">File Storage</span>
                  <Badge className="bg-yellow-100 text-yellow-700">Warning</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Service</span>
                  <Badge className="bg-green-100 text-green-700">Online</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
            </div>
          </TabsContent>

          <TabsContent value="academics" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Academic Administration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Academic administration features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Attendance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Attendance analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Student Activities Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Student activities and skills management system coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="career" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Career Development Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Career development and placement management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Portfolio Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Student portfolio oversight and management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Achievement Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Student achievement tracking and certification management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;