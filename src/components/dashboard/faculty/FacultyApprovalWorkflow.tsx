import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileCheck, 
  CheckCircle, 
  XCircle, 
  MessageCircle,
  Clock,
  User,
  Award,
  AlertTriangle,
  Bot,
  Copy,
  Star,
  FileText,
  Shield,
  Hash,
  Calendar,
  MapPin,
  Eye,
  Download,
  PenTool,
  Zap,
  TrendingUp,
  Briefcase,
  Heart,
  Users
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const FacultyApprovalWorkflow = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [marks, setMarks] = useState<{ [key: number]: string }>({});
  const [activeTab, setActiveTab] = useState('pending');
  const [digitalSignature, setDigitalSignature] = useState('');

  const [submissions, setSubmissions] = useState<any[]>([
    {
      id: 1,
      student: {
        name: 'John Doe',
        roll: 'CS001',
        email: 'john.doe@university.edu',
        program: 'Computer Science',
        year: '3rd Year'
      },
      activity: {
        title: 'International AI Conference 2024',
        category: 'conferences',
        type: 'Conference Presentation',
        description: 'Presented research paper on "Deep Learning Applications in Healthcare Diagnostics" at the International AI Conference.',
        date: '2024-01-15',
        location: 'MIT, Boston',
        duration: '3 days',
        organization: 'MIT AI Research Lab',
        skills: ['AI/ML', 'Research', 'Public Speaking', 'Healthcare Technology']
      },
      submission: {
        submittedAt: '2 hours ago',
        files: ['presentation-slides.pdf', 'research-paper.pdf', 'conference-certificate.pdf', 'attendance-proof.jpg'],
        maxMarks: 120,
        suggestedPoints: 100,
        status: 'pending'
      },
      verification: {
        plagiarismRisk: 15,
        aiContentRisk: 8,
        documentAuthenticity: 95,
        crossReference: 'Verified with conference organizers'
      },
      metadata: {
        submissionId: 'SUB-2024-001',
        blockchainPending: true
      }
    },
    {
      id: 2,
      student: {
        name: 'Sarah Wilson',
        roll: 'CS002',
        email: 'sarah.wilson@university.edu',
        program: 'Computer Science',
        year: '2nd Year'
      },
      activity: {
        title: 'Google Summer of Code 2023',
        category: 'internships',
        type: 'Open Source Contribution',
        description: 'Contributed to TensorFlow core library, implementing new optimization algorithms for neural network training.',
        date: '2023-08-31',
        organization: 'Google / TensorFlow',
        duration: '3 months',
        skills: ['Python', 'TensorFlow', 'Machine Learning', 'Open Source Development']
      },
      submission: {
        submittedAt: '5 hours ago',
        files: ['gsoc-certificate.pdf', 'project-report.pdf', 'code-contributions.zip', 'mentor-feedback.pdf'],
        maxMarks: 150,
        suggestedPoints: 140,
        status: 'pending'
      },
      verification: {
        plagiarismRisk: 5,
        aiContentRisk: 12,
        documentAuthenticity: 98,
        crossReference: 'Verified with Google GSoC database'
      },
      metadata: {
        submissionId: 'SUB-2024-002',
        blockchainPending: true
      }
    },
    {
      id: 3,
      student: {
        name: 'Mike Johnson',
        roll: 'CS003',
        email: 'mike.johnson@university.edu',
        program: 'Computer Science',
        year: '4th Year'
      },
      activity: {
        title: 'ACM Programming Contest - Regional Winner',
        category: 'competitions',
        type: 'Programming Competition',
        description: 'Won 1st place in ACM regional programming contest, advanced to world finals.',
        date: '2023-11-15',
        rank: '1st in Region',
        participants: '500+ teams',
        skills: ['Algorithms', 'Data Structures', 'Competitive Programming', 'Problem Solving']
      },
      submission: {
        submittedAt: '1 day ago',
        files: ['acm-certificate.pdf', 'contest-report.pdf', 'ranking-screenshot.jpg'],
        maxMarks: 100,
        suggestedPoints: 95,
        status: 'pending'
      },
      verification: {
        plagiarismRisk: 2,
        aiContentRisk: 5,
        documentAuthenticity: 99,
        crossReference: 'Verified with ACM official records'
      },
      metadata: {
        submissionId: 'SUB-2024-003',
        blockchainPending: true
      }
    }
  ]);

  // Approved submissions for audit trail
  const [approvedSubmissions] = useState([
    {
      id: 101,
      student: { name: 'Emma Davis', roll: 'CS004' },
      activity: { title: 'AWS Solutions Architect Certification', category: 'certifications' },
      approval: {
        approvedBy: 'Dr. Smith',
        approvedAt: '2024-01-18',
        marks: 85,
        maxMarks: 100,
        feedback: 'Excellent industry certification. Great preparation for cloud computing career.',
        digitalSignature: 'DS-2024-101',
        blockchainHash: '0xabc123def456...'
      }
    }
  ]);

  const handleApproval = async (submissionId: number, action: 'approve' | 'reject') => {
    const submission = submissions.find(s => s.id === submissionId);
    const submissionMarks = marks[submissionId];
    
    if (action === 'approve') {
      if (!submissionMarks || isNaN(Number(submissionMarks))) {
        toast({
          title: "Marks Required",
          description: "Please assign marks before approving the submission.",
          variant: "destructive"
        });
        return;
      }
      
      if (!feedback.trim()) {
        toast({
          title: "Feedback Required",
          description: "Please provide feedback before approving the submission.",
          variant: "destructive"
        });
        return;
      }
    }

    // Simulate blockchain verification process
    toast({
      title: "Processing Approval",
      description: "Creating blockchain verification record...",
    });

    // Simulate digital signature and blockchain recording
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate digital signature and blockchain hash
    const digitalSig = `DS-${new Date().getFullYear()}-${String(submissionId).padStart(3, '0')}`;
    const blockchainHash = `0x${Math.random().toString(16).substr(2, 12)}...`;
    
    // Update submission status
    setSubmissions(prev => prev.map(s => 
      s.id === submissionId 
        ? { 
            ...s, 
            submission: {
              ...s.submission,
              status: action === 'approve' ? 'approved' : 'rejected',
            },
            approval: action === 'approve' ? {
              marks: Number(submissionMarks),
              feedback: feedback,
              digitalSignature: digitalSig,
              blockchainHash: blockchainHash,
              approvedBy: 'Dr. Faculty Member',
              approvedAt: new Date().toISOString().split('T')[0],
              timestamp: new Date().toISOString()
            } : {
              feedback: feedback,
              rejectedBy: 'Dr. Faculty Member',
              rejectedAt: new Date().toISOString().split('T')[0],
              reason: feedback
            }
          }
        : s
    ));
    
    toast({
      title: `Submission ${action}d Successfully`,
      description: `${submission?.student.name}'s submission has been ${action}d${action === 'approve' ? ` with ${submissionMarks} marks` : ''}. ${action === 'approve' ? 'Blockchain verification completed.' : ''}`,
    });
    
    setSelectedSubmission(null);
    setFeedback('');
    setMarks(prev => ({ ...prev, [submissionId]: '' }));
  };

  const handleDigitalSignature = () => {
    const signature = `DS-${Date.now()}`;
    setDigitalSignature(signature);
    toast({
      title: "Digital Signature Applied",
      description: `Signature ${signature} has been applied to the approval.`,
    });
  };

  const getVerificationStatus = (submission: any) => {
    const { plagiarismRisk, aiContentRisk, documentAuthenticity } = submission.verification;
    
    if (plagiarismRisk > 80 || aiContentRisk > 80) {
      return { status: 'high-risk', color: 'destructive', message: 'High Risk - Manual Review Required' };
    } else if (plagiarismRisk > 40 || aiContentRisk > 40) {
      return { status: 'medium-risk', color: 'warning', message: 'Medium Risk - Additional Verification' };
    } else if (documentAuthenticity > 90) {
      return { status: 'verified', color: 'success', message: 'Verified - Documents Authentic' };
    } else {
      return { status: 'pending', color: 'default', message: 'Verification Pending' };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'conferences': return Award;
      case 'certifications': return FileCheck;
      case 'competitions': return Star;
      case 'internships': return Briefcase;
      case 'community_service': return Heart;
      case 'club_activities': return Users;
      default: return FileText;
    }
  };

  const pendingSubmissions = submissions.filter(s => s.submission.status === 'pending');
  const processedSubmissions = submissions.filter(s => s.submission.status !== 'pending');

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <Card className="glass-card border-faculty-primary/20 glow-faculty">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-faculty-primary" />
              Faculty Approval & Verification Workflow
            </div>
            <div className="flex space-x-2">
              <Badge className="bg-warning/10 text-warning border-warning/20">
                {pendingSubmissions.length} Pending
              </Badge>
              <Badge className="bg-success/10 text-success border-success/20">
                {processedSubmissions.length} Processed
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-faculty-primary/5">
              <p className="text-2xl font-bold text-faculty-primary">{pendingSubmissions.length}</p>
              <p className="text-sm text-muted-foreground">Pending Reviews</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-success/5">
              <p className="text-2xl font-bold text-success">{processedSubmissions.filter(s => s.submission.status === 'approved').length}</p>
              <p className="text-sm text-muted-foreground">Approved Today</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-warning/5">
              <p className="text-2xl font-bold text-warning">{submissions.filter(s => s.verification.plagiarismRisk > 40).length}</p>
              <p className="text-sm text-muted-foreground">Need Verification</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-500/5">
              <p className="text-2xl font-bold text-blue-600">{approvedSubmissions.length + processedSubmissions.filter(s => s.submission.status === 'approved').length}</p>
              <p className="text-sm text-muted-foreground">Blockchain Verified</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Approval Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card/80 backdrop-blur-sm">
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="processed">Processed</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        {/* Pending Approvals Tab */}
        <TabsContent value="pending" className="space-y-4">
          {pendingSubmissions.map((submission) => {
            const verificationStatus = getVerificationStatus(submission);
            const Icon = getCategoryIcon(submission.activity.category);
            
            return (
              <Card key={submission.id} className="glass-card">
                <CardContent className="p-0">
                  {/* Security Warnings */}
                  {(submission.verification.plagiarismRisk > 40 || submission.verification.aiContentRisk > 40) && (
                    <div className="p-4 bg-warning/5 border-b border-warning/20">
                      <div className="space-y-2">
                        {submission.verification.plagiarismRisk > 40 && (
                          <Alert className="border-warning/30 bg-warning/10">
                            <Copy className="h-4 w-4" />
                            <AlertDescription className="text-warning-foreground">
                              ⚠️ Plagiarism Risk: {submission.verification.plagiarismRisk}% similarity detected
                            </AlertDescription>
                          </Alert>
                        )}
                        {submission.verification.aiContentRisk > 40 && (
                          <Alert className="border-destructive/30 bg-destructive/10">
                            <Bot className="h-4 w-4" />
                            <AlertDescription className="text-destructive-foreground">
                              ⚠️ AI Content Risk: {submission.verification.aiContentRisk}% confidence
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4">
                    {/* Submission Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-lg bg-faculty-primary/10">
                          <Icon className="h-6 w-6 text-faculty-primary" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-lg">{submission.activity.title}</h4>
                            <Badge className="bg-faculty-primary/10 text-faculty-primary border-faculty-primary/20">
                              {submission.activity.type}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                <strong>Student:</strong> {submission.student.name} ({submission.student.roll})
                              </p>
                              <p className="text-sm text-muted-foreground mb-1">
                                <strong>Program:</strong> {submission.student.program} • {submission.student.year}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                <strong>Submitted:</strong> {submission.submission.submittedAt}
                              </p>
                            </div>
                            <div>
                              {submission.activity.location && (
                                <p className="text-sm text-muted-foreground mb-1">
                                  <MapPin className="h-3 w-3 inline mr-1" />
                                  {submission.activity.location}
                                </p>
                              )}
                              {submission.activity.organization && (
                                <p className="text-sm text-muted-foreground mb-1">
                                  <strong>Organization:</strong> {submission.activity.organization}
                                </p>
                              )}
                              <p className="text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3 inline mr-1" />
                                {submission.activity.date}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-foreground mb-3">{submission.activity.description}</p>
                          
                          {/* Skills */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {submission.activity.skills.map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          {/* Files */}
                          <div>
                            <p className="text-sm font-medium mb-2">Submitted Files:</p>
                            <div className="flex flex-wrap gap-2">
                              {submission.submission.files.map((file, index) => (
                                <div key={index} className="flex items-center space-x-1 px-2 py-1 bg-background rounded text-xs border">
                                  <FileText className="h-3 w-3" />
                                  <span>{file}</span>
                                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1">
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Verification Status */}
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={`bg-${verificationStatus.color}/10 text-${verificationStatus.color} border-${verificationStatus.color}/20`}>
                          {verificationStatus.message}
                        </Badge>
                        <div className="text-right text-xs text-muted-foreground">
                          <p>Document Auth: {submission.verification.documentAuthenticity}%</p>
                          <p>Submission ID: {submission.metadata.submissionId}</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="font-medium">Max Points: {submission.submission.maxMarks}</span>
                        <span className="text-faculty-primary">Suggested: {submission.submission.suggestedPoints}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-destructive/10 border-destructive/20 hover:bg-destructive/20 text-destructive"
                          onClick={() => handleApproval(submission.id, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Quick Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedSubmission(
                            selectedSubmission === submission.id ? null : submission.id
                          )}
                        >
                          <PenTool className="h-4 w-4 mr-1" />
                          Review & Grade
                        </Button>
                        <Button
                          size="sm"
                          className="gradient-faculty"
                          onClick={() => {
                            setMarks(prev => ({ ...prev, [submission.id]: submission.submission.suggestedPoints.toString() }));
                            setSelectedSubmission(submission.id);
                          }}
                        >
                          <Zap className="h-4 w-4 mr-1" />
                          Quick Approve
                        </Button>
                      </div>
                    </div>
                    
                    {/* Detailed Review Section */}
                    {selectedSubmission === submission.id && (
                      <div className="mt-4 p-4 border-t border-border bg-muted/10 animate-accordion-down">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 mb-4">
                            <Shield className="h-4 w-4 text-faculty-primary" />
                            <h5 className="font-medium">Detailed Review & Blockchain Verification</h5>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Marks & Grading */}
                            <div className="space-y-3">
                              <div>
                                <Label htmlFor={`marks-${submission.id}`}>
                                  Assign Points (Max: {submission.submission.maxMarks})
                                </Label>
                                <Input
                                  id={`marks-${submission.id}`}
                                  type="number"
                                  min="0"
                                  max={submission.submission.maxMarks}
                                  placeholder={`0 - ${submission.submission.maxMarks}`}
                                  value={marks[submission.id] || ''}
                                  onChange={(e) => setMarks(prev => ({ ...prev, [submission.id]: e.target.value }))}
                                  className="focus-ring"
                                />
                              </div>
                              
                              {/* Grade Preview */}
                              <div className="p-3 bg-faculty-primary/5 rounded-lg border">
                                {marks[submission.id] && !isNaN(Number(marks[submission.id])) ? (
                                  <div className="text-center">
                                    <span className="text-2xl font-bold text-faculty-primary">
                                      {((Number(marks[submission.id]) / submission.submission.maxMarks) * 100).toFixed(1)}%
                                    </span>
                                    <p className="text-sm text-muted-foreground">
                                      {marks[submission.id]}/{submission.submission.maxMarks} points
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground text-center">
                                    Enter points to see grade
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Digital Signature */}
                            <div className="space-y-3">
                              <div>
                                <Label>Digital Signature</Label>
                                <div className="flex space-x-2">
                                  <Input
                                    value={digitalSignature}
                                    placeholder="Click to generate signature"
                                    readOnly
                                    className="focus-ring"
                                  />
                                  <Button variant="outline" onClick={handleDigitalSignature}>
                                    <Hash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Blockchain Info */}
                              <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Shield className="h-4 w-4 text-blue-600" />
                                  <span className="text-sm font-medium">Blockchain Verification</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  Upon approval, this record will be permanently stored on the blockchain for immutable verification.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Feedback Section */}
                          <div className="space-y-2">
                            <Label htmlFor={`feedback-${submission.id}`}>Faculty Feedback & Comments</Label>
                            <Textarea
                              id={`feedback-${submission.id}`}
                              placeholder="Provide detailed feedback for the student..."
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              rows={3}
                              className="focus-ring"
                            />
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex justify-end space-x-2 pt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedSubmission(null);
                                setFeedback('');
                                setMarks(prev => ({ ...prev, [submission.id]: '' }));
                                setDigitalSignature('');
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-destructive/10 border-destructive/20 hover:bg-destructive/20 text-destructive"
                              onClick={() => handleApproval(submission.id, 'reject')}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject with Feedback
                            </Button>
                            <Button
                              size="sm"
                              className="gradient-faculty"
                              onClick={() => handleApproval(submission.id, 'approve')}
                              disabled={!marks[submission.id] || !feedback.trim()}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve & Verify on Blockchain
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {pendingSubmissions.length === 0 && (
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="font-semibold mb-2">All Caught Up!</h3>
                <p className="text-muted-foreground">No pending submissions to review.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Processed Tab */}
        <TabsContent value="processed" className="space-y-4">
          <div className="space-y-4">
            {processedSubmissions.map((submission) => (
              <Card key={submission.id} className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{submission.activity.title}</h4>
                        <Badge className={
                          submission.submission.status === 'approved' 
                            ? 'bg-success/10 text-success border-success/20'
                            : 'bg-destructive/10 text-destructive border-destructive/20'
                        }>
                          {submission.submission.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {submission.student.name} ({submission.student.roll}) • {submission.activity.type}
                      </p>
                      {submission.approval && (
                        <div className="text-sm">
                          <p><strong>Points Awarded:</strong> {submission.approval.marks}/{submission.submission.maxMarks}</p>
                          <p><strong>Approved By:</strong> {submission.approval.approvedBy} on {submission.approval.approvedAt}</p>
                          {submission.approval.blockchainHash && (
                            <p className="font-mono text-xs"><strong>Blockchain:</strong> {submission.approval.blockchainHash}</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Audit Trail Tab */}
        <TabsContent value="audit" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-faculty-primary" />
                Blockchain Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvedSubmissions.map((submission) => (
                  <div key={submission.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{submission.activity.title}</h5>
                        <p className="text-sm text-muted-foreground">
                          {submission.student.name} ({submission.student.roll})
                        </p>
                        <p className="text-sm"><strong>Points:</strong> {submission.approval.marks}/{submission.approval.maxMarks}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p><strong>Digital Signature:</strong> {submission.approval.digitalSignature}</p>
                        <p className="font-mono text-xs">{submission.approval.blockchainHash}</p>
                        <p>{submission.approval.approvedAt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};