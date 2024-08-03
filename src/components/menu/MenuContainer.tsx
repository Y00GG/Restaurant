"use client";
import { BottomContent, DynamicTable, TopContent } from "@components/common";
import { CreateMenuModal, EditMenuModal } from "@components/menu"; // Ajusta según la ubicación correcta
import type { IColumn } from "@interfaces/ITableState";
import type { IMenu } from "@interfaces/IMenu";
import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useMenuStore } from "@store/menu.store"; // Ajusta según la ubicación correcta
import { formatPrice } from "@utils/formatPrice";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MenuContainer = () => {
  const { getMenuItems, menuItems, totalPages, disableMenu } = useMenuStore(); // Obtén las funciones y datos del store
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure();
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onOpenChange: onOpenChangeCreate } = useDisclosure();
  const { isOpen: isDeleteConfirmationOpen, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
  const [selectedMenu, setSelectedMenu] = useState<IMenu | null>(null);
  const [filterValue, setFilterValue] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [menuToDelete, setMenuToDelete] = useState<IMenu | null>(null);

  const totalMessage = `Total de ${menuItems.length} registros`;

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
    if (menuToDelete) {
      await disableMenu(menuToDelete);
      onOpenChangeDelete(); // Cierra el modal
      setMenuToDelete(null);
      getMenuItems(); // Opcional: volver a cargar la lista de menús
    }
  };

  const columns: IColumn<IMenu>[] = [
    { name: "NOMBRE", uid: "nombre", sortable: true },
    { name: "INGREDIENTES", uid: "ingredientes", sortable: true },
    {
      name: "PRECIO",
      uid: "precio",
      sortable: true,
      renderCell: (item) => formatPrice(item.precio),
    },
    {
      name: "ACCIONES",
      uid: "actions",
      renderCell: (item) => (
        <div className="flex justify-start items-center gap-2">
          <Button
            isIconOnly
            color="secondary"
            onClick={() => {
              setSelectedMenu(item);
              onOpenEdit();
            }}
          >
            <FaEdit />
          </Button>
          <Button
            isIconOnly
            color="danger"
            onClick={() => {
              setMenuToDelete(item);
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
    getMenuItems(); // Llama a la API al montar el componente
  }, [getMenuItems]);

  return (
    <div className="flex justify-center items-center">
      <div className="container px-8 md:px-0 py-8 flex flex-col gap-3">
        <p className="text-4xl font-bold text-success">Menú del restaurante</p>
        <DynamicTable
          rows={menuItems}
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
              filteredItemsLength={menuItems.length}
              page={page}
              pages={totalPages}
              handlePageChange={handlePageChange}
            />
          }
        />
        <CreateMenuModal
          isOpen={isOpenCreate}
          onOpenChange={onOpenChangeCreate}
        />
        {selectedMenu && (
          <EditMenuModal
            isOpen={isOpenEdit}
            onOpenChange={onOpenChangeEdit}
            menu={selectedMenu}
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
              ¿Estás seguro de que deseas eliminar este menú?
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

export default MenuContainer;
