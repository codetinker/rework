import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { ROUTE_PATHS } from "@/lib/index";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid work email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * RWNA CMS Login Page
 * Handles administrative authentication with industrial-grade UI
 * © 2026 RWNA Engineering Sdn. Bhd.
 */
export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading: userLoading } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Use the new API service for authentication
      const result = await login(data.email, data.password);
      
      if (result.success) {
        // Login successful, navigate to dashboard
        navigate(ROUTE_PATHS.DASHBOARD);
      } else {
        // Login failed, show error
        setError(result.error || "Access denied. Invalid credentials or insufficient permissions.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(`Unable to connect to the authentication server: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Subtle Industrial Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      {/* Ambient Glows */}
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        {/* Corporate Branding Header */}
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 mb-5 border border-primary/20"
          >
            <ShieldCheck className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          <h1 className="text-3xl font-black tracking-tighter text-foreground">
            RWNA <span className="text-primary">OpsCenter</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium mt-1 tracking-wide">
            CENTRAL MANAGEMENT SYSTEM
          </p>
        </div>

        <Card className="border-border/60 shadow-2xl shadow-black/10 bg-card/70 backdrop-blur-md">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold tracking-tight">Portal Login</CardTitle>
            <CardDescription className="text-muted-foreground/80">
              Authorized personnel only. Please sign in to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Work Email
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="staff@rwna.com"
                    className={`pl-10.5 h-12 bg-background/50 border-border/50 focus-visible:ring-primary/30 ${
                      errors.email ? "border-destructive/50 ring-destructive/20" : ""
                    }`}
                    {...register("email")}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] font-semibold text-destructive uppercase tracking-tight">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Password
                  </Label>
                  <button 
                    type="button" 
                    className="text-[10px] text-primary hover:text-accent font-bold uppercase tracking-wider transition-colors"
                  >
                    Reset Password
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`pl-10.5 pr-11 h-12 bg-background/50 border-border/50 focus-visible:ring-primary/30 ${
                      errors.password ? "border-destructive/50 ring-destructive/20" : ""
                    }`}
                    {...register("password")}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] font-semibold text-destructive uppercase tracking-tight">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="w-4 h-4 rounded border-border/60 text-primary focus:ring-primary/30 bg-background/50"
                  {...register("rememberMe")}
                />
                <label
                  htmlFor="rememberMe"
                  className="text-xs font-medium text-muted-foreground cursor-pointer select-none"
                >
                  Remember this device for 30 days
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 font-bold tracking-wider group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>VERIFYING...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>SECURE ACCESS</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col border-t border-border/40 bg-muted/20 py-4">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
              <span>Security Level</span>
              <ChevronRight className="w-2.5 h-2.5" />
              <span className="text-primary">Class A Encrypted</span>
            </div>
          </CardFooter>
        </Card>

        {/* Legal & Version Info */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <p className="text-[10px] text-muted-foreground/60 text-center leading-relaxed max-w-[280px] uppercase tracking-tighter">
            This system is for the use of authorized RWNA Engineering personnel only. All activities are recorded and audited.
          </p>
          <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground/40 mt-2">
            <span>© 2026 RWNA ENGINEERING</span>
            <span className="w-1 h-1 bg-muted-foreground/20 rounded-full" />
            <span>V2.8.5-STABLE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
