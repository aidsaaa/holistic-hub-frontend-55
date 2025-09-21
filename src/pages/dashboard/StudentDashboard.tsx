import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UtilityBar } from '@/components/shared/UtilityBar';
import { AssignmentSubmissionForm } from '@/components/forms/AssignmentSubmissionForm';
import { WelcomeOverview } from '@/components/dashboard/student/WelcomeOverview';
import { AcademicsModule } from '@/components/dashboard/student/AcademicsModule';
import { StudentActivityTracker } from '@/components/dashboard/student/StudentActivityTracker';
import { CareerTwin } from '@/components/dashboard/student/CareerTwin';
import { Portfolio } from '@/components/dashboard/student/Portfolio';
import { Gamification } from '@/components/dashboard/student/Gamification';
import { StudentAttendance } from '@/pages/attendance/StudentAttendance';

const StudentDashboard = () => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleFileUpload = () => {
    setShowSubmissionForm(true);
  };

  if (showSubmissionForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-student-secondary/5 to-student-primary/5">
        <div className="container mx-auto px-4 py-8">
          <AssignmentSubmissionForm onClose={() => setShowSubmissionForm(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-student-secondary/5 to-student-primary/5">
      <UtilityBar userRole="student" />

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-card/80 backdrop-blur-sm">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-student-primary/20 data-[state=active]:text-student-primary data-[state=active]:border-b-2 data-[state=active]:border-student-primary"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="academics"
              className="data-[state=active]:bg-student-primary/20 data-[state=active]:text-student-primary data-[state=active]:border-b-2 data-[state=active]:border-student-primary"
            >
              Academics
            </TabsTrigger>
            <TabsTrigger 
              value="attendance"
              className="data-[state=active]:bg-student-primary/20 data-[state=active]:text-student-primary data-[state=active]:border-b-2 data-[state=active]:border-student-primary"
            >
              Attendance
            </TabsTrigger>
            <TabsTrigger 
              value="activities"
              className="data-[state=active]:bg-student-primary/20 data-[state=active]:text-student-primary data-[state=active]:border-b-2 data-[state=active]:border-student-primary"
            >
              Activity Tracker
            </TabsTrigger>
            <TabsTrigger 
              value="career"
              className="data-[state=active]:bg-student-primary/20 data-[state=active]:text-student-primary data-[state=active]:border-b-2 data-[state=active]:border-student-primary"
            >
              Career Twin
            </TabsTrigger>
            <TabsTrigger 
              value="portfolio"
              className="data-[state=active]:bg-student-primary/20 data-[state=active]:text-student-primary data-[state=active]:border-b-2 data-[state=active]:border-student-primary"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger 
              value="gamification"
              className="data-[state=active]:bg-student-primary/20 data-[state=active]:text-student-primary data-[state=active]:border-b-2 data-[state=active]:border-student-primary"
            >
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <WelcomeOverview onUploadClick={handleFileUpload} />
          </TabsContent>

          <TabsContent value="academics" className="space-y-6">
            <AcademicsModule />
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <StudentAttendance />
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <StudentActivityTracker />
          </TabsContent>

          <TabsContent value="career" className="space-y-6">
            <CareerTwin />
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Portfolio />
          </TabsContent>

          <TabsContent value="gamification" className="space-y-6">
            <Gamification />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;