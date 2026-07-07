import { z } from 'zod';

export const profileSchema = z.object({
  birth_date: z.string().min(1, 'Birth date is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  height_cm: z.number().min(50).max(300),
  current_weight: z.number().min(20).max(500),
  target_weight: z.number().min(20).max(500),
  goal: z.enum(['Lose Weight', 'Maintain Weight', 'Gain Weight', 'Build Muscle']),
});

export type ProfileInput = z.infer<typeof profileSchema>;
