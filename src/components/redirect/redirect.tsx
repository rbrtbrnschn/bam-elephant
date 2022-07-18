import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IRedirectProps {
  title: string;
  description?: string;
  imageUrl?: string;
  path?: string;
  duration?: number;
}
export const Redirect = ({
  title,
  description,
  imageUrl,
  duration = 0,
  path = "/",
  ...props
}: IRedirectProps) => {
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);
  const imgStyles = {
    ...(!isDone && {
      animation:
        "hue 1s cubic-bezier(0.4, 0, 0.6, 1) infinite, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    }),
  };
  useEffect(() => {
    if (!duration) return;
    setTimeout(() => {
      setIsDone(true);
    }, duration);
  }, []);
  useEffect(() => {
    if (!isDone) return;
    console.log("first:", isDone);
    setTimeout(() => {
      navigate(path);
    }, 1000);
  }, [isDone]);
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex justify-center items-center flex-col">
        {title && (
          <h1 className="text-2xl lg:text-6xl bold-text text-gray-900 dark:text-white">
            {title}
          </h1>
        )}
        {imageUrl && (
          <img
            className="transition img mb-3"
            src={imageUrl}
            alt="redirect"
            style={imgStyles}
          />
        )}
        <div className="text-md text-gray-500 regular-text dark:text-gray-400">
          {description}
        </div>
      </div>
    </div>
  );
};
