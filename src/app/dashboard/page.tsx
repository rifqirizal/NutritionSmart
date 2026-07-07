'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useDashboardData } from '@/services/dashboard';
import { useProfileData } from '@/services/profile';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Flame, Utensils, LogOut, AlertTriangle, CheckCircle, Info, Target } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/services/auth';
import { useRouter } from 'next/navigation';

const MealImage = ({ url, name }: { url: string | null, name: string }) => {
  const [error, setError] = useState(false);
  
  if (!url || error) {
    return (
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Utensils className="text-primary w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative bg-slate-100 dark:bg-slate-800">
      <Image
        src={url}
        alt={name}
        fill
        sizes="48px"
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
};

export default function DashboardPage() {
  const router = useRouter();

  const { data: res, isLoading: loading } = useDashboardData({
    refetchInterval: 300000,
  });

  const { data: profileRes, isLoading: profileLoading } = useProfileData();

  const { mutateAsync: logoutMutation } = useLogout();

  const dashboardData = res?.success && res.data ? res.data : null;
  const recentMeals = dashboardData?.recentMeals || [];

  const handleLogout = async () => {
    try {
      await logoutMutation();
      router.push('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const { todaySummary, totalCalories, totalProtein, totalCarbs, totalFat, calorieTarget, progressPercentage, feedbackText, progressColor, isWarning, isSuccess } = useMemo(() => {
    const todaySum = dashboardData?.dailySummary;
    const hasData = todaySum && (todaySum.total_calories > 0 || todaySum.total_protein > 0);
    const profile = dashboardData?.profile;

    let target = 2000;
    let pColor = 'bg-primary';
    let feedback = 'Start logging your meals for today!';
    let percentage = 0;

    let tCalories = todaySum?.total_calories || 0;

    if (profile) {
      const birthDate = new Date(profile.birth_date);
      const age = new Date().getFullYear() - birthDate.getFullYear();

      let bmr = (10 * profile.current_weight) + (6.25 * profile.height_cm) - (5 * age);
      bmr = profile.gender === 'male' ? bmr + 5 : bmr - 161;

      let tdee = bmr * 1.375;

      if (profile.goal.toLowerCase().includes('turun') || profile.target_weight < profile.current_weight) {
        target = Math.round(tdee - 500);
      } else if (profile.goal.toLowerCase().includes('naik') || profile.target_weight > profile.current_weight) {
        target = Math.round(tdee + 500);
      } else {
        target = Math.round(tdee);
      }

      percentage = Math.min(100, Math.round((tCalories / target) * 100));
      const isLosingWeight = profile.goal.toLowerCase().includes('turun') || profile.target_weight < profile.current_weight;

      if (isLosingWeight) {
        if (tCalories > target) {
          pColor = 'bg-red-500';
          feedback = `Warning! You've exceeded your daily limit by ${Math.round(tCalories - target)} kcal. Reduce snacking!`;
        } else if (percentage > 85) {
          pColor = 'bg-amber-400';
          feedback = `You're approaching your daily calorie limit. Be mindful of your next meal!`;
        } else if (tCalories > 0) {
          pColor = 'bg-green-400';
          feedback = `You have ${Math.round(target - tCalories)} kcal left for today. You're on track!`;
        }
      } else {
        if (tCalories > target + 300) {
          pColor = 'bg-amber-400';
          feedback = `Whoa, your calorie intake is quite high today!`;
        } else if (percentage > 85) {
          pColor = 'bg-green-400';
          feedback = `Great job! You've almost reached your daily calorie target.`;
        } else if (tCalories > 0) {
          pColor = 'bg-blue-400';
          feedback = `Only ${percentage}%. Eat more to hit your daily target!`;
        }
      }
    }

    return {
      todaySummary: hasData ? todaySum : null,
      totalCalories: tCalories,
      totalProtein: todaySum?.total_protein || 0,
      totalCarbs: todaySum?.total_carbs || 0,
      totalFat: todaySum?.total_fat || 0,
      calorieTarget: target,
      progressPercentage: percentage,
      feedbackText: feedback,
      progressColor: pColor,
      isWarning: pColor === 'bg-red-500' || pColor === 'bg-amber-400',
      isSuccess: pColor === 'bg-green-400' || percentage >= 90
    };
  }, [dashboardData]);

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

  if (loading || profileLoading) return (
    <div className="min-h-screen bg-slate-50 dark:bg-background p-4 pt-8 md:p-8 md:pt-24 pb-24">
      <div className="max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <BottomNav />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background p-4 pt-8 md:p-8 md:pt-24 pb-24 font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      <motion.div
        className="max-w-4xl mx-auto space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.header variants={item} className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Today's Overview</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Here's your nutritional summary for today</p>
          </div>

        </motion.header>

        {profileRes && profileRes.success && !profileRes.data && (
          <motion.div variants={item} className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div>
              <h3 className="font-bold text-orange-800 dark:text-orange-400">Profile Incomplete</h3>
              <p className="text-sm text-orange-600 dark:text-orange-300">Please complete your profile to get personalized nutrition insights and accurate recommendations.</p>
            </div>
            <Button onClick={() => router.push('/profile')} className="whitespace-nowrap bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
              Complete Profile
            </Button>
          </motion.div>
        )}

        {/* Calories Card */}
        <motion.div variants={item}>
          <Card className="rounded-xl bg-white dark:bg-card border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20 overflow-hidden relative">
            <CardContent className="p-6 md:p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-xl flex items-center justify-center shadow-inner">
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white tracking-wide">Daily Target</h3>
                    <p className="text-xs text-slate-500 font-medium">{calorieTarget} kcal / day</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {totalCalories} <span className="text-sm font-medium text-slate-500">kcal</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>Progress</span>
                  <span>{progressPercentage}%</span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full ${progressColor} transition-all duration-1000 ease-out`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 rounded-2xl flex items-start gap-3 shadow-sm">
                <div className={`mt-0.5 shrink-0 rounded-full ${isWarning ? 'bg-amber-100 dark:bg-amber-900/30' : isSuccess ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-100 dark:bg-blue-900/30'} p-1.5`}>
                  {isWarning ? <AlertTriangle size={16} className="text-amber-500" /> :
                    isSuccess ? <CheckCircle size={16} className="text-green-500" /> :
                      <Info size={16} className="text-blue-500" />}
                </div>
                <p className="text-sm font-medium text-green-900 dark:text-green-100 leading-relaxed">
                  {feedbackText}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Macros */}
        <motion.div variants={item} className="grid grid-cols-3 gap-4">
          <Card className="rounded-xl bg-white dark:bg-card border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Protein</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalProtein}g</div>
            </CardContent>
          </Card>
          <Card className="rounded-xl bg-white dark:bg-card border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Carbs</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalCarbs}g</div>
            </CardContent>
          </Card>
          <Card className="rounded-xl bg-white dark:bg-card border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Fat</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalFat}g</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Meals or Placeholder */}
        <motion.div variants={item}>
          <Card className="rounded-xl bg-white dark:bg-card border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Utensils size={18} className="text-primary" />
                Recent Meals
              </CardTitle>
              <CardDescription>Your latest food entries</CardDescription>
            </CardHeader>
            <CardContent>
              {recentMeals.length > 0 ? (
                <div className="space-y-4">
                  {recentMeals.slice(0, 5).map((meal: any) => (
                    <div key={meal.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-border/50 bg-slate-50 dark:bg-slate-900/50">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <MealImage url={meal.image_url} name={meal.meal_name} />
                        <div className="truncate">
                          <p className="font-semibold text-slate-900 dark:text-white truncate">{meal.meal_name}</p>
                          <p className="text-xs text-slate-500">{new Date(meal.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-primary">{meal.meal_nutrition?.calories || 0} kcal</p>
                        <p className="text-xs text-slate-500">P: {meal.meal_nutrition?.protein || 0}g</p>
                      </div>
                    </div>
                  ))}

                  {recentMeals.length > 5 && (
                    <Button
                      variant="ghost"
                      className="w-full mt-2 text-sm text-primary hover:bg-primary/5 hover:text-primary/90"
                      onClick={() => router.push('/report')}
                    >
                      Show all in Report
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Utensils className="text-slate-400" size={24} />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">No meals logged yet today.</p>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Tap the Scan button below to start.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
