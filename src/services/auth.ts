import { useMutation } from '@tanstack/react-query';
import { LoginInput, RegisterInput } from '@/validators/auth';

export async function login(data: LoginInput) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}

export async function register(data: RegisterInput) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}

export async function logout() {
  const res = await fetch('/api/auth/logout', { method: 'POST' });
  return res.json();
}

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}
