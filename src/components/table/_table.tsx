interface ITableProps extends React.HTMLAttributes<HTMLDivElement> {
  head: any[];
  body: any[][];
}
export const Table = ({ head, body, className, ...props }: ITableProps) => {
  return (
    <div className={`overflow-x-auto relative ${className}`} {...props}>
      <table className="my-table w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {head.map((entry, i) => (
              <th key={"head#" + i + entry} scope="col" className="py-3 px-6">
                {entry}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr
              id={"table-row" + (i + 1)}
              key={"row#" + i + row[0]}
              className={`${
                (i + 1) % 2 === 0
                  ? "bg-gray-50 dark:bg-gray-800"
                  : "bg-white dark:bg-gray-900"
              } border-b dark:border-gray-70`}
            >
              {row.map((entry, j) =>
                j === 0 ? (
                  <th
                    key={"th#" + j + entry}
                    scope="row"
                    className={`py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white`}
                  >
                    {entry}
                  </th>
                ) : (
                  <td key={"td#" + j + entry} className={`py-4 px-6`}>
                    {entry}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
