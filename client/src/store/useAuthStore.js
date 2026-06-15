import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      setAuth: (user, token, role) => set({ user, token, role }),
      logout: () => set({ user: null, token: null, role: null }),
    }),
    {
      name: 'khetigadi-auth', // unique name
    }
  )
);

export default useAuthStore;
