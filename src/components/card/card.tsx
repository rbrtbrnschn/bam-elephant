interface IMyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string;
  title?: string;
  subTitle?: string;
  tags?: string[];
}
export const MyCard = ({
  imageUrl,
  title,
  subTitle,
  tags,
  ...props
}: IMyCardProps) => {
  return (
    <div
      className="max-w-sm rounded-lg overflow-hidden shadow-lg transition transform hover:-translate-y-1 cursor-pointer motion-reduce:transition-none motion-reduce:hover:transform-none"
      {...props}
    >
      <img
        className="w-full"
        src={imageUrl || "/img/card-top.jpg"}
        alt="Sunset in the mountains"
      />
    </div>
  );
};
