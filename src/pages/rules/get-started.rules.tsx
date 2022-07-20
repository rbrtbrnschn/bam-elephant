import React, { forwardRef } from "react";
import { useTranslation } from "../../common/useTranslation";
import { useNavigate } from "react-router-dom";

export const GetStarted = forwardRef<
  React.RefObject<HTMLButtonElement>,
  React.HTMLAttributes<HTMLDivElement> & {
    buttonRef: React.RefObject<HTMLButtonElement>;
  }
>(({ className, ...props }, ref) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className={"bg-white dark:bg-gray-800 mb-24 " + className} {...props}>
      <div className="lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
          <span className="block">{t("guide.hero.title")}</span>
          <span className="block text-indigo-500">
            {t("guide.hero.subTitle")}
          </span>
        </h2>
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className=" inline-flex rounded-md shadow">
            <button
              type="button"
              ref={ref as React.RefObject<HTMLButtonElement>}
              className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              onClick={() => {
                navigate("/v1");
              }}
            >
              {t("guide.hero.c2a.1")}
            </button>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <button
              type="button"
              className="py-4 px-6  bg-white-200 hover:bg-slate-100 focus:ring-gray-500 focus:ring-offset-gray-200 text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg dark:bg-white"
              onClick={() => {
                navigate("/walk-through");
              }}
            >
              {t("guide.hero.c2a.2")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
