'use client'
import { create } from 'zustand'

interface AppStore {
  sidebarCollapsed: boolean
  mobileNavOpen: boolean
  commandPaletteOpen: boolean
  subscriptionView: 'grid' | 'list'

  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void
  setMobileNavOpen: (v: boolean) => void
  setCommandPaletteOpen: (v: boolean) => void
  setSubscriptionView: (v: 'grid' | 'list') => void
}

export const useAppStore = create<AppStore>((set) => ({
  sidebarCollapsed: false,
  mobileNavOpen: false,
  commandPaletteOpen: false,
  subscriptionView: 'grid',

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  setMobileNavOpen: (v) => set({ mobileNavOpen: v }),
  setCommandPaletteOpen: (v) => set({ commandPaletteOpen: v }),
  setSubscriptionView: (v) => set({ subscriptionView: v }),
}))
