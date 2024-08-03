import { z } from "zod";

const menuSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  ingredientes: z.array(z.string()).min(1, "Debe tener al menos un ingrediente"),
  precio: z.number().positive("El precio debe ser un número positivo"),
});

export default menuSchema;
