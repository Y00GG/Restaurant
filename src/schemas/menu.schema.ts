import { z } from "zod";

const menuSchema = z.object({
	name: z.string().min(1, "Este campo es obligatorio."),
	ingredients: z.array(z.string()).min(1, "Este campo es obligatorio."),
	price: z.number(),
});

export default menuSchema;
