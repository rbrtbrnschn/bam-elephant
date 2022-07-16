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
    <div className="max-w-sm rounded overflow-hidden shadow-lg" {...props}>
      <img
        className="w-full"
        src={imageUrl || "/img/card-top.jpg"}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{subTitle}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {tags?.map((t: any) => (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};
