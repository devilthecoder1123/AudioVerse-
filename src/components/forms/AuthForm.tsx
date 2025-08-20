import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Chrome } from "lucide-react";

interface AuthFormProps {
  title: string;
  subtitle: string;
  onGoogleAuth: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error?: string | null;
  children: ReactNode;
  submitButtonText: string;
  footerText: string;
  footerLink: ReactNode;
}

export function AuthForm({
  title,
  subtitle,
  onGoogleAuth,
  onSubmit,
  isLoading,
  error,
  children,
  submitButtonText,
  footerText,
  footerLink,
}: AuthFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in-up">
          <h2 className="mt-6 text-3xl font-bold text-gradient">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {/* Form Card */}
        <Card className="glass-effect border-primary/20 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">{title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Google Auth */}
            <Button
              variant="outline"
              className="w-full"
              onClick={onGoogleAuth}
              disabled={isLoading}
            >
              <Chrome className="h-4 w-4 mr-2" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              {children}
              
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? `${submitButtonText}...` : submitButtonText}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">{footerText} </span>
              {footerLink}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
