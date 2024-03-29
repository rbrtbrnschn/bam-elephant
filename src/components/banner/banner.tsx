import React from "react";
import { Info } from "../info/info";

interface IMyBannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: string | React.ReactElement;
  onClose?: (e: any) => void;
  isDanger?: boolean;
  dataTip?: string;
  color?: string;
}
export const MyBanner = ({
  title,
  dataTip = "",
  onClose,
  isDanger,
  color = "blue",
  className,
  ...props
}: IMyBannerProps) => {
  if (isDanger) color = "red";
  return (
    <div
      className={`flex p-4 mb-4 border-t-4 border-${color}-500 dark:bg-${color}-200 bg-${color}-100 ${
        isDanger ? "dark:text-white" : ""
      } ${className}`}
      role="alert"
      {...props}
    >
      <Info dataTip={dataTip} className={`text-${color}-700`} />

      <div className={`text-sm font-medium text-${color}-700`}>{title}</div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 bg-${color}-100 dark:bg-${color}-200 text-${color}-500 rounded-lg focus:ring-2 focus:ring-${color}-400 p-1.5 hover:bg-${color}-200 dark:hover:bg-${color}-300 inline-flex h-8 w-8 z-10`}
        data-dismiss-target="#alert-border-1"
        aria-label="Close"
        onClick={onClose}
      >
        <span className="sr-only">Dismiss</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};
