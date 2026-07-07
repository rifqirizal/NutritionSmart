'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Camera, Loader2, ArrowRight, Upload, Languages } from 'lucide-react';
import { useCameraPermission } from '@/hooks/useCameraPermission';
import { scanFoodImage } from '@/services/scan';
import { useProfileData } from '@/services/profile';
import { BottomNav } from '@/components/BottomNav';
import { ScanResult } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const router = useRouter();
  const { hasPermission, requestPermission } = useCameraPermission();
  const { data: profileRes, isLoading: profileLoading } = useProfileData();

  // Translation State
  const [targetLang, setTargetLang] = useState('id');
  const [translatedAdvice, setTranslatedAdvice] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);

  const LANGUAGES = [
    { code: 'id', name: '🇮🇩 Indonesia' },
    { code: 'en', name: '🇬🇧 English' },
  ];

  useEffect(() => {
    const translateAdvice = async () => {
      if (!result?.advice) return;
      if (targetLang === 'id') {
        setTranslatedAdvice(result.advice);
        return;
      }

      setIsTranslating(true);
      try {
        const targetName = LANGUAGES.find(l => l.code === targetLang)?.name;
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: result.advice, targetLanguage: targetName }),
        });
        const data = await response.json();
        if (data.success) {
          setTranslatedAdvice(data.data);
        } else {
          toast.error(data.message || 'Failed to translate');
          setTargetLang('id'); // Revert
        }
      } catch (err) {
        toast.error('Translation error');
        setTargetLang('id'); // Revert
      } finally {
        setIsTranslating(false);
      }
    };

    translateAdvice();
  }, [targetLang, result]);


  useEffect(() => {
    if (profileRes && profileRes.success && !profileRes.data) {
      toast.info('Please complete your profile before scanning food');
      // router.push('/profile');
    }
  }, [profileRes]);

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new globalThis.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          const max = 800;
          if (width > height && width > max) {
            height *= max / width;
            width = max;
          } else if (height > max) {
            width *= max / height;
            height = max;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (!blob) return reject(new Error('Canvas is empty'));
            const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve(newFile);
          }, 'image/webp', 0.8);
        };
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();

      // Jika file lebih besar dari 3MB, lakukan kompresi.
      // Jika di bawah 3MB, kirim file asli agar kualitas tetap maksimal
      // dan tetap aman dari batas 4.5MB Vercel.
      let fileToSend = file;
      if (file.size > 3 * 1024 * 1024) {
        try {
          fileToSend = await compressImage(file);
        } catch (err) {
          console.error("Gagal mengkompresi gambar:", err);
        }
      }

      formData.append('image', fileToSend);

      const data = await scanFoodImage(formData);

      if (!data.success) {
        toast.error(data.message || 'Failed to scan image');
      } else {
        setResult(data.data);
        toast.success('Food analyzed successfully!');
      }
    } catch (err) {
      toast.error('An error occurred during scanning. Make sure GEMINI_API_KEY is configured.');
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-background pt-8 md:pt-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const isProfileIncomplete = profileRes && profileRes.success && !profileRes.data;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 pt-8 md:pt-24 pb-28 bg-slate-50 dark:bg-background font-sans transition-colors duration-300">
      <motion.div
        className="w-full max-w-4xl z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="rounded-xl bg-white dark:bg-card overflow-hidden border-0 ring-1 ring-slate-100 dark:ring-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/20">
          <CardHeader className="text-center space-y-2 pt-8">
            <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Scan Food</CardTitle>
            <CardDescription className="text-base font-medium text-slate-500 dark:text-slate-400">
              Upload a photo of your meal to track nutrition.
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-8">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 mt-4"
                >
                  <div className="border-2 border-dashed border-slate-200 dark:border-border rounded-xl p-8 text-center relative hover:bg-slate-50 dark:hover:bg-muted/30 transition-colors group">
                    {preview ? (
                      <div className="space-y-4">
                        <img
                          src={preview}
                          alt="Preview"
                          className="mx-auto max-h-72 w-full rounded-xl object-contain bg-slate-100/50 dark:bg-slate-900/50 shadow-sm"
                        />
                        <Button
                          variant="outline"
                          className="rounded-xl h-12 px-6 font-semibold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                          onClick={() => {
                            setFile(null);
                            setPreview(null);
                          }}
                        >
                          Change Photo
                        </Button>
                      </div>
                    ) : (
                      <>
                        {/* Mobile View: Camera or Upload */}
                        <div className="md:hidden space-y-4 py-8 relative">
                          {!hasPermission ? (
                            <div className="flex flex-col items-center gap-4 z-20 relative">
                              <div className="flex justify-center gap-4 text-slate-400 bg-slate-100 dark:bg-slate-800 w-24 h-24 mx-auto rounded-full items-center">
                                <Camera size={40} />
                              </div>
                              <p className="text-slate-500 dark:text-muted-foreground font-medium">
                                Camera access is required to take photos
                              </p>
                              <Button onClick={requestPermission} variant="outline" className="rounded-xl font-semibold">
                                Allow Camera
                              </Button>
                            </div>
                          ) : (
                            <>
                              <div className="flex justify-center gap-4 text-primary bg-primary/10 w-24 h-24 mx-auto rounded-full items-center">
                                <Camera size={40} />
                              </div>
                              <p className="text-slate-500 dark:text-muted-foreground font-medium">
                                Click to take photo or upload
                              </p>
                              <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                            </>
                          )}
                        </div>

                        {/* Desktop View: Upload Only */}
                        <div className="hidden md:block space-y-4 py-8 relative">
                          <div className="flex justify-center gap-4 text-primary bg-primary/10 w-24 h-24 mx-auto rounded-full items-center">
                            <Upload size={40} />
                          </div>
                          <p className="text-slate-500 dark:text-muted-foreground font-medium">
                            Click to upload food photo
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <Button
                    onClick={handleScan}
                    disabled={!file || loading || isProfileIncomplete}
                    className="w-full rounded-xl h-14 font-bold text-lg shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : isProfileIncomplete ? (
                      'Please Complete Profile First'
                    ) : (
                      'Analyze Nutrition'
                    )}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 mt-4"
                >
                  <div className="bg-primary/10 border-0 ring-1 ring-primary/20 rounded-xl p-6 text-center shadow-lg shadow-primary/10">
                    <h3 className="font-bold text-primary text-xl mb-1">Scan Successful!</h3>
                    <p className="font-medium text-lg text-primary/80">{result.meal_name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-muted p-5 rounded-xl text-center border border-slate-100 dark:border-border/50">
                      <p className="text-sm font-semibold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                        Calories
                      </p>
                      <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{result.meal_nutrition.calories}</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-xl text-center border border-orange-100 dark:border-orange-900/30">
                      <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                        Protein
                      </p>
                      <p className="text-3xl font-extrabold text-orange-600 dark:text-orange-500 mt-1">
                        {result.meal_nutrition.protein}g
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl text-center border border-blue-100 dark:border-blue-900/30">
                      <p className="text-sm font-semibold text-blue-500 uppercase tracking-wider">
                        Carbs
                      </p>
                      <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-500 mt-1">
                        {result.meal_nutrition.carbs}g
                      </p>
                    </div>
                    <div className="bg-pink-50 dark:bg-pink-900/20 p-5 rounded-xl text-center border border-pink-100 dark:border-pink-900/30">
                      <p className="text-sm font-semibold text-pink-500 uppercase tracking-wider">
                        Fat
                      </p>
                      <p className="text-3xl font-extrabold text-pink-600 dark:text-pink-500 mt-1">
                        {result.meal_nutrition.fat}g
                      </p>
                    </div>
                  </div>

                  {result.advice && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-5 mt-4 text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                        <p className="text-sm font-semibold text-amber-600 dark:text-amber-500 uppercase tracking-wider">AI Recommendation</p>
                        <div className="flex items-center gap-2">
                          <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-lg border border-amber-200 dark:border-amber-900/50 shadow-sm px-2">
                            <Languages size={14} className="text-amber-500 mr-2" />
                            <select
                              className="h-8 text-xs bg-transparent text-slate-700 dark:text-slate-200 outline-none focus:ring-0 max-w-[140px] md:max-w-[180px] cursor-pointer"
                              value={targetLang}
                              onChange={(e) => setTargetLang(e.target.value)}
                              disabled={isTranslating}
                            >
                              {LANGUAGES.map((l) => (
                                <option key={l.code} value={l.code}>
                                  {l.name}
                                </option>
                              ))}
                            </select>
                            {isTranslating && <Loader2 size={12} className="animate-spin text-amber-500 ml-2" />}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-amber-900 dark:text-amber-100 text-sm md:text-base leading-relaxed space-y-2 prose-p:mt-0 prose-p:mb-2 prose-strong:font-bold prose-strong:text-amber-700 dark:prose-strong:text-amber-300 transition-opacity duration-300 ${isTranslating ? 'opacity-50' : 'opacity-100'}`}
                        dangerouslySetInnerHTML={{
                          __html: translatedAdvice
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                            .replace(/\n\n/g, '<br/><br/>')
                            .replace(/\n- /g, '<br/>• ')
                            .replace(/\n\* /g, '<br/>• ')
                            .replace(/\n/g, '<br/>')
                        }}
                      />
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl h-14 font-semibold text-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      onClick={() => {
                        setFile(null);
                        setPreview(null);
                        setResult(null);
                      }}
                    >
                      Scan Another
                    </Button>
                    <Button
                      className="flex-1 rounded-xl h-14 font-bold text-lg shadow-md flex items-center justify-center gap-2"
                      onClick={() => router.push('/dashboard')}
                    >
                      Dashboard <ArrowRight size={20} />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
}
