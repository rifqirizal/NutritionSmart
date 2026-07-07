import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DashboardPage from '@/app/dashboard/page'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/dashboard',
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: { success: true, data: [] }, isLoading: false, refetch: vi.fn() }),
}))

describe('Dashboard Module', () => {
  it('renders Dashboard page without crashing', () => {
    render(<DashboardPage />)
    expect(document.querySelector('.animate-pulse') || document.querySelector('h3')).toBeInTheDocument()
  })
})
