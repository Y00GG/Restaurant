"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ILoginForm } from "@interfaces/ILoginForm";
import { Button, Input, Spacer } from "@nextui-org/react";
import loginSchema from "@schemas/login.schema";
import { type SubmitHandler, useForm } from "react-hook-form";

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<ILoginForm> = (data) => {
		console.log(data);
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
					{...register("username")}
					isInvalid={Boolean(errors.username)}
					errorMessage={errors.username?.message}
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
			<Button type="submit" color="primary" fullWidth size="lg">
				Iniciar sesión
			</Button>
		</form>
	);
};

export default LoginForm;
