import { useMutation, useQueryClient } from '@tanstack/react-query';

export async function scanFoodImage(formData: FormData) {
  const res = await fetch('/api/scan', {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

export function useScanFood() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: scanFoodImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });
}
