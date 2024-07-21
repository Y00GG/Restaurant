import { z } from "zod";

const loginSchema = z.object({
	username: z
		.string()
		.min(1, "Este campo es obligatorio.")
		.email("Debe ser un correo electrónico válido"),
	password: z
		.string()
		.min(1, "Este campo es obligatorio.")
		.min(8, "La contraseña debe tener al menos 6 caracteres"),
});

export default loginSchema;
