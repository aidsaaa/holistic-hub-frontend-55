import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import LoginSelector from "./pages/LoginSelector";
import StudentLogin from "./pages/login/StudentLogin";
import FacultyLogin from "./pages/login/FacultyLogin";
import AdminLogin from "./pages/login/AdminLogin";
import GovernmentLogin from "./pages/login/GovernmentLogin";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import FacultyDashboard from "./pages/dashboard/FacultyDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import GovernmentDashboard from "./pages/dashboard/GovernmentDashboard";
import { StudentAttendance } from "./pages/attendance/StudentAttendance";
import { FacultyAttendance } from "./pages/attendance/FacultyAttendance";
import { AdminAttendance } from "./pages/attendance/AdminAttendance";
import { GovernmentAttendance } from "./pages/attendance/GovernmentAttendance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<LoginSelector />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/faculty" element={<FacultyLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login/government" element={<GovernmentLogin />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard/student" 
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/faculty" 
              element={
                <ProtectedRoute>
                  <FacultyDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/government" 
              element={
                <ProtectedRoute>
                  <GovernmentDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Attendance Routes */}
            <Route 
              path="/attendance/student" 
              element={
                <ProtectedRoute>
                  <StudentAttendance />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/attendance/faculty" 
              element={
                <ProtectedRoute>
                  <FacultyAttendance />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/attendance/admin" 
              element={
                <ProtectedRoute>
                  <AdminAttendance />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/attendance/government" 
              element={
                <ProtectedRoute>
                  <GovernmentAttendance />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
