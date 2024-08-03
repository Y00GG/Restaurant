import { zodResolver } from "@hookform/resolvers/zod";
import type { IMenuForm } from "@interfaces/IMenu";
import { Button, Input, Spacer } from "@nextui-org/react";
import menuSchema from "@schemas/menu.schema";
import type { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMenuStore } from "@store/menu.store";

interface Props {
  onClose: () => void;
}

const CreateMenuForm: FC<Props> = ({ onClose }) => {
  const { createMenu } = useMenuStore();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMenuForm>({
    resolver: zodResolver(menuSchema),
  });

  const onSubmit = async (data: IMenuForm) => {
    try {
      // Convertir precio a número
      const menuData: IMenuForm = {
        ...data,
        precio: Number(data.precio), // Convierte precio a número
      };

      await createMenu(menuData);
      onClose();
    } catch (error) {
      console.error("Error creating menu:", error);
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
      <div>
        <label>Ingredientes (separados por comas)</label>
        <Controller
          name="ingredientes"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value.join(", ")} // Convierte el array a una cadena separada por comas para mostrar
              onChange={(e) => {
                const ingredientesArray = e.target.value
                  .split(",")
                  .map((ingrediente) => ingrediente.trim());
                onChange(ingredientesArray); // Convierte la cadena en un array
              }}
              isInvalid={Boolean(errors.ingredientes)}
              errorMessage={errors.ingredientes?.message}
              fullWidth
              placeholder="Escribe los ingredientes separados por comas"
            />
          )}
        />
      </div>
      <Controller
        name="precio"
        control={control}
        defaultValue={0}
        render={({ field: { onChange, value } }) => (
          <Input
            type="number"
            value={value.toString()} // Convierte el número a cadena para el Input
            onChange={(e) => {
              const numberValue = Number(e.target.value);
              onChange(numberValue); // Convierte la cadena a número
            }}
            isInvalid={Boolean(errors.precio)}
            errorMessage={errors.precio?.message}
            fullWidth
          />
        )}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="submit" color="success">
          Crear
        </Button>
        <Spacer x={0.5} />
        <Button type="button" color="danger" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default CreateMenuForm;
