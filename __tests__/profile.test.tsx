import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProfilePage from '@/app/profile/page'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/profile',
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: { success: true, data: null }, isLoading: false, refetch: vi.fn() }),
}))

describe('Profile Module', () => {
  it('renders Profile Setup form correctly', () => {
    render(<ProfilePage />)
    expect(document.querySelector('form') || document.querySelector('.animate-pulse')).toBeInTheDocument()
  })
})
