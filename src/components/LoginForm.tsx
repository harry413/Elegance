
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();
  const { login, loginWithGoogle } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      const success = await login(values.email, values.password);
      
      if (success) {
        toast({
          title: "Success!",
          description: "You have been logged in successfully.",
        });
        onSuccess();
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "There was an error logging in. Please try again.",
        variant: "destructive",
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    try {
      const success = await loginWithGoogle();
      
      if (success) {
        toast({
          title: "Success!",
          description: "You have been logged in with Google.",
        });
        onSuccess();
      } else {
        toast({
          title: "Login failed",
          description: "Google login failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "There was an error with Google login. Please try again.",
        variant: "destructive",
      });
      console.error('Google login error:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="your.email@example.com" 
                  {...field} 
                  disabled={isLoading}
                  className="bg-muted/30"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  {...field} 
                  disabled={isLoading}
                  className="bg-muted/30"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="remember-me" 
              className="h-4 w-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
            />
            <label htmlFor="remember-me" className="ml-2 block text-gray-700">
              Remember me
            </label>
          </div>
          <div className="text-right">
            <button 
              type="button"
              className="text-brand-accent hover:underline font-medium"
            >
              Forgot password?
            </button>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white py-3"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
        
        <div className="relative flex items-center justify-center mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="py-5 hover:bg-muted transition-colors"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
          >
            {isGoogleLoading ? 'Signing in...' : 'Google'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="py-5 hover:bg-muted transition-colors"
            disabled={isLoading || isGoogleLoading}
          >
            Facebook
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
