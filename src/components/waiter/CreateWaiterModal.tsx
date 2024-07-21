import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import type { FC } from "react";
import { CreateWaiterForm } from ".";

interface Props {
	isOpen: boolean;
	onOpenChange: () => void;
}

const CreateWaiterModal: FC<Props> = ({ isOpen, onOpenChange }) => {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Crear mesero
						</ModalHeader>
						<ModalBody>
							<CreateWaiterForm onClose={onClose} />
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CreateWaiterModal;
