import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export async function getWeeklyReport(days: number = 7) {
  const res = await fetch(`/api/report?days=${days}`);
  return res.json();
}

export function useWeeklyReport(days: number = 7, options?: Partial<UseQueryOptions<any, Error>>) {
  return useQuery({
    queryKey: ['weeklyReport', days],
    queryFn: () => getWeeklyReport(days),
    ...options,
  });
}
