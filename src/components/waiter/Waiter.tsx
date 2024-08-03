"use client";
import { BottomContent, DynamicTable, TopContent } from "@components/common";
import { CreateWaiterModal, EditWaiterModal } from "@components/waiter";
import type { IColumn } from "@interfaces/ITableState";
import type { IWaiter } from "@interfaces/IWaiter";
import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useWaiterStore } from "@store/waiter.store";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Waiter = () => {
    const { getWaiters, waiters, totalPages, disableWaiter } = useWaiterStore();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure();
    const { isOpen: isOpenCreate, onOpen: onOpenCreate, onOpenChange: onOpenChangeCreate } = useDisclosure();
    const { isOpen: isDeleteConfirmationOpen, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const [selectedWaiter, setSelectedWaiter] = useState<IWaiter | null>(null);
    const [filterValue, setFilterValue] = useState<string>("");
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [page, setPage] = useState<number>(1);
    const [waiterToDelete, setWaiterToDelete] = useState<IWaiter | null>(null);

    const totalMessage = `Total de ${waiters?.length ?? 0} registros`;

    const handleSearchChange = (value?: string) => {
        setFilterValue(value || "");
        setPage(1);
    };

    const handleClear = () => {
        setFilterValue("");
        setPage(1);
    };

    const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleDelete = async () => {
        if (waiterToDelete) {
            await disableWaiter(waiterToDelete);
            onOpenChangeDelete(); // Cierra el modal
            setWaiterToDelete(null);
            getWaiters(); // Opcional: volver a cargar la lista de meseros
        }
    };

    const columns: IColumn<IWaiter>[] = [
        { name: "NOMBRE", uid: "nombre", sortable: true },
        { name: "TELÉFONO", uid: "telefono", sortable: true },
        { name: "No IDENTIDAD", uid: "numeroIdentidad", sortable: true },
        {
            name: "ACCIONES",
            uid: "actions",
            renderCell: (item) => (
                <div className="flex justify-start items-center gap-2">
                    <Button
                        isIconOnly
                        color="secondary"
                        onClick={() => {
                            setSelectedWaiter(item);
                            onOpenEdit();
                        }}
                    >
                        <FaEdit />
                    </Button>
                    <Button
                        isIconOnly
                        color="danger"
                        onClick={() => {
                            setWaiterToDelete(item);
                            onOpenDelete();
                        }}
                    >
                        <MdDelete />
                    </Button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        getWaiters(); // Llama a la API al montar el componente
    }, [getWaiters]);

    return (
        <div className="flex justify-center items-center">
            <div className="container px-8 md:px-0 py-8 flex flex-col gap-3">
                <p className="text-4xl font-bold text-success">Lista de meseros</p>
                <DynamicTable
                    rows={waiters}
                    columns={columns}
                    filterValue={filterValue}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    topContent={
                        <TopContent
                            filterValue={filterValue}
                            onSearchChange={handleSearchChange}
                            onClear={handleClear}
                            totalMessage={totalMessage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onOpenCreate={onOpenCreate}
                        />
                    }
                    bottomContent={
                        <BottomContent
                            selectedKeys={new Set()}
                            filteredItemsLength={waiters ? waiters.length : 0}
                            page={page}
                            pages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    }
                />
                <CreateWaiterModal
                    isOpen={isOpenCreate}
                    onOpenChange={onOpenChangeCreate}
                />
                {selectedWaiter && (
                    <EditWaiterModal
                        isOpen={isOpenEdit}
                        onOpenChange={onOpenChangeEdit}
                        waiter={selectedWaiter}
                    />
                )}
                <Modal
                    closeButton
                    aria-labelledby="modal-title"
                    isOpen={isDeleteConfirmationOpen}
                    onOpenChange={onOpenChangeDelete}
                >
                    <ModalContent>
                        <ModalHeader>
                            Confirmación de Eliminación
                        </ModalHeader>
                        <ModalBody>
                            ¿Estás seguro de que deseas deshabilitar este mesero?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onPress={handleDelete}>
                                Confirmar
                            </Button>
                            <Button onPress={onOpenChangeDelete}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
};

export default Waiter;
