import { create } from "zustand";

export const useUser = create((set) => ({
    user: null,
    token: null,
    email: null,
    setUser: (user) => set({ user }),
    setToken: (token) => (set({ token })),
    setUserEmail: (email) => (set({ email }))
}));

export const API_URL = "https://wpcxnallhveaycgpgrde.supabase.co/rest/v1/";
export const API_KEY = "sb_publishable_FEAr9riQi4ISS40eN8kgrA_uy60_vk3";