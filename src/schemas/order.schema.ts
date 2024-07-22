import { z } from "zod";

const orderSchema = z.object({
	dishes: z.string().min(1, "Este campo es obligatorio."),
	quantity: z.string().min(1, "Este campo es obligatorio."),
});

export default orderSchema;
