import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ScanPage from '@/app/scan/page'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/scan',
}))

vi.mock('@/hooks/useCameraPermission', () => ({
  useCameraPermission: () => ({ hasPermission: true, requestPermission: vi.fn() }),
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: { success: true, data: { current_weight: 70, target_weight: 65, goal: 'Lose Weight' } }, isLoading: false }),
  useMutation: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
}))

describe('Food Scan Module', () => {
  it('renders Food Scan page correctly', () => {
    render(<ScanPage />)
    expect(document.body.textContent).toContain('Scan Food')
  })
})
