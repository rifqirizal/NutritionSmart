import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export async function getDashboardData() {
  const res = await fetch('/api/dashboard');
  return res.json();
}

export function useDashboardData(options?: Partial<UseQueryOptions<any, Error>>) {
  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: getDashboardData,
    ...options,
  });
}
