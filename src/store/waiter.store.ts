// store/waiter.store.ts
import type { IWaiter, IWaiterForm, IWaiterState } from "@interfaces/IWaiter";
import api from "@utils/api";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useWaiterStore = create<IWaiterState>()(
  devtools(
    (set) => ({
      waiters: [],
      totalPages: 1,
      currentPage: 1,
      loading: false,
      getWaiters: async () => {
        set({ loading: true });
        try {
          const { data } = await api.get("/meseros/search?page=1&size=10");
          set({
            waiters: data.users,
            totalPages: data.totalPages,
            currentPage: data.currentPage,
            loading: false
          });
        } catch (error) {
          console.error("Error fetching waiters:", error);
          set({ loading: false });
        }
      },
      createWaiter: async (waiter: IWaiterForm) => {
        try {
          const { data } = await api.post("/meseros", waiter);
          set((state) => ({
            waiters: [...state.waiters, data],
          }));
        } catch (error) {
          console.error("Error creating waiter:", error);
        }
      },
      updateWaiter: async (waiter: IWaiter) => {
        try {
          await api.put(`/meseros/${waiter._id}`, waiter);
          set((state) => ({
            waiters: state.waiters.map((w) => (w._id === waiter._id ? waiter : w)),
          }));
        } catch (error) {
          console.error("Error updating waiter:", error);
        }
      },
      disableWaiter: async (waiterToDelete: IWaiter) => {
        try {
          await api.patch(`/meseros/disabledwaiter/${waiterToDelete._id}`);
          set((state) => ({
            waiters: state.waiters.filter((waiter) => waiter._id !== waiterToDelete._id),
          }));
        } catch (error) {
          console.error("Error deleting waiter:", error);
        }
      },
    }),
    { anonymousActionType: "waiter" }
  )
);
