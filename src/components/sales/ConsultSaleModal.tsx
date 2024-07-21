import type { ISale } from "@interfaces/ISale";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import type { FC } from "react";

interface Props {
	isOpen: boolean;
	onOpenChange: () => void;
	sale: ISale;
}

const CreateMenuModal: FC<Props> = ({ isOpen, onOpenChange, sale }) => {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Mas detalles
						</ModalHeader>
						<ModalBody>
							<p>Nombre: {sale.waiter}</p>
							<p>Fecha: {sale.date}</p>
							<p>Ventas totales: {sale.totalSales}</p>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CreateMenuModal;
