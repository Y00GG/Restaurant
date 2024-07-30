"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ILoginForm } from "@interfaces/ILoginForm";
import { Button, Input, Spacer } from "@nextui-org/react";
import loginSchema from "@schemas/login.schema";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);

	const notify = (message: string, status: "success" | "error") => {
		toast(message, {
			type: status,
			position: "top-center",
		});
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
		setIsLoading(true);
		const result = await signIn("credentials", {
			redirect: false,
			email: data.email,
			password: data.password,
		});

		setIsLoading(false);

		if (result?.error) {
			notify("Usuario y/o contraseña incorrectos.", "error");
		} else {
			window.location.href = "/meseros";
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
			<div>
				<Input
					size="lg"
					labelPlacement="outside"
					label="Usuario"
					id="username"
					type="email"
					{...register("email")}
					isInvalid={Boolean(errors.email)}
					errorMessage={errors.email?.message}
				/>
			</div>
			<div>
				<Input
					size="lg"
					labelPlacement="outside"
					label="Contraseña"
					id="password"
					type="password"
					{...register("password")}
					isInvalid={Boolean(errors.password)}
					errorMessage={errors.password?.message}
				/>
			</div>
			<Spacer y={1} />
			<Button
				type="submit"
				color="primary"
				fullWidth
				size="lg"
				isLoading={isLoading}
			>
				Iniciar sesión
			</Button>
			<ToastContainer />
		</form>
	);
};

export default LoginForm;
