'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/validators/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Apple, ArrowRight } from 'lucide-react';
import { useLogin } from '@/services/auth';

export default function LoginPage() {
  const { mutateAsync: loginMutation, isPending: loading } = useLogin();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const result = await loginMutation(data);
      if (!result.success) {
        toast.error(result.message || 'Login failed');
      } else {
        toast.success('Logged in successfully');
        window.location.href = '/dashboard';
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 relative bg-slate-900 overflow-hidden">
        <Image 
          src="/assets/images/auth-bg.jpg" 
          alt="Healthy food" 
          fill 
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 z-10 text-white">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tight mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Apple size={24} className="text-white" />
            </div>
            NutriSmart
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">Your journey to a healthier life starts here.</h2>
          <p className="text-slate-300 text-lg">Join thousands of users who are transforming their lives through AI-powered nutrition tracking.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:hidden flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white mb-8 justify-center">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-md">
                <Apple size={20} className="text-white" />
              </div>
              NutriSmart
            </div>

            <div className="text-center md:text-left mb-8">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Sign in to your account</h1>
              <p className="text-muted-foreground">Enter your details below to continue to NutriSmart.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Email address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="you@example.com" 
                          {...field} 
                          value={field.value ?? ""}
                          className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-primary" 
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
                      <div className="flex items-center justify-between">
                        <FormLabel className="font-semibold">Password</FormLabel>
                        <button type="button" onClick={() => toast.info('Silakan hubungi administrator untuk mereset password Anda.')} className="text-sm font-medium text-primary hover:underline">Forgot password?</button>
                      </div>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          value={field.value ?? ""}
                          className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-primary" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl font-bold text-base mt-6 flex items-center justify-center gap-2 group" 
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                  {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center text-sm">
              <span className="text-muted-foreground">Don&apos;t have an account? </span>
              <Link href="/register" className="font-bold text-primary hover:underline">
                Create one now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
