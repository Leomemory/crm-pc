import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SessionState {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'accm-pc-session',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    },
  ),
)
