import { zodResolver } from "@hookform/resolvers/zod";
import type { IMenu, IMenuForm } from "@interfaces/IMenu";
import { Button, Input, Spacer } from "@nextui-org/react";
import menuSchema from "@schemas/menu.schema";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useMenuStore } from "@store/menu.store"; // Import the store

interface Props {
  onClose: () => void;
  menu: IMenu;
}

const EditMenuForm: FC<Props> = ({ onClose, menu }) => {
  const { updateMenu } = useMenuStore(); // Get the update function from the store

  // Map the menu properties to IMenuForm
  const mapMenuToForm = (menu: IMenu): IMenuForm => ({
    nombre: menu.nombre,
    ingredientes: menu.ingredientes,
    precio: menu.precio,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMenuForm>({
    defaultValues: mapMenuToForm(menu),
    resolver: zodResolver(menuSchema),
  });

  const onSubmit = async (data: IMenuForm) => {
    try {
      await updateMenu({ ...menu, ...data }); // Update the menu with the new data
      onClose(); // Close the form on success
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Input
        label="Nombre"
        {...register("nombre")}
        isInvalid={Boolean(errors.nombre)}
        errorMessage={errors.nombre?.message}
        fullWidth
      />
      <Input
        label="Ingredientes"
        {...register("ingredientes")}
        isInvalid={Boolean(errors.ingredientes)}
        errorMessage={errors.ingredientes?.message}
        fullWidth
      />
      <Input
        label="Precio"
        type="number"
        {...register("precio")}
        isInvalid={Boolean(errors.precio)}
        errorMessage={errors.precio?.message}
        fullWidth
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="submit" color="success">
          Editar
        </Button>
        <Spacer x={0.5} />
        <Button type="button" color="danger" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default EditMenuForm;
