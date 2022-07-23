export interface IMyCard2Props extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  description: string;
  c2a: string;
  disabled?: boolean;
  isSelected?: boolean;
}
export const MyCard2 = ({
  imageUrl,
  c2a,
  description,
  title,
  className,
  disabled,
  isSelected,
  ...props
}: IMyCard2Props) => {
  return (
    <div
      className={`transition max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-2
      ${isSelected ? "border-blue-400 dark:border-white border-2" : ""}
      ${disabled ? "pointer-events-none " : ""}
         ${className}`}
      {...props}
    >
      <a
        className={`flex justify-center -translate-x-3 p-5 cursor-pointer${
          disabled ? "opacity-25 cursor-not-allowed" : ""
        }`}
      >
        <img
          className={`rounded-t-lg w-64 ${disabled ? "opacity-25" : ""}`}
          src={imageUrl}
          alt="bam elephant card"
        />
      </a>
      <div
        className={`p-5 h-max  ${
          disabled ? "opacity-25 cursor-not-allowed" : ""
        }`}
      >
        <a className="cursor-pointer">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <button
          type="button"
          tabIndex={-1}
          className={`transition cursor-pointer  ${
            disabled ? "opacity-25 cursor-not-allowed" : ""
          } ${
            isSelected
              ? "inline-flex justify-center items-center bg-blue-400 dark:bg-blue-500 cursor-not-allowed text-white font-bold py-2 px-4 border-0 border-b-4 border-blue-600 rounded"
              : "border-b-4 py-2 px-4 inline-flex justify-center items-center text-base font-medium text-center text-gray-900 rounded border border-gray-700 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 hover:border-gray-500"
          }`}
        >
          {c2a}
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
