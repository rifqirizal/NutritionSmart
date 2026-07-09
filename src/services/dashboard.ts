import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export async function getDashboardData() {
  const res = await fetch('/api/dashboard', {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
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
