import { useQuery, useMutation, UseQueryOptions } from '@tanstack/react-query';
import { ProfileInput } from '@/validators/profile';

export async function getProfile() {
  const res = await fetch('/api/profile');
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
  return useMutation({
    mutationFn: updateProfile,
  });
}
