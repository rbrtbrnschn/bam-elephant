import React from "react";

export const RulesFAQS = (props: React.PropsWithChildren<any>) => {
  const { children } = props;
  return (
    <div id="faqs" className="max-w-screen-xl mx-auto p-8">
      <h2 className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12">
        FAQs
      </h2>
      <ul className="flex items-start gap-8 flex-wrap justify-between">
        {children}
      </ul>
    </div>
  );
};

export interface IFAQProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  id: string;
}
const FAQ = ({ title, description, id }: IFAQProps) => {
  return (
    <li id={id} className="w-auto md:w-2/5">
      <p className="text-lg font-medium leading-6 text-gray-900">{title}</p>
      <p className="mt-2">
        <p className="text-base leading-6 text-gray-500">{description}</p>
      </p>
    </li>
  );
};

RulesFAQS.FAQ = FAQ;
