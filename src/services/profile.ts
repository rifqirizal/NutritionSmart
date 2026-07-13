import { useQuery, useMutation, UseQueryOptions, useQueryClient } from '@tanstack/react-query';
import { ProfileInput } from '@/validators/profile';

export async function getProfile() {
  const res = await fetch('/api/profile', {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
  return res.json();
}

export function useProfileData(options?: Partial<UseQueryOptions<any, Error>>) {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    ...options,
  });
}

export async function updateProfile(data: ProfileInput) {
  const res = await fetch('/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });
}
