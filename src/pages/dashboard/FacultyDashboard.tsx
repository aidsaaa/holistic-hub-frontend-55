import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  BookOpen, 
  FileCheck, 
  MessageCircle, 
  BarChart3,
  Bell,
  User
} from 'lucide-react';

import { UtilityBar } from '@/components/shared/UtilityBar';
import { AttendanceManagement } from '@/components/dashboard/faculty/AttendanceManagement';
import { SubmissionApprovalPanel } from '@/components/dashboard/faculty/SubmissionApprovalPanel';
import { ClassAnalytics } from '@/components/dashboard/faculty/ClassAnalytics';
import { WelcomeOverview } from '@/components/dashboard/faculty/WelcomeOverview';
import { MyClasses } from '@/components/dashboard/faculty/MyClasses';
import { CommunicationTools } from '@/components/dashboard/faculty/CommunicationTools';
import { FacultyProfile } from '@/components/dashboard/faculty/FacultyProfile';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-faculty-secondary/5 to-faculty-primary/5">
      <UtilityBar userRole="faculty" />

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-card/80 backdrop-blur-sm">
            <TabsTrigger 
              value="overview"
              className="flex items-center data-[state=active]:bg-faculty-primary/20 data-[state=active]:text-faculty-primary data-[state=active]:border-b-2 data-[state=active]:border-faculty-primary"
            >
              <Users className="h-4 w-4 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="academics"
              className="flex items-center data-[state=active]:bg-faculty-primary/20 data-[state=active]:text-faculty-primary data-[state=active]:border-b-2 data-[state=active]:border-faculty-primary"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Academics
            </TabsTrigger>
            <TabsTrigger 
              value="attendance"
              className="flex items-center data-[state=active]:bg-faculty-primary/20 data-[state=active]:text-faculty-primary data-[state=active]:border-b-2 data-[state=active]:border-faculty-primary"
            >
              <Users className="h-4 w-4 mr-1" />
              Attendance
            </TabsTrigger>
            <TabsTrigger 
              value="approvals"
              className="flex items-center data-[state=active]:bg-faculty-primary/20 data-[state=active]:text-faculty-primary data-[state=active]:border-b-2 data-[state=active]:border-faculty-primary"
            >
              <FileCheck className="h-4 w-4 mr-1" />
              Approvals
            </TabsTrigger>
            <TabsTrigger 
              value="reports"
              className="flex items-center data-[state=active]:bg-faculty-primary/20 data-[state=active]:text-faculty-primary data-[state=active]:border-b-2 data-[state=active]:border-faculty-primary"
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Reports
            </TabsTrigger>
            <TabsTrigger 
              value="notifications"
              className="flex items-center data-[state=active]:bg-faculty-primary/20 data-[state=active]:text-faculty-primary data-[state=active]:border-b-2 data-[state=active]:border-faculty-primary"
            >
              <Bell className="h-4 w-4 mr-1" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="profile"
              className="flex items-center data-[state=active]:bg-faculty-primary/20 data-[state=active]:text-faculty-primary data-[state=active]:border-b-2 data-[state=active]:border-faculty-primary"
            >
              <User className="h-4 w-4 mr-1" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab - Welcome Section & Summary */}
          <TabsContent value="overview" className="space-y-6">
            <WelcomeOverview />
          </TabsContent>

          {/* Academics Tab - My Classes Management */}
          <TabsContent value="academics" className="space-y-6">
            <MyClasses />
          </TabsContent>

          {/* Attendance Tab - Take/View/Upload Attendance */}
          <TabsContent value="attendance" className="space-y-6">
            <AttendanceManagement />
          </TabsContent>

          {/* Approvals Tab - Student Submissions Approval */}
          <TabsContent value="approvals" className="space-y-6">
            <SubmissionApprovalPanel />
          </TabsContent>

          {/* Reports Tab - Analytics & Charts */}
          <TabsContent value="reports" className="space-y-6">
            <ClassAnalytics />
          </TabsContent>

          {/* Notifications Tab - Communication Tools */}
          <TabsContent value="notifications" className="space-y-6">
            <CommunicationTools />
          </TabsContent>

          {/* Profile Tab - Faculty Settings */}
          <TabsContent value="profile" className="space-y-6">
            <FacultyProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacultyDashboard;