import { MainNavbar } from "@components/common";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<MainNavbar />
			{children}
		</>
	);
}
