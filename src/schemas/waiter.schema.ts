import { z } from "zod";

const waiterSchema = z.object({
	name: z.string().min(1, "First Name is required"),
	lastName: z.string().min(1, "Last Name is required"),
	cc: z.string().min(1, "ID Number is required"),
	phone: z.string().min(1, "Phone is required"),
	username: z.string().min(1, "Username is required"),
	password: z.string().min(1, "Password is required"),
});

export default waiterSchema;
