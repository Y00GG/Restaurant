import type { IMenu } from "@interfaces/IMenu";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import type { FC } from "react";
import EditMenuForm from "./EditMenuForm";

interface Props {
	isOpen: boolean;
	onOpenChange: () => void;
	menu: IMenu;
}

const EditMenuModal: FC<Props> = ({ isOpen, onOpenChange, menu }) => {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Editar mesero
						</ModalHeader>
						<ModalBody>
							<EditMenuForm onClose={onClose} menu={menu} />
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default EditMenuModal;
