'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Activity, Apple, ChevronRight, Utensils, TrendingUp } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function Home() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Header */}
      <header className="w-full flex items-center justify-between p-6 z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
            <Apple size={20} className="text-white" />
          </div>
          NutriSmart
        </div>
        <Link href="/login">
          <Button className="font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-sm shadow-primary/20">
            Log In
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center overflow-x-hidden">
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-24 flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="flex-1 text-center lg:text-left z-10"
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-sm font-semibold text-slate-700 dark:text-slate-300 mb-6 transition-colors duration-300">
              <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]"></span>
              AI-Powered Nutrition Analysis
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 dark:text-white leading-[1.1] mb-6">
              Analyze meals. <br />
              <span className="text-slate-400 dark:text-slate-500">Gain insights.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-medium">
              Simply snap a photo of your meal and let our AI calculate calories, macros, and provide personalized insights instantly.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto rounded-full h-14 px-8 text-lg font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95">
                  Start Your Journey <ChevronRight size={20} />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full h-14 px-8 text-lg font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300">
                  View Dashboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full relative z-0"
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-xl overflow-hidden shadow-2xl shadow-slate-300/50 dark:shadow-none">
              <Image 
                src="/assets/images/hero-food.jpg" 
                alt="Healthy colorful salad bowl" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              className="absolute -bottom-6 -left-6 md:-left-10 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 transition-colors duration-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
            >
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <Activity className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Estimated</p>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white">420 kcal</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-white dark:bg-slate-900 py-24 px-6 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Everything you need to succeed</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Smart tools designed to make healthy eating effortless and visually stunning.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <motion.div 
                className="bg-slate-50 dark:bg-slate-950 rounded-xl p-8 md:p-10 border border-slate-100 dark:border-slate-800/50 flex flex-col group overflow-hidden transition-colors duration-300"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6">
                  <Utensils className="text-primary" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Snap & Analyze</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 flex-1">Take a picture of your food. Our advanced AI instantly breaks down the exact calories, protein, carbs, and fats.</p>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500">
                  <img src="/assets/images/feature-scan.jpg" alt="Analyzing data" className="object-cover w-full h-full" />
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                className="bg-slate-50 dark:bg-slate-950 rounded-xl p-8 md:p-10 border border-slate-100 dark:border-slate-800/50 flex flex-col group overflow-hidden transition-colors duration-300"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6">
                  <TrendingUp className="text-primary" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Track & Improve</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 flex-1">View detailed weekly and monthly reports. Understand your habits and make better nutritional decisions.</p>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500">
                  <img src="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg" alt="Dashboard analytics" className="object-cover w-full h-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="w-full bg-slate-900 dark:bg-black py-12 px-6 text-center border-t border-slate-800 transition-colors duration-300">
        <div className="flex items-center justify-center gap-2 font-bold text-xl text-white mb-4">
          <Apple size={24} className="text-primary" />
          NutriSmart
        </div>
        <p className="text-slate-500 dark:text-slate-600 text-sm font-medium">© {new Date().getFullYear()} NutriSmart AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
