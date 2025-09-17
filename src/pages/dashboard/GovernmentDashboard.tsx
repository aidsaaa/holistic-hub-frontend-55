import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  FileCheck, 
  BarChart3, 
  Globe, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Users,
  GraduationCap,
  Award,
  Calendar,
  Download,
  Shield,
  Lock,
  Database,
  MapPin,
  Search,
  Filter,
  Eye,
  FileText,
  Zap,
  Target,
  Map,
  BookOpen,
  School,
  Building,
  Verified,
  AlertTriangle,
  Brain,
  UserCog
} from 'lucide-react';

import { UtilityBar } from '@/components/shared/UtilityBar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const GovernmentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedInstituteType, setSelectedInstituteType] = useState('all');
  
  // Enhanced mock data for comprehensive government dashboard
  const [nationalStats] = useState({
    totalInstitutions: 1248,
    totalStudents: 2856743,
    totalFaculty: 183456,
    nationalAvgAttendance: 76.8,
    topPerformingInstitutions: 156,
    totalVerifiedAchievements: 45678,
    pendingComplianceReports: 23,
    blockchainVerifications: 156789
  });

  const [institutionComparison] = useState([
    { 
      id: 1,
      name: 'IIT Delhi', 
      state: 'Delhi', 
      type: 'Technical', 
      nirf: 2, 
      naac: 'A++', 
      students: 8500, 
      attendance: 85.2, 
      compliance: 98.5, 
      blockchainVerified: true,
      status: 'excellent',
      lastAudit: '2024-01-15'
    },
    { 
      id: 2,
      name: 'Delhi University', 
      state: 'Delhi', 
      type: 'University', 
      nirf: 12, 
      naac: 'A+', 
      students: 15200, 
      attendance: 78.9, 
      compliance: 94.2, 
      blockchainVerified: true,
      status: 'excellent',
      lastAudit: '2024-02-20'
    },
    { 
      id: 3,
      name: 'Mumbai Technical Institute', 
      state: 'Maharashtra', 
      type: 'Technical', 
      nirf: 28, 
      naac: 'A', 
      students: 6200, 
      attendance: 82.1, 
      compliance: 92.7, 
      blockchainVerified: true,
      status: 'good',
      lastAudit: '2024-03-10'
    },
    { 
      id: 4,
      name: 'Bangalore Arts College', 
      state: 'Karnataka', 
      type: 'Arts', 
      nirf: 45, 
      naac: 'B++', 
      students: 3800, 
      attendance: 74.5, 
      compliance: 89.3, 
      blockchainVerified: false,
      status: 'satisfactory',
      lastAudit: '2024-01-25'
    },
    { 
      id: 5,
      name: 'Chennai Medical College', 
      state: 'Tamil Nadu', 
      type: 'Medical', 
      nirf: 15, 
      naac: 'A+', 
      students: 4500, 
      attendance: 88.7, 
      compliance: 96.1, 
      blockchainVerified: true,
      status: 'excellent',
      lastAudit: '2024-02-15'
    }
  ]);

  const [statePerformance] = useState([
    { state: 'Delhi', institutions: 45, avgAttendance: 84.2, compliance: 96.8, rank: 1 },
    { state: 'Karnataka', institutions: 128, avgAttendance: 81.5, compliance: 94.3, rank: 2 },
    { state: 'Maharashtra', institutions: 156, avgAttendance: 79.8, compliance: 92.7, rank: 3 },
    { state: 'Tamil Nadu', institutions: 134, avgAttendance: 78.9, compliance: 91.5, rank: 4 },
    { state: 'Uttar Pradesh', institutions: 189, avgAttendance: 74.2, compliance: 87.9, rank: 8 },
    { state: 'West Bengal', institutions: 98, avgAttendance: 76.5, compliance: 89.2, rank: 6 }
  ]);

  const [complianceAlerts] = useState([
    { id: 1, type: 'audit', message: '📊 Audit report available for XYZ University', state: 'Karnataka', priority: 'medium', time: '2 hours ago' },
    { id: 2, type: 'warning', message: '⚠️ Attendance below 60% in 3 institutions in Karnataka', state: 'Karnataka', priority: 'high', time: '4 hours ago' },
    { id: 3, type: 'compliance', message: '🔍 NAAC accreditation due for 5 institutions', state: 'Tamil Nadu', priority: 'medium', time: '1 day ago' },
    { id: 4, type: 'blockchain', message: '✅ 156 new achievements verified on blockchain', state: 'All', priority: 'low', time: '2 days ago' }
  ]);

  const [blockchainReports] = useState([
    { id: 1, title: 'National Student Achievement Verification', records: 45678, verified: true, hash: '0x1a2b3c...', date: '2024-03-15' },
    { id: 2, title: 'Institution Compliance Records', records: 1248, verified: true, hash: '0x4d5e6f...', date: '2024-03-14' },
    { id: 3, title: 'Faculty Certification Database', records: 183456, verified: true, hash: '0x7g8h9i...', date: '2024-03-13' },
    { id: 4, title: 'Attendance Verification System', records: 2856743, verified: true, hash: '0xjk10l11...', date: '2024-03-12' }
  ]);

  const [nationalReports] = useState([
    { id: 1, title: 'National Education Report 2024', type: 'annual', scope: 'country', institutions: 1248, date: '2024-03-31', size: '15.4 MB', format: 'PDF' },
    { id: 2, title: 'State-wise Performance Analysis', type: 'analytical', scope: 'state', institutions: 'all', date: '2024-03-25', size: '8.7 MB', format: 'Excel' },
    { id: 3, title: 'NIRF Rankings Compilation', type: 'ranking', scope: 'national', institutions: 300, date: '2024-03-20', size: '3.2 MB', format: 'PDF' },
    { id: 4, title: 'Blockchain Verification Report', type: 'technology', scope: 'national', institutions: 1248, date: '2024-03-15', size: '2.1 MB', format: 'JSON' },
    { id: 5, title: 'Compliance Monitoring Dashboard', type: 'compliance', scope: 'regional', institutions: 156, date: '2024-03-10', size: '4.8 MB', format: 'Excel' }
  ]);


  const handleComplianceAction = (alertId: number, action: string) => {
    toast({
      title: `Compliance ${action}`,
      description: `The compliance matter has been ${action}d successfully.`,
    });
  };

  const handleDownloadReport = (reportTitle: string) => {
    toast({
      title: "Report Downloaded",
      description: `${reportTitle} has been downloaded.`,
    });
  };

  const handleInstitutionDrillDown = (institutionId: number) => {
    toast({
      title: "Institution Details",
      description: "Opening detailed institution analytics dashboard.",
    });
  };

  const filteredInstitutions = institutionComparison.filter(institution => 
    (selectedState === 'all' || institution.state === selectedState) &&
    (selectedInstituteType === 'all' || institution.type === selectedInstituteType) &&
    (searchTerm === '' || institution.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-government-secondary/5 to-government-primary/5">
      <UtilityBar userRole="government" />

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-card/80 backdrop-blur-sm">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-government-primary/20 data-[state=active]:text-government-primary data-[state=active]:border-b-2 data-[state=active]:border-government-primary"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="institutions"
              className="data-[state=active]:bg-government-primary/20 data-[state=active]:text-government-primary data-[state=active]:border-b-2 data-[state=active]:border-government-primary"
            >
              Institutions
            </TabsTrigger>
            <TabsTrigger 
              value="attendance"
              className="data-[state=active]:bg-government-primary/20 data-[state=active]:text-government-primary data-[state=active]:border-b-2 data-[state=active]:border-government-primary"
            >
              Attendance
            </TabsTrigger>
            <TabsTrigger 
              value="reports"
              className="data-[state=active]:bg-government-primary/20 data-[state=active]:text-government-primary data-[state=active]:border-b-2 data-[state=active]:border-government-primary"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger 
              value="compliance"
              className="data-[state=active]:bg-government-primary/20 data-[state=active]:text-government-primary data-[state=active]:border-b-2 data-[state=active]:border-government-primary"
            >
              Compliance
            </TabsTrigger>
            <TabsTrigger 
              value="notifications"
              className="data-[state=active]:bg-government-primary/20 data-[state=active]:text-government-primary data-[state=active]:border-b-2 data-[state=active]:border-government-primary"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="profile"
              className="data-[state=active]:bg-government-primary/20 data-[state=active]:text-government-primary data-[state=active]:border-b-2 data-[state=active]:border-government-primary"
            >
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Welcome Section with Multi-Factor Authentication */}
            <Card className="glass-card border-government-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Welcome, Ministry Official – Education Dept 👋</h2>
                    <p className="text-muted-foreground mb-4">
                      Secure national education oversight with blockchain-backed data and comprehensive analytics.
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 text-government-primary mr-1" />
                        <span>{nationalStats.totalInstitutions} Institutions</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-blue-500 mr-1" />
                        <span>{nationalStats.totalStudents.toLocaleString()} Students</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span>{nationalStats.nationalAvgAttendance}% Avg Attendance</span>
                      </div>
                      <div className="flex items-center">
                        <Verified className="h-4 w-4 text-purple-500 mr-1" />
                        <span>{nationalStats.totalVerifiedAchievements.toLocaleString()} Verified</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Lock className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-green-600">MFA Authenticated • Last login: Today, 9:30 AM</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => handleDownloadReport('National Audit')}>
                      <FileCheck className="h-4 w-4 mr-2" />
                      Audit Report
                    </Button>
                    <Button className="gradient-government" onClick={() => handleDownloadReport('National Report')}>
                      <Download className="h-4 w-4 mr-2" />
                      National Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* National Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">National Avg. Attendance</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{nationalStats.nationalAvgAttendance}%</p>
                  <p className="text-xs text-muted-foreground">across all institutions</p>
                  <Progress value={nationalStats.nationalAvgAttendance} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-5 w-5 text-government-primary" />
                    <h3 className="font-medium">Top Performing</h3>
                  </div>
                  <p className="text-2xl font-bold">{nationalStats.topPerformingInstitutions}</p>
                  <p className="text-xs text-muted-foreground">institutions above 90%</p>
                  <Progress value={85} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Verified className="h-5 w-5 text-purple-500" />
                    <h3 className="font-medium">Blockchain Verified</h3>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{nationalStats.blockchainVerifications.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">tamper-proof records</p>
                  <Progress value={92} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <h3 className="font-medium">Pending Compliance</h3>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{nationalStats.pendingComplianceReports}</p>
                  <p className="text-xs text-muted-foreground">reports requiring review</p>
                  <Progress value={15} className="mt-2 h-2" />
                </CardContent>
              </Card>
            </div>

            {/* State-wise Performance Heatmap */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Map className="h-5 w-5 mr-2 text-government-primary" />
                  State-wise Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statePerformance.map((state, index) => (
                    <div key={index} className="p-4 rounded-lg bg-government-primary/5 hover:bg-government-primary/10 transition-colors cursor-pointer"
                         onClick={() => toast({ title: "State Details", description: `Opening detailed analytics for ${state.state}` })}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{state.state}</h4>
                          <Badge variant="outline">Rank #{state.rank}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant="secondary" 
                            className={`${
                              state.compliance >= 95 ? 'bg-green-100 text-green-700' :
                              state.compliance >= 90 ? 'bg-blue-100 text-blue-700' :
                              state.compliance >= 85 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}
                          >
                            {state.compliance}% Compliance
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Institutions:</span>
                          <p className="font-medium">{state.institutions}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg Attendance:</span>
                          <p className="font-medium">{state.avgAttendance}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Performance:</span>
                          <p className="font-medium text-government-primary">
                            {state.compliance >= 95 ? 'Excellent' : 
                             state.compliance >= 90 ? 'Good' : 
                             state.compliance >= 85 ? 'Satisfactory' : 'Needs Improvement'}
                          </p>
                        </div>
                      </div>
                      <Progress value={state.compliance} className="mt-3 h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blockchain-backed Data Integrity */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-purple-500" />
                  Blockchain-backed Data Integrity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {blockchainReports.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/50">
                      <Verified className="h-4 w-4 text-purple-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{report.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.records.toLocaleString()} records • Hash: {report.hash}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          ✅ Verified
                        </Badge>
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          Audit
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-2">
                    <Button size="sm" variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      View All Blockchain Records
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* National Overview Stats */}
            <Card className="glass-card border-government-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">National Education Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Institutions</span>
                  <span className="font-bold text-government-primary">{nationalStats.totalInstitutions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Students</span>
                  <span className="font-bold">{nationalStats.totalStudents.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Faculty Members</span>
                  <span className="font-bold">{nationalStats.totalFaculty.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Blockchain Records</span>
                  <span className="font-bold text-purple-500">{nationalStats.blockchainVerifications.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Verified Achievements</span>
                  <span className="font-bold text-green-500">{nationalStats.totalVerifiedAchievements.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* National Compliance Alerts */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                  National Compliance Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complianceAlerts.map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      alert.priority === 'high' ? 'bg-red-50/50 border-red-200 dark:bg-red-950/20' :
                      alert.priority === 'medium' ? 'bg-orange-50/50 border-orange-200 dark:bg-orange-950/20' :
                      'bg-blue-50/50 border-blue-200 dark:bg-blue-950/20'
                    }`}
                         onClick={() => handleComplianceAction(alert.id, 'investigate')}>
                      <div className="flex items-start space-x-2">
                        {alert.type === 'audit' && <FileCheck className="h-4 w-4 text-blue-500 mt-0.5" />}
                        {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />}
                        {alert.type === 'compliance' && <Shield className="h-4 w-4 text-purple-500 mt-0.5" />}
                        {alert.type === 'blockchain' && <Verified className="h-4 w-4 text-green-500 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {alert.state} • {alert.time} • Priority: {alert.priority}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  All Alerts Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-government-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => toast({ title: "Audit Scheduled", description: "Institution audit has been scheduled." })}
                >
                  <FileCheck className="h-4 w-4 mr-2" />
                  Schedule Audit
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => toast({ title: "Report Generated", description: "Compliance report is being generated." })}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Compliance Report
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => toast({ title: "Alert Sent", description: "Policy update notifications sent to all institutions." })}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Send Policy Alert
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => toast({ title: "Export Started", description: "Data export is being processed." })}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </CardContent>
            </Card>
          </div>
            </div>
          </TabsContent>

          <TabsContent value="academics" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Academic Policy Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Academic policy management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>National Attendance Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">National attendance monitoring dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>National Activities Oversight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">National student activities and skills oversight coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="career" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>National Career Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">National career development and placement oversight coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>National Portfolio Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">National student portfolio standards and verification coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>National Achievement Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">National student achievement recognition and certification coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="institutions" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-government-primary" />
                  Institution Comparison & Regional Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['North Zone', 'South Zone', 'East Zone', 'West Zone', 'Central Zone', 'Northeast Zone'].map((zone) => (
                    <div key={zone} className="p-4 rounded-lg bg-government-primary/5">
                      <h4 className="font-medium mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {zone}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Institutions:</span>
                          <span className="font-medium">{Math.floor(Math.random() * 50) + 20}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Avg Performance:</span>
                          <span className="font-medium">{(Math.random() * 20 + 75).toFixed(1)}%</span>
                        </div>
                        <Progress value={Math.random() * 30 + 70} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-6">
...
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-government-primary" />
                  National-Level Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium">National Education Heatmap</p>
                    <p className="text-sm text-muted-foreground">Interactive visualization of education metrics across states</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GovernmentDashboard;