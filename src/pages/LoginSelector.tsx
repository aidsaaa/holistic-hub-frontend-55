import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Users, 
  Shield, 
  Building2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface RoleCardProps {
  role: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradientClass: string;
  textGradientClass: string;
  glowClass: string;
  path: string;
}

const RoleCard = ({ 
  role, 
  title, 
  description, 
  icon, 
  gradientClass, 
  textGradientClass, 
  glowClass, 
  path 
}: RoleCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 transform hover:scale-105 glass-card border-2 hover:border-opacity-50 ${glowClass} hover:shadow-2xl`}
      onClick={() => navigate(path)}
    >
      <CardContent className="p-8 text-center relative overflow-hidden">
        {/* Background gradient effect */}
        <div className={`absolute inset-0 opacity-5 ${gradientClass} transition-opacity duration-300 group-hover:opacity-10`} />
        
        {/* Floating particles effect */}
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <Sparkles className="h-6 w-6 text-current animate-pulse" />
        </div>
        
        <div className="relative z-10">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${gradientClass} mb-6 group-hover:animate-glow-pulse transition-all duration-300`}>
            <div className="text-white text-3xl">
              {icon}
            </div>
          </div>
          
          <h3 className={`text-2xl font-bold mb-3 ${textGradientClass} group-hover:scale-105 transition-transform duration-200`}>
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {description}
          </p>
          
          <Button 
            variant="ghost" 
            className="group-hover:bg-primary/10 transition-colors duration-200 font-medium"
          >
            Sign In as {role}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const LoginSelector = () => {
  const roles = [
    {
      role: 'Student',
      title: 'Student Portal',
      description: 'Access your courses, track progress, view grades, and connect with peers in your personalized learning environment.',
      icon: <GraduationCap />,
      gradientClass: 'gradient-student',
      textGradientClass: 'text-gradient-student',
      glowClass: 'hover:glow-student',
      path: '/login/student'
    },
    {
      role: 'Faculty',
      title: 'Faculty Dashboard',
      description: 'Manage courses, grade assignments, track student progress, and collaborate with fellow educators.',
      icon: <Users />,
      gradientClass: 'gradient-faculty',
      textGradientClass: 'text-gradient-faculty',
      glowClass: 'hover:glow-faculty',
      path: '/login/faculty'
    },
    {
      role: 'Administrator',
      title: 'Admin Control',
      description: 'Oversee institutional operations, manage users, analyze data, and maintain system configurations.',
      icon: <Shield />,
      gradientClass: 'gradient-admin',
      textGradientClass: 'text-gradient-admin',
      glowClass: 'hover:glow-admin',
      path: '/login/admin'
    },
    {
      role: 'Government',
      title: 'Government Portal',
      description: 'Monitor educational metrics, track institutional compliance, and access regulatory reporting tools.',
      icon: <Building2 />,
      gradientClass: 'gradient-government',
      textGradientClass: 'text-gradient-government',
      glowClass: 'hover:glow-government',
      path: '/login/government'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-6 animate-float">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Smart Student Hub
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2 max-w-2xl mx-auto">
            Your comprehensive EdTech platform for holistic student success
          </p>
          
          <p className="text-sm text-muted-foreground/80 max-w-lg mx-auto">
            Choose your role to access personalized features and tools designed for your needs
          </p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          {roles.map((role, index) => (
            <div 
              key={role.role}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <RoleCard {...role} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            Secure • Scalable • Student-Focused
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSelector;