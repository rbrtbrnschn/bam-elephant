import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const Redirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const possibleParams = [
    "title",
    "description",
    "imageUrl",
    "to",
    "duration",
  ] as const;
  let [title, description, imageUrl, to, duration] = possibleParams.map((e) => {
    return e === "duration" ? parseInt(params.get(e) || "0") : params.get(e);
  });
  const [isDone, setIsDone] = useState(false);
  const imgStyles = {
    ...(!isDone && {}),
  };
  useEffect(() => {
    if (!duration) return;
    setTimeout(() => {
      setIsDone(true);
    }, duration as number);
  }, []);
  useEffect(() => {
    if (!isDone) return;
    setTimeout(() => {
      navigate(to as string);
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

        <img
          className="transition img mb-3 animate-pulse"
          src={imageUrl ? (imageUrl as string) : "/assets/elephant.png"}
          alt="redirect"
          style={imgStyles}
        />

        <div className="text-md text-gray-500 regular-text dark:text-gray-400">
          {description}
        </div>
      </div>
    </div>
  );
};
