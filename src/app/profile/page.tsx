'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileInput } from '@/validators/profile';
import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useProfileData, useUpdateProfile } from '@/services/profile';
import { BottomNav } from '@/components/BottomNav';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Calendar, User, Ruler, Scale, Target, Trophy, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      gender: 'Male',
      goal: 'Maintain Weight',
    } as ProfileInput,
  });

  const { data: profileRes, isLoading: initialLoading } = useProfileData({
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: updateProfileMutation } = useUpdateProfile();

  useEffect(() => {
    if (profileRes?.success && profileRes.data) {
      form.reset({
        birth_date: new Date(profileRes.data.birth_date).toISOString().split('T')[0],
        gender: profileRes.data.gender,
        height_cm: profileRes.data.height_cm,
        current_weight: profileRes.data.current_weight,
        target_weight: profileRes.data.target_weight,
        goal: profileRes.data.goal,
      });
    }
  }, [profileRes, form]);

  const onSubmit = useCallback(async (data: ProfileInput) => {
    setLoading(true);
    try {
      const result = await updateProfileMutation(data);
      if (!result.success) {
        toast.error(result.message || 'Update failed');
      } else {
        toast.success('Profile saved successfully!');
        if (!profileRes?.data) {
          // If it was a new profile creation, redirect to dashboard
          router.push('/dashboard');
        }
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [updateProfileMutation, profileRes, router]);

  const isNewProfile = profileRes && profileRes.success && !profileRes.data;

  if (initialLoading)
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-background p-4 pt-8 pb-28 md:p-8 md:pt-24 md:pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-[72px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </div>
        <BottomNav />
      </div>
    );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background p-4 pt-8 pb-36 md:p-8 md:pt-24 md:pb-12 font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      <motion.div
        className="max-w-4xl mx-auto space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {isNewProfile && (
          <motion.div variants={item} className="bg-primary text-primary-foreground p-6 rounded-xl shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
            <h2 className="text-2xl font-bold mb-2">Welcome to NutriSmart! 👋</h2>
            <p className="opacity-90">Let's set up your profile so we can personalize your nutrition recommendations.</p>
          </motion.div>
        )}

        {!isNewProfile && (
          <motion.header variants={item} className="flex justify-between items-center bg-primary text-primary-foreground p-6 rounded-xl shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h1 className="text-2xl font-bold tracking-tight text-white">Profile Settings</h1>
              <p className="text-sm text-primary-foreground/90">Manage your physical stats and nutrition goals</p>
            </div>
          </motion.header>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Personal Information */}
            <motion.div variants={item}>
              <Card className="rounded-xl shadow-xl shadow-slate-200/40 dark:shadow-black/20 bg-white dark:bg-card overflow-visible border-0 ring-1 ring-slate-100 dark:ring-white/5">
                <div className="px-6 pt-6 pb-2 border-b border-slate-100 dark:border-border">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                    <User className="text-primary w-5 h-5" /> Personal Information
                  </h3>
                </div>
                <CardContent className="pt-6 overflow-visible">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="birth_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" /> Birth Date
                          </FormLabel>
                          <FormControl>
                            <Input type="date" className="h-12 rounded-xl bg-slate-50 dark:bg-background border-slate-200 dark:border-border focus-visible:ring-primary" {...field} value={field.value ?? ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" /> Gender
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-background border-slate-200 dark:border-border focus-visible:ring-primary">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="z-[100] bg-white dark:bg-card border-slate-200 dark:border-border shadow-xl rounded-xl">
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Body Metrics */}
            <motion.div variants={item}>
              <Card className="rounded-xl shadow-xl shadow-slate-200/40 dark:shadow-black/20 bg-white dark:bg-card overflow-visible border-0 ring-1 ring-slate-100 dark:ring-white/5">
                <div className="px-6 pt-6 pb-2 border-b border-slate-100 dark:border-border">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                    <Scale className="text-primary w-5 h-5" /> Body Metrics
                  </h3>
                </div>
                <CardContent className="pt-6 overflow-visible">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="height_cm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Ruler className="w-4 h-4 text-slate-400" /> Height (cm)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="h-12 rounded-xl bg-slate-50 dark:bg-background border-slate-200 dark:border-border focus-visible:ring-primary"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="current_weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Scale className="w-4 h-4 text-slate-400" /> Current Weight (kg)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              className="h-12 rounded-xl bg-slate-50 dark:bg-background border-slate-200 dark:border-border focus-visible:ring-primary"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Goals */}
            <motion.div variants={item}>
              <Card className="rounded-xl shadow-xl shadow-slate-200/40 dark:shadow-black/20 bg-white dark:bg-card overflow-visible border-0 ring-1 ring-slate-100 dark:ring-white/5">
                <div className="px-6 pt-6 pb-2 border-b border-slate-100 dark:border-border">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                    <Trophy className="text-primary w-5 h-5" /> Your Goals
                  </h3>
                </div>
                <CardContent className="pt-6 overflow-visible">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="target_weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Target className="w-4 h-4 text-slate-400" /> Target Weight (kg)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              className="h-12 rounded-xl bg-slate-50 dark:bg-background border-slate-200 dark:border-border focus-visible:ring-primary"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="goal"
                      render={({ field }) => (
                        <FormItem className="relative z-50">
                          <FormLabel className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-slate-400" /> Primary Goal
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-background border-slate-200 dark:border-border focus-visible:ring-primary">
                                <SelectValue placeholder="Select a goal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="z-[100] bg-white dark:bg-card border-slate-200 dark:border-border shadow-xl rounded-xl">
                              <SelectItem value="Lose Weight">Lose Weight</SelectItem>
                              <SelectItem value="Maintain Weight">Maintain Weight</SelectItem>
                              <SelectItem value="Gain Weight">Gain Weight</SelectItem>
                              <SelectItem value="Build Muscle">Build Muscle</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Button
                type="submit"
                className="w-full h-14 mt-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? 'Saving...' : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    {isNewProfile ? 'Complete Profile' : 'Save Changes'}
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </motion.div>

      <BottomNav />
    </div>
  );
}
