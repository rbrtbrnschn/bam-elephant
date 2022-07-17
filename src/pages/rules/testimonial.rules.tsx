import React from "react";

interface ITestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string | React.ReactElement;
  authorName: string | React.ReactElement;
  authorImageUrl: string;
  iconUrl: string;
  position: string | React.ReactElement;
}
export const Testimonial = ({
  quote,
  authorName,
  authorImageUrl,
  position,
  iconUrl,
  ...props
}: ITestimonialProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 w-full mx-auto p-8" {...props}>
      <img src={iconUrl} className="h-10 w-10 mb-8 m-auto" alt="rocket" />
      <p className="text-gray-600 dark:text-white w-full md:w-2/3 m-auto text-center text-lg md:text-3xl">
        <span className="font-bold text-indigo-500">“</span>
        {quote}
        <span className="font-bold text-indigo-500">”</span>
      </p>
      <div className="flex items-center justify-center mt-8">
        <a href="#" className="block relative">
          <img
            alt="profil"
            src={authorImageUrl}
            className="mx-auto object-cover rounded-full h-10 w-10 "
          />
        </a>
        <div className="flex ml-2 items-center justify-center">
          <span className="font-semibold text-indigo-500 mr-2 text-lg">
            {authorName}
          </span>
          <span className="text-gray-400 text-xl font-light">/</span>
          <span className="text-gray-400 text-md ml-2">{position}</span>
        </div>
      </div>
    </div>
  );
};
