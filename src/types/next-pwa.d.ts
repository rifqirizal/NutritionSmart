declare module 'next-pwa' {
  import { NextConfig } from 'next';
  export default function withPWAInit(config: {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    [key: string]: unknown;
  }): (nextConfig: NextConfig) => NextConfig;
}
