"use client";

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
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

	return (
		<Dropdown placement="bottom-start">
			<DropdownTrigger>
				<Button
					disableRipple
					endContent={<FaChevronDown />}
					radius="sm"
					variant="light"
				>
					{session?.user?.name ?? "Julián Rincón"}
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="User Actions" variant="flat">
				<DropdownItem key="logout" color="danger" onClick={() => signOut()}>
					Cerrar sesión
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default LogoutButton;
