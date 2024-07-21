import type { IWaiter } from "@interfaces/IWaiter";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import type { FC } from "react";
import { EditWaiterForm } from ".";

interface Props {
	isOpen: boolean;
	onOpenChange: () => void;
	waiter: IWaiter;
}

const EditWaiterModal: FC<Props> = ({ isOpen, onOpenChange, waiter }) => {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Editar mesero
						</ModalHeader>
						<ModalBody>
							<EditWaiterForm onClose={onClose} waiter={waiter} />
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default EditWaiterModal;
