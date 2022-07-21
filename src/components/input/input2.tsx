interface IInput2Props extends React.InputHTMLAttributes<HTMLInputElement> {
  div?: React.HTMLAttributes<HTMLDivElement>;
  label?: React.HTMLAttributes<HTMLLabelElement>;
}
export const Input2 = ({
  name,
  title,
  label: labelProps = {},
  div: divProps = {},
  ...props
}: IInput2Props) => {
  return (
    <div {...divProps}>
      <label
        htmlFor={name}
        className="transition block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        {...labelProps}
      >
        {title}
      </label>
      <input
        type="text"
        name={name}
        className="transition bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        {...props}
      />
    </div>
  );
};
