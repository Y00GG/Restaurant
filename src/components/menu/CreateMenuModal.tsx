import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import type { FC } from "react";
import CreateMenuForm from "./CreateMenuForm";

interface Props {
	isOpen: boolean;
	onOpenChange: () => void;
}

const CreateMenuModal: FC<Props> = ({ isOpen, onOpenChange }) => {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Añadir plato
						</ModalHeader>
						<ModalBody>
							<CreateMenuForm onClose={onClose} />
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CreateMenuModal;
