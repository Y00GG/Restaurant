import { z } from "zod";

const waiterSchema = z.object({
    nombre: z.string().min(1, "Este campo es obligatorio."),
    apellido: z.string().min(1, "Este campo es obligatorio."),
    email: z.string().email("Debe ser un correo electrónico válido."),
    telefono: z.string().min(1, "Este campo es obligatorio."),
    numeroIdentidad: z.string().min(1, "Este campo es obligatorio."),
    password: z.string().min(1, "Este campo es obligatorio."),
});

export default waiterSchema;
