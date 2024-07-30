"use client";

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

const LogoutButton = () => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		<Button
			disableRipple
			endContent={<FaChevronDown />}
			radius="sm"
			variant="light"
		>
			Cargando...
		</Button>;
	}

	const handleLogout = () => {
		signOut();
	};

	return (
		<Dropdown placement="bottom-start">
			<DropdownTrigger>
				<Button
					disableRipple
					endContent={<FaChevronDown />}
					radius="sm"
					variant="light"
				>
					{session?.user?.name ?? ""}
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="User Actions" variant="flat">
				<DropdownItem key="logout" color="danger" onClick={handleLogout}>
					Cerrar sesión
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default LogoutButton;
