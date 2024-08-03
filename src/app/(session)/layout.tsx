import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authOptions);

	if(!session){
		//redirect('/login')
	}

	return <>{children}</>;
}
