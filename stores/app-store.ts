'use client'
import { create } from 'zustand'

interface AppStore {
  sidebarCollapsed: boolean
  commandPaletteOpen: boolean
  subscriptionView: 'grid' | 'list'

  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void
  setCommandPaletteOpen: (v: boolean) => void
  setSubscriptionView: (v: 'grid' | 'list') => void
}

export const useAppStore = create<AppStore>((set) => ({
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  subscriptionView: 'grid',

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  setCommandPaletteOpen: (v) => set({ commandPaletteOpen: v }),
  setSubscriptionView: (v) => set({ subscriptionView: v }),
}))
