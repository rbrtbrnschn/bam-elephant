interface IMyCard2Props extends React.HTMLAttributes<HTMLDivElement> {
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
      ${isSelected ? "border-green-300 border-2" : ""}
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
          alt=""
        />
      </a>
      <div className={`p-5 ${disabled ? "opacity-25 cursor-not-allowed" : ""}`}>
        <a className="cursor-pointer">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <a
          className={`transition cursor-pointer inline-flex items-center py-2 px-3 text-sm font-medium text-center bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ${
            disabled ? "opacity-25 cursor-not-allowed" : ""
          } ${
            isSelected
              ? "bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500"
              : ""
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
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};
