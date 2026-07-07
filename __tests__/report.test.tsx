import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ReportPage from '@/app/report/page'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/report',
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: { success: true, data: [] }, isLoading: false, refetch: vi.fn() }),
  useMutation: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
}))

vi.mock('recharts', async () => {
  const OriginalModule = await vi.importActual('recharts')
  return {
    ...(OriginalModule as Record<string, unknown>),
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div style={{ width: '100%', height: 300 }}>{children}</div>
  }
})

describe('Reporting Module', () => {
  it('renders Report page without crashing', () => {
    render(<ReportPage />)
    expect(document.querySelector('.animate-pulse') || document.body.textContent).toBeTruthy()
  })
})
