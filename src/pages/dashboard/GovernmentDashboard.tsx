import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
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
  MapPin
} from 'lucide-react';

import { UtilityBar } from '@/components/shared/UtilityBar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const GovernmentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data
  const [institutionStats] = useState({
    totalInstitutions: 45,
    totalStudents: 28567,
    totalFaculty: 1834,
    complianceRate: 94.2,
    averageGrade: 82.5,
    graduationRate: 87.3
  });

  const [complianceData] = useState([
    { institution: 'Central University', compliance: 98, status: 'excellent', students: 8500, lastAudit: '2024-01-15' },
    { institution: 'Tech Institute', compliance: 92, status: 'good', students: 6200, lastAudit: '2024-02-20' },
    { institution: 'Community College', compliance: 89, status: 'satisfactory', students: 3800, lastAudit: '2024-03-10' },
    { institution: 'Arts Academy', compliance: 85, status: 'needs_improvement', students: 2100, lastAudit: '2024-01-25' }
  ]);

  const [policyUpdates] = useState([
    { id: 1, title: 'New Digital Accessibility Standards', date: '2024-03-15', status: 'pending', affected: 45 },
    { id: 2, title: 'Updated Data Privacy Regulations', date: '2024-03-10', status: 'implemented', affected: 45 },
    { id: 3, title: 'Student Financial Aid Guidelines', date: '2024-02-28', status: 'draft', affected: 32 }
  ]);

  const [recentReports] = useState([
    { title: 'Q1 2024 Education Metrics', type: 'quarterly', date: '2024-03-31', size: '2.4 MB' },
    { title: 'Student Outcome Analysis', type: 'analytical', date: '2024-03-25', size: '1.8 MB' },
    { title: 'Faculty Performance Review', type: 'performance', date: '2024-03-20', size: '3.1 MB' },
    { title: 'Compliance Audit Summary', type: 'compliance', date: '2024-03-15', size: '1.2 MB' }
  ]);


  const handlePolicyAction = (policyId: number, action: string) => {
    toast({
      title: `Policy ${action}`,
      description: `The policy has been ${action}d successfully.`,
    });
  };

  const handleDownloadReport = (reportTitle: string) => {
    toast({
      title: "Report Downloaded",
      description: `${reportTitle} has been downloaded.`,
    });
  };

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
              value="academics"
              className="data-[state=active]:bg-government-primary/20 data-[state=active]:text-government-primary data-[state=active]:border-b-2 data-[state=active]:border-government-primary"
            >
              Academics
            </TabsTrigger>
            <TabsTrigger 
              value="attendance"
              className="data-[state=active]:bg-government-primary/20 data-[state=active]:text-government-primary data-[state=active]:border-b-2 data-[state=active]:border-government-primary"
            >
              Attendance
            </TabsTrigger>
            <TabsTrigger 
              value="activities"
              className="data-[state=active]:bg-government-primary/20 data-[state=active]:text-government-primary data-[state=active]:border-b-2 data-[state=active]:border-government-primary"
            >
              Activities
            </TabsTrigger>
            <TabsTrigger 
              value="career"
              className="data-[state=active]:bg-government-primary/20 data-[state=active]:text-government-primary data-[state=active]:border-b-2 data-[state=active]:border-government-primary"
            >
              Career Twin
            </TabsTrigger>
            <TabsTrigger 
              value="portfolio"
              className="data-[state=active]:bg-government-primary/20 data-[state=active]:text-government-primary data-[state=active]:border-b-2 data-[state=active]:border-government-primary"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger 
              value="achievements"
              className="data-[state=active]:bg-government-primary/20 data-[state=active]:text-government-primary data-[state=active]:border-b-2 data-[state=active]:border-government-primary"
            >
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Welcome Section */}
            <Card className="glass-card border-government-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Educational Oversight 🏛️</h2>
                    <p className="text-muted-foreground mb-4">
                      Monitor institutional performance and ensure regulatory compliance across the education sector.
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 text-government-primary mr-1" />
                        <span>{institutionStats.totalInstitutions} Institutions</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-blue-500 mr-1" />
                        <span>{institutionStats.totalStudents.toLocaleString()} Students</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        <span>{institutionStats.complianceRate}% Compliance</span>
                      </div>
                    </div>
                  </div>
                  <Button className="gradient-government">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <GraduationCap className="h-5 w-5 text-government-primary" />
                    <h3 className="font-medium">Graduation Rate</h3>
                  </div>
                  <p className="text-2xl font-bold">{institutionStats.graduationRate}%</p>
                  <p className="text-xs text-muted-foreground">national average: 85.1%</p>
                  <Progress value={institutionStats.graduationRate} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Average Grade</h3>
                  </div>
                  <p className="text-2xl font-bold">{institutionStats.averageGrade}%</p>
                  <p className="text-xs text-muted-foreground">across all institutions</p>
                  <Progress value={institutionStats.averageGrade} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Faculty Ratio</h3>
                  </div>
                  <p className="text-2xl font-bold">1:{Math.round(institutionStats.totalStudents / institutionStats.totalFaculty)}</p>
                  <p className="text-xs text-muted-foreground">student to faculty ratio</p>
                  <Progress value={75} className="mt-2 h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Institution Compliance */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCheck className="h-5 w-5 mr-2 text-government-primary" />
                  Institution Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceData.map((institution, index) => (
                    <div key={index} className="p-4 rounded-lg bg-government-primary/5 hover:bg-government-primary/10 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{institution.institution}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant="secondary" 
                            className={`${
                              institution.status === 'excellent' ? 'bg-green-100 text-green-700' :
                              institution.status === 'good' ? 'bg-blue-100 text-blue-700' :
                              institution.status === 'satisfactory' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}
                          >
                            {institution.compliance}% Compliant
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Students:</span>
                          <p className="font-medium">{institution.students.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Audit:</span>
                          <p className="font-medium">{new Date(institution.lastAudit).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Progress value={institution.compliance} className="mt-3 h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Policy Updates */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-government-primary" />
                  Policy Updates & Regulations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {policyUpdates.map((policy) => (
                    <div key={policy.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                      {policy.status === 'implemented' && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {policy.status === 'pending' && <AlertCircle className="h-4 w-4 text-orange-500" />}
                      {policy.status === 'draft' && <Calendar className="h-4 w-4 text-blue-500" />}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{policy.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {policy.affected} institutions affected • {new Date(policy.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {policy.status === 'pending' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs"
                            onClick={() => handlePolicyAction(policy.id, 'approve')}
                          >
                            Approve
                          </Button>
                        )}
                        {policy.status === 'draft' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs"
                            onClick={() => handlePolicyAction(policy.id, 'review')}
                          >
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Overview Stats */}
            <Card className="glass-card border-government-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Sector Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Institutions</span>
                  <span className="font-bold text-government-primary">{institutionStats.totalInstitutions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Students</span>
                  <span className="font-bold">{institutionStats.totalStudents.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Faculty Members</span>
                  <span className="font-bold">{institutionStats.totalFaculty.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Compliance Rate</span>
                  <span className="font-bold text-green-500">{institutionStats.complianceRate}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-government-primary" />
                  Recent Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report, index) => (
                    <div key={index} className="p-3 rounded-lg bg-government-primary/5 hover:bg-government-primary/10 transition-colors cursor-pointer"
                         onClick={() => handleDownloadReport(report.title)}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">{report.title}</p>
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{report.type}</span>
                        <span>{report.size}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(report.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Reports
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