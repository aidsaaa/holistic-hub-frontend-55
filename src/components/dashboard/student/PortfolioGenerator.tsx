import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Shield, 
  Download, 
  Share, 
  Eye, 
  Award, 
  CheckCircle,
  ExternalLink,
  Copy,
  FileText,
  Star,
  Settings,
  Palette,
  Layout,
  Globe,
  QrCode,
  Sparkles
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const PortfolioGenerator = () => {
  const [viewMode, setViewMode] = useState<'student' | 'recruiter' | 'public'>('student');
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customization, setCustomization] = useState({
    showBlockchainVerification: true,
    showDetailedScores: true,
    showSkillBreakdown: true,
    includeRecommendations: true,
    theme: 'modern',
    primaryColor: 'blue'
  });

  // Enhanced portfolio data with comprehensive tracking
  const portfolioData = {
    profile: {
      name: 'Alex Johnson',
      program: 'Computer Science Engineering',
      year: '3rd Year',
      semester: '6th Semester',
      gpa: 3.7,
      university: 'Tech University',
      department: 'Computer Science',
      rollNumber: 'CS21001',
      email: 'alex.johnson@university.edu',
      phone: '+1 (555) 123-4567',
      linkedIn: 'linkedin.com/in/alexjohnson',
      github: 'github.com/alexjohnson',
      blockchainId: '0x1234...5678',
      portfolioUrl: 'https://portfolio.smartstudent.edu/alex-johnson',
      lastUpdated: '2024-01-20'
    },
    summary: {
      totalActivities: 45,
      verifiedAchievements: 38,
      totalPoints: 2847,
      skillCategories: 12,
      competencyScore: 87,
      careerReadinessScore: 92,
      industryRanking: 'Top 5%'
    },
    achievements: [
      {
        id: 1,
        title: 'International AI Conference 2024',
        category: 'Conferences & Workshops',
        type: 'Conference Presentation',
        date: '2024-01-15',
        issuer: 'MIT AI Research Lab',
        location: 'Boston, MA',
        verified: true,
        blockchainHash: '0xabc123...',
        description: 'Presented research on "Deep Learning Applications in Healthcare Diagnostics"',
        skills: ['AI/ML', 'Research', 'Public Speaking', 'Healthcare Technology'],
        points: 120,
        impact: 'High',
        evidenceFiles: ['presentation.pdf', 'research-paper.pdf', 'conference-certificate.pdf']
      },
      {
        id: 2,
        title: 'AWS Solutions Architect Professional',
        category: 'Certifications',
        type: 'Professional Certification',
        date: '2024-01-10',
        issuer: 'Amazon Web Services',
        score: '890/1000',
        verified: true,
        blockchainHash: '0xdef456...',
        description: 'Advanced cloud architecture certification with expertise in scalable systems',
        skills: ['Cloud Computing', 'AWS', 'System Architecture', 'DevOps'],
        points: 100,
        impact: 'High',
        evidenceFiles: ['aws-certificate.pdf', 'score-report.pdf']
      },
      {
        id: 3,
        title: 'Google Summer of Code 2023',
        category: 'Internships & Leadership',
        type: 'Open Source Contribution',
        date: '2023-08-31',
        organization: 'Google / TensorFlow',
        duration: '3 months',
        verified: true,
        blockchainHash: '0xghi789...',
        description: 'Contributed to TensorFlow core library, implementing new optimization algorithms',
        skills: ['Python', 'TensorFlow', 'Machine Learning', 'Open Source'],
        points: 150,
        impact: 'Very High',
        evidenceFiles: ['gsoc-certificate.pdf', 'project-report.pdf', 'code-contributions.pdf']
      },
      {
        id: 4,
        title: 'ACM Programming Contest - Regional Winner',
        category: 'Competitions & Contests',
        type: 'Programming Competition',
        date: '2023-11-15',
        rank: '1st in Region',
        participants: '500+ teams',
        verified: true,
        blockchainHash: '0xjkl012...',
        description: 'Won regional ACM programming contest, advanced to world finals',
        skills: ['Algorithms', 'Data Structures', 'Competitive Programming', 'Problem Solving'],
        points: 200,
        impact: 'Very High',
        evidenceFiles: ['acm-certificate.pdf', 'contest-report.pdf']
      },
      {
        id: 5,
        title: 'Digital Literacy Initiative',
        category: 'Community Service',
        type: 'Social Impact Project',
        date: '2023-12-01',
        organization: 'Rural Education Foundation',
        hours: '80 hours',
        beneficiaries: '200+ students',
        verified: true,
        blockchainHash: '0xmno345...',
        description: 'Led team to teach programming and digital skills to rural students',
        skills: ['Teaching', 'Leadership', 'Community Engagement', 'Social Impact'],
        points: 90,
        impact: 'High',
        evidenceFiles: ['service-certificate.pdf', 'impact-report.pdf']
      }
    ],
    skills: {
      technical: [
        { name: 'Machine Learning', level: 90, verified: true },
        { name: 'Cloud Computing', level: 85, verified: true },
        { name: 'Full Stack Development', level: 88, verified: true },
        { name: 'Data Science', level: 82, verified: true },
        { name: 'DevOps', level: 75, verified: true }
      ],
      soft: [
        { name: 'Leadership', level: 92, verified: true },
        { name: 'Communication', level: 89, verified: true },
        { name: 'Problem Solving', level: 95, verified: true },
        { name: 'Team Collaboration', level: 87, verified: true },
        { name: 'Public Speaking', level: 83, verified: true }
      ]
    },
    recommendations: [
      {
        from: 'Dr. Sarah Chen',
        role: 'Professor, AI Research Lab',
        text: 'Alex demonstrates exceptional technical skills and research aptitude. Their work on healthcare AI has the potential for significant real-world impact.',
        date: '2024-01-16'
      },
      {
        from: 'Michael Rodriguez',
        role: 'Senior Engineer, Google',
        text: 'Outstanding contributor to our open source project. Alex showed remarkable technical depth and collaborative skills during GSoC.',
        date: '2023-09-05'
      }
    ]
  };

  const portfolioTemplates = [
    { id: 'professional', name: 'Professional', description: 'Clean, corporate-friendly design' },
    { id: 'academic', name: 'Academic', description: 'Research-focused layout' },
    { id: 'creative', name: 'Creative', description: 'Modern, visually appealing' },
    { id: 'minimal', name: 'Minimal', description: 'Simple, elegant design' }
  ];

  const handleGeneratePortfolio = async (format: 'pdf' | 'web') => {
    setIsGenerating(true);
    
    // Simulate portfolio generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (format === 'pdf') {
      toast({
        title: "Portfolio Generated",
        description: `${viewMode === 'student' ? 'Detailed' : 'Recruiter-optimized'} portfolio PDF ready for download.`,
      });
    } else {
      const portfolioUrl = `${portfolioData.profile.portfolioUrl}?template=${selectedTemplate}&theme=${customization.theme}`;
      navigator.clipboard.writeText(portfolioUrl);
      toast({
        title: "Portfolio Link Generated",
        description: "Shareable portfolio link copied to clipboard!",
      });
    }
    
    setIsGenerating(false);
  };

  const handleSharePortfolio = () => {
    const shareUrl = portfolioData.profile.portfolioUrl;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Portfolio Link Copied",
      description: "Shareable portfolio link copied to clipboard!",
    });
  };

  const generateQRCode = () => {
    toast({
      title: "QR Code Generated",
      description: "QR code for portfolio access has been generated.",
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Certifications': return <Award className="h-4 w-4" />;
      case 'Competitions & Contests': return <Star className="h-4 w-4" />;
      case 'Conferences & Workshops': return <FileText className="h-4 w-4" />;
      case 'Internships & Leadership': return <CheckCircle className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Header & Controls */}
      <Card className="glass-card border-student-primary/20 glow-student">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Sparkles className="h-6 w-6 mr-2 text-student-primary" />
                AI-Powered Portfolio Generator
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Create blockchain-verified, industry-ready portfolios automatically
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm">Student</span>
                <Switch 
                  checked={viewMode === 'recruiter'} 
                  onCheckedChange={(checked) => setViewMode(checked ? 'recruiter' : 'student')}
                />
                <span className="text-sm">Recruiter</span>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleSharePortfolio}>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" onClick={generateQRCode}>
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Code
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Portfolio Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-student-primary/5">
              <p className="text-2xl font-bold text-student-primary">{portfolioData.summary.totalPoints}</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-success/5">
              <p className="text-2xl font-bold text-success">{portfolioData.summary.verifiedAchievements}</p>
              <p className="text-sm text-muted-foreground">Verified Items</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-warning/5">
              <p className="text-2xl font-bold text-warning">{portfolioData.summary.skillCategories}</p>
              <p className="text-sm text-muted-foreground">Skill Areas</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-500/5">
              <p className="text-2xl font-bold text-purple-600">{portfolioData.summary.competencyScore}%</p>
              <p className="text-sm text-muted-foreground">Competency</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-500/5">
              <p className="text-2xl font-bold text-blue-600">{portfolioData.summary.careerReadinessScore}%</p>
              <p className="text-sm text-muted-foreground">Career Ready</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-student-accent/5">
              <p className="text-lg font-bold text-student-accent">{portfolioData.summary.industryRanking}</p>
              <p className="text-sm text-muted-foreground">Industry Rank</p>
            </div>
          </div>

          {/* Template & Customization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Portfolio Template</h4>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {portfolioTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-muted-foreground">{template.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h4 className="font-medium mb-3">Generation Options</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Blockchain Verification</span>
                  <Switch 
                    checked={customization.showBlockchainVerification}
                    onCheckedChange={(checked) => setCustomization(prev => ({...prev, showBlockchainVerification: checked}))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Detailed Scores</span>
                  <Switch 
                    checked={customization.showDetailedScores}
                    onCheckedChange={(checked) => setCustomization(prev => ({...prev, showDetailedScores: checked}))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Skill Breakdown</span>
                  <Switch 
                    checked={customization.showSkillBreakdown}
                    onCheckedChange={(checked) => setCustomization(prev => ({...prev, showSkillBreakdown: checked}))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Generation Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button 
              onClick={() => handleGeneratePortfolio('pdf')} 
              className="gradient-student flex-1"
              disabled={isGenerating}
            >
              <Download className="h-4 w-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate PDF Portfolio'}
            </Button>
            <Button 
              onClick={() => handleGeneratePortfolio('web')} 
              variant="outline"
              className="flex-1"
              disabled={isGenerating}
            >
              <Globe className="h-4 w-4 mr-2" />
              Create Web Portfolio
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-student-primary" />
            Portfolio Content Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Student Name</label>
                <p className="font-semibold">{portfolioData.profile.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Program</label>
                <p className="font-semibold">{portfolioData.profile.program}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Academic Year</label>
                <p className="font-semibold">{portfolioData.profile.year} • {portfolioData.profile.semester}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">University</label>
                <p className="font-semibold">{portfolioData.profile.university}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Current GPA</label>
                <p className="font-semibold text-student-primary">{portfolioData.profile.gpa}/4.0</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Portfolio URL</label>
                <div className="flex items-center space-x-2">
                  <p className="font-mono text-sm truncate">{portfolioData.profile.portfolioUrl}</p>
                  <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(portfolioData.profile.portfolioUrl)}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              {viewMode === 'student' && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Blockchain ID</label>
                  <div className="flex items-center space-x-2">
                    <p className="font-mono text-sm">{portfolioData.profile.blockchainId}</p>
                    <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(portfolioData.profile.blockchainId)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                <p className="font-semibold">{portfolioData.profile.lastUpdated}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Achievements Preview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-student-primary" />
            Featured Achievements ({portfolioData.achievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {portfolioData.achievements.slice(0, 4).map((achievement) => (
              <Card key={achievement.id} className="border border-muted/30 hover:border-student-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Achievement Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getCategoryIcon(achievement.category)}
                          <h4 className="font-semibold text-sm">{achievement.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {achievement.issuer} • {achievement.date}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className="text-xs bg-student-primary/10 text-student-primary border-student-primary/20">
                          {achievement.impact} Impact
                        </Badge>
                        {achievement.verified && (
                          <div className="flex items-center text-success">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            <span className="text-xs">Verified ✅</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-foreground">{achievement.description}</p>

                    {/* Skills - Limited for preview */}
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {achievement.skills.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {achievement.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{achievement.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Points & Blockchain Info */}
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-xs font-medium text-student-primary">
                        {achievement.points} points
                      </span>
                      {viewMode === 'student' && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Shield className="h-3 w-3 mr-1" />
                          <code className="bg-muted/50 px-1 rounded text-xs">
                            {achievement.blockchainHash}
                          </code>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-student-primary" />
            AI-Generated Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioData.recommendations.map((rec, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-muted/20 border border-muted/30">
                <p className="text-sm mb-2">"{rec.text}"</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span><strong>{rec.from}</strong> - {rec.role}</span>
                  <span>{rec.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Actions */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h3 className="font-semibold mb-1">Ready to Share Your Success?</h3>
              <p className="text-sm text-muted-foreground">
                Generate professional portfolios optimized for different audiences and purposes
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Live Preview
              </Button>
              <Button onClick={handleSharePortfolio}>
                <Share className="h-4 w-4 mr-2" />
                Share Portfolio
              </Button>
              <Button onClick={() => handleGeneratePortfolio('pdf')} className="gradient-student">
                <Download className="h-4 w-4 mr-2" />
                Export Portfolio
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};