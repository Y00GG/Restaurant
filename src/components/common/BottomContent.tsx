import { Button, Pagination } from "@nextui-org/react";

interface BottomContentProps {
	enableSelection?: boolean;
	selectedKeys: "all" | Set<React.Key>;
	filteredItemsLength: number;
	page: number;
	pages: number;
	handlePageChange: (newPage: number) => void;
}

const BottomContent: React.FC<BottomContentProps> = ({
	enableSelection,
	selectedKeys,
	filteredItemsLength,
	page,
	pages,
	handlePageChange,
}) => {
	return (
		<div className="py-2 px-2 flex justify-between items-center">
			{enableSelection && (
				<span className="w-[30%] text-small text-default-400">
					{selectedKeys === "all"
						? "Todos los elementos seleccionados."
						: `${selectedKeys.size} de ${filteredItemsLength} seleccionados.`}
				</span>
			)}
			<Pagination
				isCompact
				showControls
				showShadow
				color="primary"
				page={page}
				total={pages}
				onChange={handlePageChange}
			/>
			<div className="hidden sm:flex w-[30%] justify-end gap-2">
				<Button
					isDisabled={page === 1}
					size="sm"
					variant="flat"
					onPress={() => handlePageChange(page - 1)}
				>
					Anterior
				</Button>
				<Button
					isDisabled={page === pages}
					size="sm"
					variant="flat"
					onPress={() => handlePageChange(page + 1)}
				>
					Siguiente
				</Button>
			</div>
		</div>
	);
};

export default BottomContent;
