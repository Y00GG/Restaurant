import type { IMenu } from "@interfaces/IMenu";

const menus: IMenu[] = [
	{
		id: 1,
		name: "Spaghetti Carbonara",
		ingredients: [
			"Spaghetti",
			"Eggs",
			"Parmesan Cheese",
			"Pancetta",
			"Black Pepper",
		],
		price: 129,
	},
	{
		id: 2,
		name: "Margherita Pizza",
		ingredients: ["Pizza Dough", "Tomato Sauce", "Mozzarella Cheese", "Basil"],
		price: 109,
	},
	{
		id: 3,
		name: "Caesar Salad",
		ingredients: [
			"Romaine Lettuce",
			"Croutons",
			"Parmesan Cheese",
			"Caesar Dressing",
		],
		price: 89,
	},
	{
		id: 4,
		name: "Grilled Chicken Sandwich",
		ingredients: [
			"Chicken Breast",
			"Lettuce",
			"Tomato",
			"Mayonnaise",
			"Brioche Bun",
		],
		price: 114,
	},
	{
		id: 5,
		name: "Beef Tacos",
		ingredients: [
			"Beef",
			"Taco Shells",
			"Lettuce",
			"Tomato",
			"Cheddar Cheese",
			"Sour Cream",
		],
		price: 99,
	},
	{
		id: 6,
		name: "Vegetable Stir Fry",
		ingredients: [
			"Broccoli",
			"Carrots",
			"Bell Peppers",
			"Soy Sauce",
			"Garlic",
			"Ginger",
		],
		price: 104,
	},
	{
		id: 7,
		name: "Cheeseburger",
		ingredients: [
			"Beef Patty",
			"Cheddar Cheese",
			"Lettuce",
			"Tomato",
			"Onion",
			"Pickles",
			"Burger Bun",
		],
		price: 124,
	},
	{
		id: 8,
		name: "Chicken Alfredo",
		ingredients: [
			"Fettuccine",
			"Chicken Breast",
			"Parmesan Cheese",
			"Cream",
			"Garlic",
		],
		price: 139,
	},
	{
		id: 9,
		name: "Shrimp Scampi",
		ingredients: [
			"Shrimp",
			"Garlic",
			"Lemon",
			"Butter",
			"White Wine",
			"Parsley",
		],
		price: 149,
	},
	{
		id: 10,
		name: "Chocolate Lava Cake",
		ingredients: ["Dark Chocolate", "Butter", "Sugar", "Eggs", "Flour"],
		price: 69,
	},
];

export { menus };
