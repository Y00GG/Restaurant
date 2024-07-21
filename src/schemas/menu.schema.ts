import { z } from "zod";

const menuSchema = z.object({
	name: z.string().min(1, "Name is required"),
	ingredients: z.array(z.string()).min(1, "Ingredient is required"),
	price: z.number(),
});

export default menuSchema;
