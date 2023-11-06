import * as Checkbox from "@radix-ui/react-checkbox";
import DashboardFooter from "@ui/Footer/DashbaordFooter";
import { HiOutlinePencil, HiCheck } from "react-icons/hi";
import { RiStarFill, RiStarLine } from "react-icons/ri";

type TableHeader = {
  header: string;
  accessor: string;
  status?: {
    [key: string]: string | undefined;
  };
};

type TableProps = {
  rows?: TableRow[];
  important?: boolean;
  menu?: React.FC | any;
  noSelection?: boolean;
  selectedRows?: number[];
  headers?: TableHeader[];
  clearSelectedRows?: () => void;
  handleRowClick?: (id: string) => void;
  handleCheckbox?: (index: number) => void;
};

const Table = ({
  rows,
  headers,
  selectedRows,
  handleCheckbox,
  handleRowClick,
  menu: TableMenu,
  important = false,
  noSelection = false,
}: TableProps) => {
  return (
    <div className="block w-full overflow-x-auto bg-white rounded-lg">
      <table className="w-full">
        <thead className="bg-[#F4F9FF]">
          <tr>
            {!noSelection && (
              <th className="border-t border-b text-gray-500 text-xs px-4 py-6 text-left"></th>
            )}

            {important && (
              <th className="border-t border-b text-gray-500 text-xs px-4 py-6 text-left"></th>
            )}

            {headers?.map((header, index) => (
              <th
                key={index}
                className={
                  "uppercase border-t border-b text-gray-500 text-xs px-4 py-6 text-left"
                }
              >
                {header.header}
              </th>
            ))}
            <th
              className={
                "border-t border-b text-gray-500 text-xs px-4 py-6 text-left"
              }
            >
              <HiOutlinePencil />
            </th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, index) => {
            const isChecked = selectedRows?.includes(row.id);
            return (
              <tr
                key={index}
                className={`${
                  isChecked
                    ? "bg-[#ECF5FF] hover:bg-[#ECF5FF]"
                    : "hover:bg-gray-50"
                } border-t border-b border-gray-100`}
              >
                {!noSelection && (
                  <td className="border-t border-b text-xs p-4">
                    <Checkbox.Root
                      className="flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-daisy-bush-400 outline-none data-[state=unchecked]:border border-gray-300"
                      id={index.toString()}
                      checked={isChecked}
                      onCheckedChange={() => {
                        handleCheckbox?.(row.id);
                      }}
                    >
                      <Checkbox.Indicator className="text-white">
                        <HiCheck />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </td>
                )}

                {important && (
                  <td className="border-t border-b text-xs p-4">
                    <Checkbox.Root
                      className="flex h-4 w-4 appearance-none items-center justify-center rounded outline-none"
                      checked={isChecked}
                      id={index.toString()}
                      onCheckedChange={() => handleCheckbox?.(row.id)}
                    >
                      <RiStarLine className="text-gray-300 w-4 h-4" />

                      <Checkbox.Indicator className="text-white">
                        {isChecked && (
                          <RiStarFill className="text-drio-red w-4 h-4" />
                        )}
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </td>
                )}

                {headers?.map((header, index) => (
                  <td
                    key={index}
                    onClick={() => handleRowClick?.(row.id)}
                    className={
                      "cursor-pointer border-t border-b text-gray-500 text-xs p-4 text-left "
                    }
                  >
                    <span
                      className={`${
                        header?.status?.[row[header.accessor]]
                      } inline-block capitalize`}
                    >
                      {row[header.accessor] ?? "NA"}
                    </span>
                  </td>
                ))}

                <td
                  className={
                    "border-t border-b text-gray-500 text-xs p-4 text-left"
                  }
                >
                  {TableMenu && <TableMenu row={row} />}
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={headers?.length && headers?.length + 2}>
              <DashboardFooter rows={rows} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
