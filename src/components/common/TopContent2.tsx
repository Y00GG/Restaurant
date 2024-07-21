import type { DateValue } from "@internationalized/date";
import { DateRangePicker, Input } from "@nextui-org/react";
import type React from "react";
import { FaSearch } from "react-icons/fa";

interface TopContentProps {
	filterValue: string;
	onSearchChange: (value?: string) => void;
	onClear: () => void;
	totalMessage: string;
	rowsPerPage: number;
	onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	startDate: DateValue;
	endDate: DateValue;
	onDateRangeChange: (range: {
		startDate: DateValue;
		endDate: DateValue;
	}) => void;
}

const TopContent2: React.FC<TopContentProps> = ({
	filterValue,
	onSearchChange,
	onClear,
	totalMessage,
	rowsPerPage,
	onRowsPerPageChange,
	startDate,
	endDate,
	onDateRangeChange,
}) => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between gap-3 items-end">
				<Input
					isClearable
					className="w-full sm:max-w-[44%]"
					placeholder="Buscar..."
					startContent={<FaSearch />}
					value={filterValue}
					onClear={onClear}
					onValueChange={onSearchChange}
				/>
				<div className="flex gap-3">
					<DateRangePicker
						value={{ start: startDate, end: endDate }}
						onChange={(range) =>
							onDateRangeChange({ startDate: range.start, endDate: range.end })
						}
					/>
				</div>
			</div>
			<div className="flex justify-between items-center">
				<span className="text-default-400 text-small">{totalMessage}</span>
				<label className="flex items-center text-default-400 text-small">
					Filas por página:
					<select
						className="bg-transparent outline-none text-default-400 text-small ml-2"
						onChange={onRowsPerPageChange}
						value={rowsPerPage}
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
					</select>
				</label>
			</div>
		</div>
	);
};

export default TopContent2;
