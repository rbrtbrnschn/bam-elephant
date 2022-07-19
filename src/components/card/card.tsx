import { useState } from "react";
import { CardSkeleton } from "../skeletons/card";

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
  const [imageHasLoaded, setImageHasLoaded] = useState(false);
  return (
    <div
      className="max-w-sm rounded-lg overflow-hidden shadow-lg transition transform hover:-translate-y-1 cursor-pointer motion-reduce:transition-none motion-reduce:hover:transform-none"
      {...props}
    >
      <img
        className="w-full"
        src={imageUrl || "/img/card-top.jpg"}
        onLoad={(e) => {
          setImageHasLoaded(true);
        }}
        alt="Sunset in the mountains"
      />
      {!imageHasLoaded ? <CardSkeleton /> : null}
    </div>
  );
};
