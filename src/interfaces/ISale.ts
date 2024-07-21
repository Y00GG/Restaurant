export interface ISale {
	id: number;
	date: string;
	waiter: string;
	totalSales: number;
}

export interface IMostSoldDishes {
	id: number;
	name: string;
	sales: number;
}

export interface ITotalSalesByDishes {
	id: number;
	name: string;
	sales: number;
}
