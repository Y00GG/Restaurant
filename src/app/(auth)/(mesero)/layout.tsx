import { MainNavbar } from "@components/common";

export default function RootLayout({
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
