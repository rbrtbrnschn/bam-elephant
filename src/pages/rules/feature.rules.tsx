export interface IFeatureProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  icon: JSX.Element;
  description: string;
}
export const Feature = ({
  title,
  icon,
  description,
  ...props
}: IFeatureProps) => {
  return (
    <div
      className="transition hover:cursor-pointer hover:-translate-y-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-white mt-6  shadow-lg rounded-lg dark:bg-gray-800"
      {...props}
    >
      <div className="flex-shrink-0">
        <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
        {title}
      </h3>
      <p className="text-md  text-gray-500 dark:text-gray-300 py-4">
        {description}
      </p>
    </div>
  );
};
