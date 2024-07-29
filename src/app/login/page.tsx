import { LoginForm } from "@components/login";
import { IoFastFoodOutline } from "react-icons/io5";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-secondary-50 px-4 py-8">
			<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
				<div className="flex justify-center items-center flex-col mb-6">
					<h1 className="text-5xl font-bold tracking-tight text-success-500">
						Restaurante
					</h1>
					<IoFastFoodOutline size={"4em"} />
				</div>
				<LoginForm />
			</div>
		</main>
	);
}
