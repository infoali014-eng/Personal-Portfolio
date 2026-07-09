import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Password reset state
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      await signIn(email, password);
      // Success: redirect to dashboard
      navigate('/admin/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      setIsResetOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background">
      <HelmetSEO title="Admin Login | Creator CMS" />

      <Card className="max-w-md w-full bg-surface border border-primary/10 p-8 space-y-6 rounded-3xl shadow-xl">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-accent/5 rounded-2xl border border-accent/10 text-accent mb-2">
            <Cpu className="h-6 w-6 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-text">CREATOR.CMS</h2>
          <p className="text-xs text-muted">Authenticate to manage your portfolio and university networks.</p>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 text-xs font-mono text-danger bg-danger/10 border border-danger/20 rounded-xl">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ali@deepcode.cc"
                className="w-full rounded-lg bg-background border border-primary/10 pl-9 pr-4 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Password</label>
              <button 
                type="button" 
                onClick={() => setIsResetOpen(true)}
                className="text-[10px] font-mono text-accent hover:text-highlight"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full rounded-lg bg-background border border-primary/10 pl-9 pr-4 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input 
              type="checkbox" 
              id="remember" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
              className="rounded border-primary/10 bg-background text-accent focus:ring-accent"
            />
            <label htmlFor="remember" className="text-xs text-muted cursor-pointer font-mono select-none">Remember Me</label>
          </div>

          <Button variant="primary" type="submit" disabled={loading} className="w-full pt-3">
            {loading ? 'Authenticating...' : 'Sign In as Creator'}
          </Button>
        </form>
      </Card>

      {/* Password Reset Modal */}
      {isResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="bg-surface border border-primary/10 max-w-sm w-full p-6 space-y-4 shadow-xl text-xs sm:text-sm">
            <h3 className="font-bold text-text text-base">Reset Password</h3>
            <p className="text-xs text-muted">Enter your email and we will send a password reset token.</p>
            
            {resetSuccess ? (
              <div className="text-xs font-mono text-success bg-success/10 border border-success/20 p-3 rounded-lg flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Reset token dispatched to inbox!</span>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <input 
                  type="email" 
                  value={resetEmail} 
                  onChange={(e) => setResetEmail(e.target.value)} 
                  required
                  placeholder="ali@deepcode.cc"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" type="button" onClick={() => setIsResetOpen(false)}>Cancel</Button>
                  <Button variant="primary" size="sm" type="submit">Submit</Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default Login;
