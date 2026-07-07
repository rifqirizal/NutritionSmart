import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ScanPage from '@/app/scan/page'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/scan',
}))

vi.mock('@/hooks/useCameraPermission', () => ({
  useCameraPermission: () => ({ hasPermission: true, requestPermission: vi.fn() }),
}))

describe('Food Scan Module', () => {
  it('renders Food Scan page correctly', () => {
    render(<ScanPage />)
    expect(document.body.textContent).toContain('Scan Food')
  })
})
