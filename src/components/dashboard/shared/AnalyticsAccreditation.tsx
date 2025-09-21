import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  Award, 
  Target, 
  BarChart3,
  PieChart,
  FileText,
  Download,
  Eye,
  Filter,
  Calendar,
  Users,
  Building,
  Globe,
  CheckCircle,
  AlertTriangle,
  Zap,
  Brain,
  Sparkles
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AnalyticsAccreditationProps {
  userRole: 'student' | 'faculty' | 'admin' | 'government';
}

export const AnalyticsAccreditation = ({ userRole }: AnalyticsAccreditationProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('current_year');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for different accreditation bodies and analytics
  const accreditationData = {
    naac: {
      currentGrade: 'A+',
      score: 3.65,
      maxScore: 4.0,
      validUntil: '2027-03-15',
      lastAssessment: '2024-03-15',
      criteria: [
        { name: 'Curricular Aspects', score: 3.8, maxScore: 4.0, weightage: 15 },
        { name: 'Teaching-Learning & Evaluation', score: 3.7, maxScore: 4.0, weightage: 20 },
        { name: 'Research & Innovation', score: 3.5, maxScore: 4.0, weightage: 15 },
        { name: 'Infrastructure & Learning Resources', score: 3.9, maxScore: 4.0, weightage: 15 },
        { name: 'Student Support & Progression', score: 3.6, maxScore: 4.0, weightage: 15 },
        { name: 'Governance & Leadership', score: 3.4, maxScore: 4.0, weightage: 10 },
        { name: 'Institutional Values & Best Practices', score: 3.8, maxScore: 4.0, weightage: 10 }
      ],
      recommendations: [
        'Enhance research publication output',
        'Improve industry collaboration programs',
        'Strengthen alumni engagement initiatives'
      ]
    },
    nirf: {
      currentRank: 47,
      category: 'Engineering',
      previousRank: 52,
      trend: 'improving',
      score: 58.67,
      maxScore: 100,
      parameters: [
        { name: 'Teaching, Learning & Resources', score: 72.4, maxScore: 100, weightage: 30 },
        { name: 'Research & Professional Practice', score: 45.8, maxScore: 100, weightage: 30 },
        { name: 'Graduation Outcomes', score: 68.9, maxScore: 100, weightage: 20 },
        { name: 'Outreach & Inclusivity', score: 52.3, maxScore: 100, weightage: 10 },
        { name: 'Perception', score: 41.2, maxScore: 100, weightage: 10 }
      ]
    },
    aicte: {
      approvalStatus: 'Approved',
      validUntil: '2025-07-30',
      intakeCapacity: 240,
      currentStrength: 180,
      complianceScore: 92,
      criticalIssues: 0,
      pendingActions: 2,
      lastInspection: '2023-11-15',
      requirements: [
        { name: 'Faculty Requirements', status: 'compliant', score: 95 },
        { name: 'Infrastructure Norms', status: 'compliant', score: 98 },
        { name: 'Laboratory Requirements', status: 'compliant', score: 90 },
        { name: 'Library Facilities', status: 'compliant', score: 88 }
      ]
    }
  };

  const institutionalMetrics = {
    studentActivities: {
      totalRegistered: 2847,
      activeParticipants: 2156,
      averageActivitiesPerStudent: 4.2,
      topCategories: [
        { name: 'Certifications', count: 456, growth: 15 },
        { name: 'Internships', count: 234, growth: 22 },
        { name: 'Competitions', count: 189, growth: 8 },
        { name: 'Community Service', count: 145, growth: 18 }
      ]
    },
    facultyEngagement: {
      totalFaculty: 145,
      activeReviewers: 128,
      averageReviewTime: '2.3 days',
      approvalRate: 87.4,
      monthlyApprovals: 156
    },
    institutionalImpact: {
      totalVerifiedAchievements: 1234,
      blockchainRecords: 1234,
      industryPartnerships: 23,
      placementRate: 94.5,
      averagePackage: '8.5 LPA'
    }
  };

  const predictiveAnalytics = {
    naacPrediction: {
      projectedScore: 3.72,
      confidenceLevel: 89,
      recommendations: [
        'Increase research publications by 15%',
        'Enhance student support services',
        'Strengthen industry collaborations'
      ]
    },
    nirfPrediction: {
      projectedRank: 42,
      improvement: 5,
      keyFactors: [
        'Research output improvement',
        'Better graduation outcomes',
        'Enhanced perception scores'
      ]
    },
    studentEngagement: {
      projectedGrowth: 18,
      riskFactors: ['Semester workload', 'Exam periods'],
      opportunities: ['Summer programs', 'Industry workshops']
    }
  };

  const handleExportReport = (type: string) => {
    toast({
      title: "Report Generation Started",
      description: `Generating ${type} compliance report...`,
    });
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: `${type} report has been generated and is ready for download.`,
      });
    }, 2000);
  };

  const getRoleBasedView = () => {
    switch (userRole) {
      case 'student':
        return 'Personal activity analytics and portfolio insights';
      case 'faculty':
        return 'Department-level insights and approval analytics';
      case 'admin':
        return 'Institution-wide compliance and accreditation analytics';
      case 'government':
        return 'Multi-institutional and policy-level analytics';
      default:
        return 'Comprehensive analytics dashboard';
    }
  };

  const getAccreditationStatusColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card border-student-primary/20 glow-student">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Brain className="h-6 w-6 mr-2 text-student-primary" />
                Analytics & Accreditation Intelligence
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {getRoleBasedView()}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current_year">Current Year</SelectItem>
                  <SelectItem value="last_semester">Last Semester</SelectItem>
                  <SelectItem value="last_year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              
              {userRole !== 'student' && (
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="cse">Computer Science</SelectItem>
                    <SelectItem value="ece">Electronics</SelectItem>
                    <SelectItem value="mech">Mechanical</SelectItem>
                    <SelectItem value="civil">Civil</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-card/80 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="naac">NAAC</TabsTrigger>
          <TabsTrigger value="nirf">NIRF</TabsTrigger>
          <TabsTrigger value="aicte">AICTE</TabsTrigger>
          <TabsTrigger value="predictive">AI Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success mb-1">{accreditationData.naac.currentGrade}</div>
                <div className="text-sm text-muted-foreground">NAAC Grade</div>
                <div className="text-xs mt-1">Score: {accreditationData.naac.score}/4.0</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-student-primary mb-1">#{accreditationData.nirf.currentRank}</div>
                <div className="text-sm text-muted-foreground">NIRF Ranking</div>
                <div className="text-xs mt-1 text-success">↑ {accreditationData.nirf.currentRank - accreditationData.nirf.previousRank} from last year</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-warning mb-1">{accreditationData.aicte.complianceScore}%</div>
                <div className="text-sm text-muted-foreground">AICTE Compliance</div>
                <div className="text-xs mt-1">Status: {accreditationData.aicte.approvalStatus}</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{institutionalMetrics.institutionalImpact.totalVerifiedAchievements}</div>
                <div className="text-sm text-muted-foreground">Verified Records</div>
                <div className="text-xs mt-1">100% Blockchain Secured</div>
              </CardContent>
            </Card>
          </div>

          {/* Student Activity Insights */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-student-primary" />
                Student Activity Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Participation Overview</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Registered Students</span>
                      <span className="font-semibold">{institutionalMetrics.studentActivities.totalRegistered}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Participants</span>
                      <span className="font-semibold text-success">{institutionalMetrics.studentActivities.activeParticipants}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg Activities/Student</span>
                      <span className="font-semibold text-student-primary">{institutionalMetrics.studentActivities.averageActivitiesPerStudent}</span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Engagement Rate</span>
                        <span className="text-sm">{((institutionalMetrics.studentActivities.activeParticipants / institutionalMetrics.studentActivities.totalRegistered) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(institutionalMetrics.studentActivities.activeParticipants / institutionalMetrics.studentActivities.totalRegistered) * 100} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Top Activity Categories</h4>
                  <div className="space-y-3">
                    {institutionalMetrics.studentActivities.topCategories.map((category, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium">{category.name}</span>
                          <div className="text-xs text-success">+{category.growth}% growth</div>
                        </div>
                        <Badge variant="outline">{category.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Faculty Analytics */}
          {userRole !== 'student' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-faculty-primary" />
                  Faculty Engagement Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="text-center p-3 rounded-lg bg-faculty-primary/5">
                    <div className="text-xl font-bold text-faculty-primary">{institutionalMetrics.facultyEngagement.totalFaculty}</div>
                    <div className="text-sm text-muted-foreground">Total Faculty</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-success/5">
                    <div className="text-xl font-bold text-success">{institutionalMetrics.facultyEngagement.activeReviewers}</div>
                    <div className="text-sm text-muted-foreground">Active Reviewers</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-warning/5">
                    <div className="text-xl font-bold text-warning">{institutionalMetrics.facultyEngagement.averageReviewTime}</div>
                    <div className="text-sm text-muted-foreground">Avg Review Time</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-student-primary/5">
                    <div className="text-xl font-bold text-student-primary">{institutionalMetrics.facultyEngagement.approvalRate}%</div>
                    <div className="text-sm text-muted-foreground">Approval Rate</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-purple-500/5">
                    <div className="text-xl font-bold text-purple-600">{institutionalMetrics.facultyEngagement.monthlyApprovals}</div>
                    <div className="text-sm text-muted-foreground">Monthly Approvals</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* NAAC Tab */}
        <TabsContent value="naac" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-student-primary" />
                  NAAC Accreditation Status
                </CardTitle>
                <div className="flex space-x-2">
                  <Badge className="bg-success/10 text-success border-success/20">
                    Grade: {accreditationData.naac.currentGrade}
                  </Badge>
                  <Button variant="outline" onClick={() => handleExportReport('NAAC')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="font-medium mb-4">Criteria-wise Performance</h4>
                  <div className="space-y-4">
                    {accreditationData.naac.criteria.map((criterion, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{criterion.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold">{criterion.score}/{criterion.maxScore}</span>
                            <Badge variant="outline" className="text-xs">
                              {criterion.weightage}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={(criterion.score / criterion.maxScore) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Key Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Current Score</span>
                      <p className="font-semibold text-lg">{accreditationData.naac.score}/4.0</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Last Assessment</span>
                      <p className="font-medium">{accreditationData.naac.lastAssessment}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Valid Until</span>
                      <p className="font-medium">{accreditationData.naac.validUntil}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h5 className="font-medium mb-2">Recommendations</h5>
                    <ul className="space-y-1">
                      {accreditationData.naac.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <AlertTriangle className="h-3 w-3 mt-0.5 mr-2 text-warning" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NIRF Tab */}
        <TabsContent value="nirf" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-student-primary" />
                  NIRF Ranking Analysis
                </CardTitle>
                <div className="flex space-x-2">
                  <Badge className="bg-student-primary/10 text-student-primary border-student-primary/20">
                    Rank: #{accreditationData.nirf.currentRank}
                  </Badge>
                  <Button variant="outline" onClick={() => handleExportReport('NIRF')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Analysis
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="font-medium mb-4">Parameter-wise Scores</h4>
                  <div className="space-y-4">
                    {accreditationData.nirf.parameters.map((param, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{param.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold">{param.score}/{param.maxScore}</span>
                            <Badge variant="outline" className="text-xs">
                              {param.weightage}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={param.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Ranking Details</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Current Rank</span>
                      <p className="font-semibold text-lg">#{accreditationData.nirf.currentRank}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Previous Rank</span>
                      <p className="font-medium">#{accreditationData.nirf.previousRank}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Category</span>
                      <p className="font-medium">{accreditationData.nirf.category}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Overall Score</span>
                      <p className="font-medium">{accreditationData.nirf.score}/100</p>
                    </div>
                    <div className="pt-2">
                      <Badge className="bg-success/10 text-success border-success/20">
                        ↑ Improvement: {accreditationData.nirf.previousRank - accreditationData.nirf.currentRank} positions
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AICTE Tab */}
        <TabsContent value="aicte" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-student-primary" />
                  AICTE Compliance Dashboard
                </CardTitle>
                <div className="flex space-x-2">
                  <Badge className="bg-success/10 text-success border-success/20">
                    {accreditationData.aicte.approvalStatus}
                  </Badge>
                  <Button variant="outline" onClick={() => handleExportReport('AICTE')}>
                    <Download className="h-4 w-4 mr-2" />
                    Compliance Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Compliance Requirements</h4>
                  <div className="space-y-4">
                    {accreditationData.aicte.requirements.map((req, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                        <div>
                          <span className="font-medium">{req.name}</span>
                          <div className="text-sm text-muted-foreground">Score: {req.score}%</div>
                        </div>
                        <Badge className={
                          req.status === 'compliant' 
                            ? 'bg-success/10 text-success border-success/20'
                            : 'bg-warning/10 text-warning border-warning/20'
                        }>
                          {req.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Status Overview</h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="font-medium">Overall Compliance</span>
                      </div>
                      <div className="text-2xl font-bold text-success">{accreditationData.aicte.complianceScore}%</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg bg-student-primary/5">
                        <div className="text-lg font-bold text-student-primary">{accreditationData.aicte.intakeCapacity}</div>
                        <div className="text-sm text-muted-foreground">Intake Capacity</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-faculty-primary/5">
                        <div className="text-lg font-bold text-faculty-primary">{accreditationData.aicte.currentStrength}</div>
                        <div className="text-sm text-muted-foreground">Current Strength</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Critical Issues</span>
                        <span className="font-medium text-success">{accreditationData.aicte.criticalIssues}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pending Actions</span>
                        <span className="font-medium text-warning">{accreditationData.aicte.pendingActions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Inspection</span>
                        <span className="font-medium">{accreditationData.aicte.lastInspection}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Valid Until</span>
                        <span className="font-medium">{accreditationData.aicte.validUntil}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictive Analytics Tab */}
        <TabsContent value="predictive" className="space-y-6">
          <Card className="glass-card border-purple-500/20 glow-faculty">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                AI-Powered Predictive Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* NAAC Prediction */}
                <Card className="border border-student-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-student-primary" />
                      NAAC Score Prediction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-student-primary">
                        {predictiveAnalytics.naacPrediction.projectedScore}
                      </div>
                      <div className="text-sm text-muted-foreground">Projected Score</div>
                      <Badge variant="outline" className="mt-1">
                        {predictiveAnalytics.naacPrediction.confidenceLevel}% confidence
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-2">Key Recommendations:</p>
                      <ul className="space-y-1">
                        {predictiveAnalytics.naacPrediction.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start">
                            <Target className="h-3 w-3 mt-0.5 mr-1 text-student-primary" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* NIRF Prediction */}
                <Card className="border border-faculty-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-faculty-primary" />
                      NIRF Rank Prediction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-faculty-primary">
                        #{predictiveAnalytics.nirfPrediction.projectedRank}
                      </div>
                      <div className="text-sm text-muted-foreground">Projected Rank</div>
                      <Badge variant="outline" className="mt-1 bg-success/10 text-success border-success/20">
                        ↑ {predictiveAnalytics.nirfPrediction.improvement} positions
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-2">Key Factors:</p>
                      <ul className="space-y-1">
                        {predictiveAnalytics.nirfPrediction.keyFactors.map((factor, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start">
                            <CheckCircle className="h-3 w-3 mt-0.5 mr-1 text-faculty-primary" />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Student Engagement Prediction */}
                <Card className="border border-success/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center">
                      <Users className="h-4 w-4 mr-2 text-success" />
                      Engagement Forecast
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-success">
                        +{predictiveAnalytics.studentEngagement.projectedGrowth}%
                      </div>
                      <div className="text-sm text-muted-foreground">Projected Growth</div>
                      <Badge variant="outline" className="mt-1">
                        Next Quarter
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium mb-1">Risk Factors:</p>
                        <div className="flex flex-wrap gap-1">
                          {predictiveAnalytics.studentEngagement.riskFactors.map((risk, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-warning/10 text-warning border-warning/20">
                              {risk}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1">Opportunities:</p>
                        <div className="flex flex-wrap gap-1">
                          {predictiveAnalytics.studentEngagement.opportunities.map((opp, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                              {opp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                AI-Generated Strategic Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Short-term Actions (Next 3 months)</h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-student-primary/5 border border-student-primary/20">
                      <div className="flex items-start space-x-2">
                        <Target className="h-4 w-4 text-student-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Increase Student Activity Submissions</p>
                          <p className="text-xs text-muted-foreground">Target: 25% increase in monthly submissions</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-faculty-primary/5 border border-faculty-primary/20">
                      <div className="flex items-start space-x-2">
                        <Award className="h-4 w-4 text-faculty-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Faculty Training Program</p>
                          <p className="text-xs text-muted-foreground">Focus on digital approval workflows</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Industry Partnership Drive</p>
                          <p className="text-xs text-muted-foreground">Target: 5 new collaborations</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Long-term Strategy (Next 12 months)</h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                      <div className="flex items-start space-x-2">
                        <TrendingUp className="h-4 w-4 text-warning mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Research Output Enhancement</p>
                          <p className="text-xs text-muted-foreground">Target NIRF research parameter improvement</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                      <div className="flex items-start space-x-2">
                        <Sparkles className="h-4 w-4 text-purple-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">AI-Driven Student Support</p>
                          <p className="text-xs text-muted-foreground">Implement predictive student success models</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      <div className="flex items-start space-x-2">
                        <Globe className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">International Collaborations</p>
                          <p className="text-xs text-muted-foreground">Enhance global exposure programs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};