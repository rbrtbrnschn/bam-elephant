import { useEffect, useMemo } from "react";
import { cardValueToName, ICard } from "../../interfaces/card.interface";
import { IBaseRule } from "../../interfaces/rules.interface";

interface IMyTableProps extends React.HTMLAttributes<HTMLDivElement> {
  head: string[];
  body: Array<[string, IBaseRule]>;
  winner?: ICard;
}
export const MyTable = ({
  head,
  body,
  winner,
  className,
  ...props
}: IMyTableProps) => {
  useEffect(() => {}, [body]);
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
              } border-b dark:border-gray-70
              ${
                row.includes(cardValueToName((winner as ICard)?.value))
                  ? "bg-blue-500 text-white"
                  : ""
              }
              
              `}
            >
              {row.map((entry: unknown, index) =>
                index === 0 ? (
                  <th
                    key={"th#" + index + entry}
                    scope="row"
                    className={`py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white ${
                      row.includes(cardValueToName((winner as ICard)?.value))
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                  >
                    {entry as string}
                  </th>
                ) : (
                  <td
                    key={"td#" + index + (entry as IBaseRule).title}
                    className={`${
                      row.includes(cardValueToName((winner as ICard)?.value))
                        ? "bg-blue-500 text-white"
                        : ""
                    } py-4 px-6`}
                  >
                    {(entry as IBaseRule).title}{" "}
                    {(entry as IBaseRule)?.description ? (
                      <svg
                        aria-hidden="true"
                        className="inline flex-shrink-0 mr-3 w-5 h-5 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        data-tip={(entry as IBaseRule)?.description}
                        data-for="main"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : null}
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
