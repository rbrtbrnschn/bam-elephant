import { useMemo } from "react";
import { cardValueToName, ICard } from "../../interfaces/card.interface";

interface IMyTableProps extends React.HTMLAttributes<HTMLDivElement> {
  head: string[];
  body: string[][];
  winner?: ICard;
}
export const MyTable = ({ head, body, winner, ...props }: IMyTableProps) => {
  const winnerStyles = "bg-blue-500 text-white";
  const getWinnerStyles = (row: string[]) => {
    return row.includes(cardValueToName((winner as ICard)?.value))
      ? winnerStyles
      : "";
  };
  return (
    <div className=" overflow-x-auto relative">
      <table className="my-table w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
              id={"table-row" + (i + 1)}
              key={"row#" + i}
              className={`${
                (i + 1) % 2 === 0
                  ? "bg-gray-50 dark:bg-gray-800"
                  : "bg-white dark:bg-gray-900"
              } border-b dark:border-gray-70
              ${getWinnerStyles(row)}
              
              `}
            >
              {row.map((entry, index) =>
                index === 0 ? (
                  <th
                    key={"th#" + index}
                    scope="row"
                    className={`py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white ${getWinnerStyles(
                      row
                    )}`}
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
