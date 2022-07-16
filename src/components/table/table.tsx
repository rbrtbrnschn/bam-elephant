interface IMyTableProps extends React.HTMLAttributes<HTMLDivElement> {
  head: string[];
  body: string[][];
}
export const MyTable = ({ head, body, ...props }: IMyTableProps) => {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {head.map((entry, i) => (
              <th key={"head#" + i} scope="col" className="py-3 px-6">
                {entry}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr
              key={"row#" + i}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {row.map((entry, index) =>
                index === 0 ? (
                  <th
                    key={"th#" + index}
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {entry}
                  </th>
                ) : (
                  <td key={"td#" + index} className="py-4 px-6">
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
