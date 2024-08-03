import type { IMenu, IMenuForm, IMenuState } from "@interfaces/IMenu";
import api from "@utils/api";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useMenuStore = create<IMenuState>()(
  devtools(
    (set) => ({
      menuItems: [],
      totalPages: 1,
      currentPage: 1,
      loading: false,
      getMenuItems: async () => {
        set({ loading: true });
        try {
          const { data } = await api.get("/menu/search?page=1&size=10");
          set({
            menuItems: data.menuItems,
            totalPages: data.totalPages,
            currentPage: data.currentPage,
            loading: false
          });
        } catch (error) {
          console.error("Error fetching menu items:", error);
          set({ loading: false });
        }
      },
      createMenu: async (menu: IMenuForm) => {
        try {
          const { data } = await api.post("/menu", menu);
          set((state) => ({
            menuItems: [...state.menuItems, data],
          }));
        } catch (error) {
          console.error("Error creating menu item:", error);
        }
      },
      updateMenu: async (menu: IMenu) => {
        try {
          await api.put(`/menu/${menu._id}`, menu);
          set((state) => ({
            menuItems: state.menuItems.map((m) => (m._id === menu._id ? menu : m)),
          }));
        } catch (error) {
          console.error("Error updating menu item:", error);
        }
      },
      disableMenu: async (menuToDelete: IMenu) => {
        try {
          await api.patch(`/menu/disabledmenu/${menuToDelete._id}`);
          set((state) => ({
            menuItems: state.menuItems.filter((menu) => menu._id !== menuToDelete._id),
          }));
        } catch (error) {
          console.error("Error disabling menu item:", error);
        }
      },
    }),
    { anonymousActionType: "menu" }
  )
);
