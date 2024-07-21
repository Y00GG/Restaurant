import type loginSchema from "@schemas/login.schema";
import type { z } from "zod";

export type ILoginForm = z.infer<typeof loginSchema>;
