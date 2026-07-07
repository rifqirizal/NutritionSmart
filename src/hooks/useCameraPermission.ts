import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

export function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const checkPermission = useCallback(async () => {
    try {
      if (!navigator.permissions) return;
      const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
      if (result.state === 'granted') {
        setHasPermission(true);
      } else if (result.state === 'denied') {
        setHasPermission(false);
      }
      
      result.onchange = () => {
        setHasPermission(result.state === 'granted');
      };
    } catch (err) {
      console.warn("Could not query camera permission:", err);
    }
  }, []);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  const requestPermission = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error("Kamera tidak didukung pada browser ini atau koneksi tidak aman (HTTPS diperlukan).");
        setHasPermission(false);
        return false;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setHasPermission(true);
      return true;
    } catch (err) {
      console.error("Camera permission denied:", err);
      toast.error("Akses kamera ditolak.");
      setHasPermission(false);
      return false;
    }
  }, []);

  return { hasPermission, requestPermission };
}
