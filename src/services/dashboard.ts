import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export async function getDashboardData() {
  const res = await fetch('/api/dashboard');
  return res.json();
}

export function useDashboardData(options?: Partial<UseQueryOptions<any, Error>>) {
  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: getDashboardData,
    refetchInterval: 300000, // 5 minutes
    staleTime: 0, // Always fetch latest data when navigating to dashboard
    refetchOnMount: true,
    ...options,
  });
}
