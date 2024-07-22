import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import type { FC } from "react";
import CreateOrderForm from "./CreateOrderForm";

interface Props {
	isOpen: boolean;
	onOpenChange: () => void;
}

const CreateOrderModal: FC<Props> = ({ isOpen, onOpenChange }) => {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Crear pedido
						</ModalHeader>
						<ModalBody>
							<CreateOrderForm onClose={onClose} />
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CreateOrderModal;
