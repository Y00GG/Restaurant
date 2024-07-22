import { z } from "zod";

const waiterSchema = z.object({
	name: z.string().min(1, "Este campo es obligatorio."),
	lastName: z.string().min(1, "Este campo es obligatorio."),
	cc: z.string().min(1, "Este campo es obligatorio."),
	phone: z.string().min(1, "Este campo es obligatorio."),
	username: z.string().min(1, "Este campo es obligatorio."),
	password: z.string().min(1, "ç"),
});

export default waiterSchema;
