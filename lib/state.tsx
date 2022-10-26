import { atom } from 'jotai'
import create from 'zustand'

export const commandbarStatusAtom = atom(true)

export const useStore = create<UseStore>((set) => ({
    sidebarOpen: true,
    toggle: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    closeSidebar: () => set({ sidebarOpen: false }),
    openSidebar: () => set({ sidebarOpen: true }),
}))
export interface UseStore {
    sidebarOpen: boolean
    toggle: () => void
    closeSidebar: () => void
    openSidebar: () => void
}
