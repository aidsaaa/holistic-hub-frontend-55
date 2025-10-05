import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { 
  GraduationCap, 
  Users, 
  BarChart3, 
  Shield, 
  Award,
  TrendingUp,
  BookOpen,
  Target
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard/student'); // Will be redirected based on role
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <nav className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
              Smart Student Hub
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Login
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
              Smart Student Hub
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Comprehensive Activity Tracking & Portfolio Management for Higher Education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/auth")} className="text-lg">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-student-primary mb-4" />
                <CardTitle>Activity Tracking</CardTitle>
                <CardDescription>
                  Track conferences, certifications, competitions, internships, and community service
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-faculty-primary mb-4" />
                <CardTitle>Faculty Approval</CardTitle>
                <CardDescription>
                  Digital signatures, blockchain verification, and comprehensive audit trails
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Portfolio Generator</CardTitle>
                <CardDescription>
                  Auto-generated professional portfolios with PDF and web link exports
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-admin-primary mb-4" />
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>
                  NAAC, NIRF, AICTE compliance reports with predictive analytics
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Who Benefits?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="glass-card">
              <CardHeader>
                <Users className="h-10 w-10 text-student-primary mb-2" />
                <CardTitle>Students</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Centralized activity tracking</li>
                  <li>• Professional portfolio generation</li>
                  <li>• Career readiness insights</li>
                  <li>• Blockchain-verified achievements</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <Target className="h-10 w-10 text-faculty-primary mb-2" />
                <CardTitle>Faculty & Admins</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Streamlined approval workflows</li>
                  <li>• AI-powered verification tools</li>
                  <li>• Institutional analytics dashboard</li>
                  <li>• Accreditation compliance reports</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-admin-primary mb-2" />
                <CardTitle>Institutions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• NAAC, NIRF, AICTE reporting</li>
                  <li>• Strategic insights for growth</li>
                  <li>• Student engagement metrics</li>
                  <li>• Compliance monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <Shield className="h-10 w-10 text-government-primary mb-2" />
                <CardTitle>Government & Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• State & national reports</li>
                  <li>• Policy monitoring tools</li>
                  <li>• Educational trends analysis</li>
                  <li>• Multi-institution oversight</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <Card className="glass-card max-w-3xl mx-auto p-8">
            <CardHeader>
              <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of institutions transforming student activity management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button size="lg" onClick={() => navigate("/auth")} className="text-lg">
                Create Account
              </Button>
              <p className="text-sm text-muted-foreground">
                Already have an account? <button onClick={() => navigate("/auth")} className="text-primary hover:underline">Sign in</button>
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 Smart Student Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
