import { useMutation } from '@tanstack/react-query';

export async function scanFoodImage(formData: FormData) {
  const res = await fetch('/api/scan', {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

export function useScanFood() {
  return useMutation({
    mutationFn: scanFoodImage,
  });
}
