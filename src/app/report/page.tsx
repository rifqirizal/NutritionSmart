'use client';

import { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BottomNav } from '@/components/BottomNav';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, Beef, Wheat, Droplet, Lightbulb, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

import { ChartData, DailySummary } from '@/types';

export default function ReportPage() {
  const [days, setDays] = useState(7);
  const [recPage, setRecPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setRecPage(1);
  }, [days]);

  const { data: res, isLoading: loading } = useQuery({
    queryKey: ['weeklyReport', days],
    queryFn: async () => {
      const { getWeeklyReport } = await import('@/services/report');
      return getWeeklyReport(days);
    },
    refetchInterval: 300000,
  });

  const data = useMemo(() => {
    if (res?.success && res.data?.summaries) {
      return res.data.summaries.map((d: DailySummary) => ({
        ...d,
        name: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
      }));
    }
    return [];
  }, [res]);

  const { totals, hasData } = useMemo(() => {
    let tC = 0, tP = 0, tCb = 0, tF = 0;
    if (res?.success && res.data?.summaries) {
      res.data.summaries.forEach((d: DailySummary) => {
        tC += d.total_calories || 0;
        tP += d.total_protein || 0;
        tCb += d.total_carbs || 0;
        tF += d.total_fat || 0;
      });
    }
    return {
      totals: { calories: tC, protein: tP, carbs: tCb, fat: tF },
      hasData: res?.success && res.data?.summaries && res.data.summaries.length > 0
    };
  }, [res]);

  const meals = useMemo(() => {
    if (res?.success && res.data?.meals) {
      return res.data.meals;
    }
    return [];
  }, [res]);

  const totalRecPages = Math.ceil(meals.length / itemsPerPage);
  const currentRecs = meals.slice((recPage - 1) * itemsPerPage, recPage * itemsPerPage);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-background p-4 pt-8 md:p-8 md:pt-24 pb-28">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-[72px] w-full rounded-xl" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
        <BottomNav />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background p-4 pt-8 md:p-8 md:pt-24 pb-28 font-sans transition-colors duration-300">
      <motion.div 
        className="max-w-4xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex justify-between items-center bg-white dark:bg-card p-6 rounded-xl border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Performance Report</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Track your progress</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={days.toString()} onValueChange={(v) => { if (v) setDays(parseInt(v, 10)); }}>
              <SelectTrigger className="w-[140px] bg-white dark:bg-slate-900 rounded-xl border-slate-200 dark:border-border shadow-sm font-medium">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 dark:border-border shadow-xl">
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="14">Last 14 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-12 h-12 bg-primary/10 rounded-full hidden sm:flex items-center justify-center">
              <TrendingUp className="text-primary" />
            </div>
          </div>
        </header>

        {hasData ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="rounded-xl bg-white dark:bg-card border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-10 h-10 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-full flex items-center justify-center mb-3">
                  <Flame size={20} />
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Calories</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{totals.calories}</div>
                <div className="text-xs text-slate-400 mt-1">kcal total</div>
              </CardContent>
            </Card>

            <Card className="rounded-xl bg-white dark:bg-card border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mb-3">
                  <Beef size={20} />
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Protein</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{totals.protein}</div>
                <div className="text-xs text-slate-400 mt-1">grams total</div>
              </CardContent>
            </Card>

            <Card className="rounded-xl bg-white dark:bg-card border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-full flex items-center justify-center mb-3">
                  <Wheat size={20} />
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Carbs</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{totals.carbs}</div>
                <div className="text-xs text-slate-400 mt-1">grams total</div>
              </CardContent>
            </Card>

            <Card className="rounded-xl bg-white dark:bg-card border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-10 h-10 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-3">
                  <Droplet size={20} />
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Fat</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{totals.fat}</div>
                <div className="text-xs text-slate-400 mt-1">grams total</div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex items-center justify-center h-40 text-slate-500 font-medium bg-white dark:bg-card border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20 rounded-xl">
            No data available for the past {days} days.
          </div>
        )}

        {hasData && (
          <Card className="rounded-xl bg-white dark:bg-card border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20 mt-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                Calories Trend
              </CardTitle>
              <CardDescription className="text-slate-500">Your caloric intake over the last {days} days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={1}/>
                        <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      contentStyle={{
                        borderRadius: '1rem',
                        border: '1px solid hsl(var(--border))',
                        backgroundColor: 'hsl(var(--card))',
                        color: 'hsl(var(--foreground))',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Bar
                      dataKey="total_calories"
                      fill="url(#colorCalories)"
                      activeBar={{ fill: '#d97706', opacity: 1 }}
                      radius={[8, 8, 0, 0]}
                      name="Calories"
                      maxBarSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Recommendations List */}
        {meals.length > 0 && (
          <div className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="text-primary" /> Meal AI Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentRecs.map((meal: Record<string, unknown>, index: number) => (
                <Card key={index} className="rounded-xl overflow-hidden border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-md">
                  <div className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{meal.meal_name as string}</h3>
                      <span className="text-xs text-slate-500 flex items-center gap-1 shrink-0 mt-1">
                        <Clock size={12} /> {new Date(meal.created_at as string).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-primary mb-3">
                      {(meal.meal_nutrition as any)?.calories} kcal
                    </div>
                    {(meal.meal_nutrition as any)?.advice ? (
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1 italic border-l-2 border-primary pl-3">
                        &quot;{(meal.meal_nutrition as any).advice}&quot;
                      </p>
                    ) : (
                      <p className="text-sm text-slate-400 italic flex-1 border-l-2 border-slate-300 dark:border-slate-700 pl-3">
                        No AI advice recorded for this meal.
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalRecPages > 1 && (
              <div className="flex items-center justify-between mt-6 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-xl border border-slate-100 dark:border-white/5">
                <button
                  onClick={() => setRecPage(p => Math.max(1, p - 1))}
                  disabled={recPage === 1}
                  className="p-2 flex items-center gap-1 text-sm font-medium text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <div className="text-sm font-medium text-slate-500">
                  Page {recPage} of {totalRecPages}
                </div>
                <button
                  onClick={() => setRecPage(p => Math.min(totalRecPages, p + 1))}
                  disabled={recPage === totalRecPages}
                  className="p-2 flex items-center gap-1 text-sm font-medium text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      <BottomNav />
    </div>
  );
}
