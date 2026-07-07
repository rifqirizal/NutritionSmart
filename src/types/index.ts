export interface DailySummary {
  date: string;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
}

export interface MealNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface ScanResult {
  meal_name: string;
  meal_nutrition: MealNutrition;
  advice?: string;
}

export interface ChartData extends DailySummary {
  name: string;
}
