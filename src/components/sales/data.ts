import type {
	IMostSoldDishes,
	ISale,
	ITotalSalesByDishes,
} from "@interfaces/ISale";

const sales: ISale[] = [
	{
		id: 1,
		date: "2023-06-15",
		waiter: "Tony Reichert",
		totalSales: 1500,
	},
	{
		id: 2,
		date: "2023-06-16",
		waiter: "Zoey Lang",
		totalSales: 1250,
	},
	{
		id: 3,
		date: "2023-06-17",
		waiter: "Jane Fisher",
		totalSales: 1800,
	},
	{
		id: 4,
		date: "2023-06-18",
		waiter: "William Howard",
		totalSales: 1750,
	},
	{
		id: 5,
		date: "2023-06-19",
		waiter: "Kristen Copper",
		totalSales: 1600,
	},
	{
		id: 6,
		date: "2023-06-20",
		waiter: "Brian Kim",
		totalSales: 1550,
	},
	{
		id: 7,
		date: "2023-06-21",
		waiter: "Michael Hunt",
		totalSales: 1700,
	},
	{
		id: 8,
		date: "2023-06-22",
		waiter: "Samantha Brooks",
		totalSales: 1650,
	},
	{
		id: 9,
		date: "2023-06-23",
		waiter: "Frank Harrison",
		totalSales: 1900,
	},
	{
		id: 10,
		date: "2023-06-24",
		waiter: "Emma Adams",
		totalSales: 2000,
	},
];

const mostSoldDishes: IMostSoldDishes[] = [
	{ id: 1, name: "Plato 1", sales: 568 },
	{ id: 2, name: "Plato 2", sales: 568 },
];

const totalSalesByDish: ITotalSalesByDishes[] = [
	{ id: 1, name: "Plato 1", sales: 568 },
	{ id: 2, name: "Plato 2", sales: 468 },
	{ id: 3, name: "Plato 3", sales: 468 },
	{ id: 4, name: "Plato 4", sales: 468 },
];

export { sales, mostSoldDishes, totalSalesByDish };
