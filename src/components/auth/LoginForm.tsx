import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface LoginFormProps {
  role: UserRole;
  accentColor: string;
  redirectTo: string;
}

const LoginForm = ({ role, accentColor, redirectTo }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{email?: string; password?: string}>({});
  
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors: {email?: string; password?: string} = {};
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    try {
      const success = await login(email, password, role);
      
      if (success) {
        navigate(redirectTo);
      } else {
        setError(`This account is not authorized for ${role.charAt(0).toUpperCase() + role.slice(1)} login. Please check your credentials or select the correct role.`);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const getRoleHint = () => {
    const hints = {
      student: 'Use student@example.com with any password',
      faculty: 'Use faculty@example.com with any password',
      admin: 'Use admin@example.com with any password',
      government: 'Use government@example.com with any password'
    };
    return hints[role];
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive" className="animate-fade-in">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (validationErrors.email) {
                    setValidationErrors(prev => ({ ...prev, email: undefined }));
                  }
                }}
                className={`pl-10 focus-ring ${validationErrors.email ? 'border-destructive' : ''}`}
                disabled={isLoading}
                aria-describedby={validationErrors.email ? 'email-error' : undefined}
              />
            </div>
            {validationErrors.email && (
              <p id="email-error" className="text-sm text-destructive animate-fade-in" role="alert">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (validationErrors.password) {
                    setValidationErrors(prev => ({ ...prev, password: undefined }));
                  }
                }}
                className={`pl-10 focus-ring ${validationErrors.password ? 'border-destructive' : ''}`}
                disabled={isLoading}
                aria-describedby={validationErrors.password ? 'password-error' : undefined}
              />
            </div>
            {validationErrors.password && (
              <p id="password-error" className="text-sm text-destructive animate-fade-in" role="alert">
                {validationErrors.password}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className={`w-full ${accentColor} hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02] focus-ring`}
          disabled={isLoading}
          aria-describedby="login-hint"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`
          )}
        </Button>

        <div className="text-center">
          <p id="login-hint" className="text-xs text-muted-foreground">
            Demo: {getRoleHint()}
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;