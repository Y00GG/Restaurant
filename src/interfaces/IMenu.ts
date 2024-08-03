import type menuSchema from "@schemas/menu.schema";
import type { z } from "zod";
import { IBaseItem } from "./ITableState";

// interfaces/IMenu.ts
export interface IMenu extends IBaseItem {
  _id: string;
  nombre: string;
  ingredientes: string[];
  precio: number;
  estado: 'Enabled' | 'Disabled';
  createdAt: string;
  updatedAt: string;
}

export interface IMenuState {
	menuItems: IMenu[];
	loading: boolean;
	totalPages: number;
	currentPage: number;
	getMenuItems: () => void;
	createMenu: (menu: IMenuForm) => Promise<void>;
	updateMenu: (menu: IMenu) => Promise<void>;
	disableMenu: (menuToDelete: IMenu) => Promise<void>;
  }
  

export interface IGetMenu {
  menuItems: IMenu[];
  totalPages: number;
  currentPage: number;
}

// @interfaces/IMenu.ts
// @interfaces/IMenu.ts
export interface IMenuForm {
  nombre: string;
  ingredientes: string[]; // Cambiado a string[] para reflejar el formato correcto
  precio: number;
}

