"use client";
import { LogoutButton } from "@components/menu";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";

type MenuItem = {
	title: string;
	url: string;
};

const menuItems: MenuItem[] = [
	{ title: "Meseros", url: "/meseros" },
	{ title: "menu", url: "/menu" },
	{ title: "ventas", url: "/ventas" },
];

const MainNavbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const currentPath = usePathname();

	return (
		<Navbar
			isBordered
			isBlurred
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			maxWidth="full"
			classNames={{
				item: [
					"flex",
					"relative",
					"h-full",
					"items-center",
					"data-[active=true]:after:content-['']",
					"data-[active=true]:after:absolute",
					"data-[active=true]:after:bottom-4",
					"data-[active=true]:after:left-0",
					"data-[active=true]:after:right-0",
					"data-[active=true]:after:h-[2px]",
					"data-[active=true]:after:rounded-[2px]",
					"data-[active=true]:after:bg-primary",
				],
				menuItem: [
					"flex",
					"relative",
					"pb-4",
					"items-center",
					"data-[active=true]:after:content-['']",
					"data-[active=true]:after:absolute",
					"data-[active=true]:after:bottom-2",
					"data-[active=true]:after:left-0",
					"data-[active=true]:after:right-0",
					"data-[active=true]:after:h-[2px]",
					"data-[active=true]:after:rounded-[2px]",
					"data-[active=true]:after:bg-primary",
				],
			}}
		>
			<NavbarContent justify="center">
				<NavbarBrand className="gap-1 flex items-end">
					<IoFastFoodOutline size={"2em"} />
					<h1 className={"text-foreground text-2xl"}>Restaurant</h1>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent justify="end" className="hidden md:flex uppercase">
				{menuItems.map((item, index) => (
					<NavbarItem
						key={`${item.title}-${index}`}
						isActive={item.url === currentPath}
					>
						<Link href={item.url} className=" text-foreground">
							{item.title}
						</Link>
					</NavbarItem>
				))}
				<NavbarItem>
					<LogoutButton />
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="md:hidden" justify="end">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="text-primary"
				/>
			</NavbarContent>

			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem
						key={`${item.title}-${index}`}
						isActive={item.url === currentPath}
					>
						<Link className="w-full text-foreground" href={item.url}>
							{item.title}
						</Link>
					</NavbarMenuItem>
				))}
				<NavbarMenuItem>
					<LogoutButton />
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
};

export default MainNavbar;
