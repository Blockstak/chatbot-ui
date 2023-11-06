import Pagination from "@ui/Pagination";

interface Props {
  rows?: TableRow[];
}

export default function DashboardFooter(props: Props) {
  return (
    <div className="bg-gray-50 shadow-lg rounded-br-lg rounded-bl-lg flex justify-between p-4 text-xs">
      <Pagination />
      <div>
        {props.rows && props.rows?.length > 0 ? (
          <span>
            Showing 1 to {props.rows?.length} of {props.rows?.length} results
          </span>
        ) : (
          <span>No results</span>
        )}
      </div>

      <div>
        <span>Rows per page</span>
      </div>
    </div>
  );
}
