import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Award, 
  CheckCircle, 
  Clock, 
  Plus,
  Trophy,
  BookOpen,
  Users,
  Briefcase,
  Heart,
  Target,
  Download,
  Eye,
  Star,
  FileText,
  Calendar,
  MapPin,
  User
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ActivitySubmissionForm } from '@/components/forms/ActivitySubmissionForm';

export const StudentActivityTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Comprehensive activity categories aligned with Problem Statement 25093
  const activityCategories = [
    {
      id: 'conferences',
      name: 'Conferences & Workshops',
      icon: BookOpen,
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      description: 'Academic conferences, seminars, and professional workshops'
    },
    {
      id: 'certifications',
      name: 'Certifications',
      icon: Award,
      color: 'bg-student-primary/10 text-student-primary border-student-primary/20',
      description: 'Professional certifications and skill validations'
    },
    {
      id: 'club_activities',
      name: 'Club Activities & Volunteering',
      icon: Users,
      color: 'bg-green-500/10 text-green-600 border-green-500/20',
      description: 'Student clubs, societies, and volunteer work'
    },
    {
      id: 'competitions',
      name: 'Competitions & Contests',
      icon: Trophy,
      color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      description: 'Academic contests, hackathons, and competitions'
    },
    {
      id: 'internships',
      name: 'Internships & Leadership',
      icon: Briefcase,
      color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      description: 'Professional internships and leadership roles'
    },
    {
      id: 'community_service',
      name: 'Community Service',
      icon: Heart,
      color: 'bg-red-500/10 text-red-600 border-red-500/20',
      description: 'Community outreach and social impact activities'
    }
  ];

  // Enhanced mock data with comprehensive activity tracking
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'International AI Conference 2024',
      category: 'conferences',
      type: 'Conference Participation',
      date: '2024-01-15',
      location: 'MIT, Boston',
      duration: '3 days',
      status: 'approved',
      points: 80,
      description: 'Presented research paper on Machine Learning applications in healthcare',
      skills: ['AI/ML', 'Research', 'Public Speaking'],
      verificationDoc: 'ai-conference-certificate.pdf',
      facultyFeedback: 'Excellent presentation and research quality. Outstanding contribution to the academic community.',
      blockchainHash: '0xabc123...'
    },
    {
      id: 2,
      title: 'AWS Cloud Practitioner Certification',
      category: 'certifications',
      type: 'Professional Certification',
      date: '2024-01-10',
      issuer: 'Amazon Web Services',
      score: '890/1000',
      status: 'approved',
      points: 60,
      description: 'Achieved AWS Cloud Practitioner certification with distinction',
      skills: ['Cloud Computing', 'AWS', 'Infrastructure'],
      verificationDoc: 'aws-certificate.pdf',
      facultyFeedback: 'Valuable industry certification that enhances your cloud computing expertise.',
      blockchainHash: '0xdef456...'
    },
    {
      id: 3,
      title: 'National Coding Championship',
      category: 'competitions',
      type: 'Programming Contest',
      date: '2024-01-05',
      rank: '12th Nationally',
      participants: '2,500+ students',
      status: 'approved',
      points: 100,
      description: 'Secured 12th rank nationally in competitive programming contest',
      skills: ['Algorithms', 'Data Structures', 'Problem Solving'],
      verificationDoc: 'coding-championship-certificate.pdf',
      facultyFeedback: 'Outstanding performance in competitive programming. Keep up the excellent work!',
      blockchainHash: '0xghi789...'
    },
    {
      id: 4,
      title: 'Tech Startup Summer Internship',
      category: 'internships',
      type: 'Industry Internship',
      date: '2023-12-31',
      company: 'InnovateTech Solutions',
      duration: '3 months',
      role: 'Full Stack Developer Intern',
      status: 'approved',
      points: 120,
      description: 'Developed end-to-end web applications using modern tech stack',
      skills: ['React', 'Node.js', 'MongoDB', 'Docker'],
      verificationDoc: 'internship-completion-letter.pdf',
      facultyFeedback: 'Comprehensive internship experience with significant real-world project contributions.',
      blockchainHash: '0xjkl012...'
    },
    {
      id: 5,
      title: 'Digital Literacy Program Volunteer',
      category: 'community_service',
      type: 'Community Outreach',
      date: '2023-12-15',
      organization: 'Education for All NGO',
      hours: '40 hours',
      status: 'pending',
      points: 0,
      description: 'Taught basic computer skills to underprivileged children',
      skills: ['Teaching', 'Communication', 'Social Impact'],
      verificationDoc: 'volunteer-certificate.pdf',
      facultyFeedback: null,
      blockchainHash: null
    },
    {
      id: 6,
      title: 'Student Council President',
      category: 'club_activities',
      type: 'Leadership Role',
      date: '2023-11-01',
      duration: '1 year',
      status: 'approved',
      points: 90,
      description: 'Led student council initiatives and organized campus events',
      skills: ['Leadership', 'Event Management', 'Team Coordination'],
      verificationDoc: 'student-council-appointment.pdf',
      facultyFeedback: 'Exceptional leadership skills demonstrated through successful student council initiatives.',
      blockchainHash: '0xmno345...'
    }
  ]);

  const getCategoryIcon = (category: string) => {
    const categoryObj = activityCategories.find(cat => cat.id === category);
    return categoryObj ? categoryObj.icon : FileText;
  };

  const getCategoryColor = (category: string) => {
    const categoryObj = activityCategories.find(cat => cat.id === category);
    return categoryObj?.color || 'bg-muted/10 text-muted-foreground border-muted/20';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'rejected':
        return <Clock className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  const handleNewSubmission = (category: string) => {
    setSelectedCategory(category);
    setShowSubmissionForm(true);
  };

  const handleSubmissionSubmit = (submission: any) => {
    const newActivity = {
      ...submission,
      id: activities.length + 1,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      points: 0,
      facultyFeedback: null,
      blockchainHash: null
    };
    setActivities(prev => [newActivity, ...prev]);
    setShowSubmissionForm(false);
    setSelectedCategory(null);
    
    toast({
      title: "Activity Submitted",
      description: "Your activity has been submitted for faculty review.",
    });
  };

  // Calculate statistics
  const stats = {
    totalPoints: activities.filter(a => a.status === 'approved').reduce((sum, a) => sum + a.points, 0),
    totalActivities: activities.length,
    approvedActivities: activities.filter(a => a.status === 'approved').length,
    pendingActivities: activities.filter(a => a.status === 'pending').length,
    categoriesParticipated: new Set(activities.map(a => a.category)).size
  };

  const categoryStats = activityCategories.map(category => ({
    ...category,
    count: activities.filter(a => a.category === category.id).length,
    points: activities.filter(a => a.category === category.id && a.status === 'approved')
                    .reduce((sum, a) => sum + a.points, 0)
  }));

  if (showSubmissionForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-student-secondary/5 to-student-primary/5 p-4">
        <ActivitySubmissionForm 
          onClose={() => {
            setShowSubmissionForm(false);
            setSelectedCategory(null);
          }}
          onSubmit={handleSubmissionSubmit}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card/80 backdrop-blur-sm">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="activities">My Activities</TabsTrigger>
          <TabsTrigger value="submit">Submit Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Overview Stats */}
          <Card className="glass-card border-student-primary/20 glow-student">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-student-primary" />
                Activity Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center p-4 rounded-lg bg-student-primary/5">
                  <p className="text-2xl font-bold text-student-primary">{stats.totalPoints}</p>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-success/5">
                  <p className="text-2xl font-bold text-success">{stats.approvedActivities}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-warning/5">
                  <p className="text-2xl font-bold text-warning">{stats.pendingActivities}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-student-accent/5">
                  <p className="text-2xl font-bold text-student-accent">{stats.totalActivities}</p>
                  <p className="text-sm text-muted-foreground">Total Activities</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-500/5">
                  <p className="text-2xl font-bold text-purple-600">{stats.categoriesParticipated}</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Overview */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Activity Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryStats.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Card key={category.id} className="border border-muted/30 hover:border-student-primary/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 rounded-lg bg-student-primary/10">
                            <Icon className="h-5 w-5 text-student-primary" />
                          </div>
                          <Badge className={category.color}>
                            {category.count} activities
                          </Badge>
                        </div>
                        <h4 className="font-semibold mb-1">{category.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-student-primary">
                            {category.points} points
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleNewSubmission(category.id)}
                            className="h-7"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.slice(0, 3).map((activity) => {
                  const Icon = getCategoryIcon(activity.category);
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                      <div className="p-2 rounded-lg bg-student-primary/10 mt-1">
                        <Icon className="h-4 w-4 text-student-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getStatusIcon(activity.status)}
                          <h5 className="font-medium">{activity.title}</h5>
                          <Badge className={getCategoryColor(activity.category)} variant="outline">
                            {activity.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>{activity.date}</span>
                          {activity.status === 'approved' && (
                            <span className="text-student-primary font-medium">+{activity.points} points</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">All Activities</h3>
            <Button onClick={() => setShowSubmissionForm(true)} className="gradient-student">
              <Plus className="h-4 w-4 mr-2" />
              Add New Activity
            </Button>
          </div>

          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = getCategoryIcon(activity.category);
              return (
                <Card key={activity.id} className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="p-2 rounded-lg bg-student-primary/10">
                            <Icon className="h-5 w-5 text-student-primary" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              {getStatusIcon(activity.status)}
                              <h4 className="font-semibold">{activity.title}</h4>
                              <Badge className={getCategoryColor(activity.category)}>
                                {activity.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{activity.date}</span>
                          </div>
                          {activity.location && (
                            <div className="flex items-center space-x-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{activity.location}</span>
                            </div>
                          )}
                          {activity.company && (
                            <div className="flex items-center space-x-2 text-sm">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{activity.company}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {activity.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        {activity.facultyFeedback && (
                          <div className="bg-muted/30 p-3 rounded-lg mb-3">
                            <p className="text-sm font-medium mb-1">Faculty Feedback</p>
                            <p className="text-sm text-muted-foreground">{activity.facultyFeedback}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end space-y-2 ml-4">
                        <Badge 
                          className={
                            activity.status === 'approved' ? 'bg-success/10 text-success border-success/20' :
                            activity.status === 'rejected' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                            'bg-warning/10 text-warning border-warning/20'
                          }
                        >
                          {activity.status.toUpperCase()}
                        </Badge>
                        {activity.status === 'approved' && (
                          <span className="text-sm font-medium text-student-primary">
                            <Star className="h-3 w-3 inline mr-1" />
                            {activity.points} points
                          </span>
                        )}
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Submit Activity Tab */}
        <TabsContent value="submit" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Submit New Activity</CardTitle>
              <p className="text-muted-foreground">
                Choose a category to submit your activity for faculty verification
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activityCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Card 
                      key={category.id} 
                      className="border border-muted/30 hover:border-student-primary/50 transition-all cursor-pointer hover:shadow-lg"
                      onClick={() => handleNewSubmission(category.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="p-3 rounded-lg bg-student-primary/10 inline-block mb-3">
                          <Icon className="h-8 w-8 text-student-primary" />
                        </div>
                        <h4 className="font-semibold mb-2">{category.name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                        <Button className="w-full gradient-student">
                          <Plus className="h-4 w-4 mr-2" />
                          Submit {category.name}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Activity Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Points Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Points Progress</span>
                    <span className="text-sm text-muted-foreground">{stats.totalPoints}/500 points</span>
                  </div>
                  <Progress value={(stats.totalPoints / 500) * 100} className="h-2" />
                </div>

                {/* Category Breakdown */}
                <div>
                  <h4 className="font-medium mb-3">Points by Category</h4>
                  <div className="space-y-3">
                    {categoryStats.map((category) => {
                      const Icon = category.icon;
                      const percentage = stats.totalPoints > 0 ? (category.points / stats.totalPoints) * 100 : 0;
                      
                      return (
                        <div key={category.id} className="flex items-center space-x-3">
                          <Icon className="h-4 w-4 text-student-primary" />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">{category.name}</span>
                              <span className="text-sm text-muted-foreground">
                                {category.points} points ({category.count} activities)
                              </span>
                            </div>
                            <Progress value={percentage} className="h-1" />
                          </div>
                        </div>
                      );
                    })}
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