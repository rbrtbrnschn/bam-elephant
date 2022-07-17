import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faqs } from "../../pages/rules/rules";

export const MyNavbar = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const navigate = useNavigate();
  const [hasExpandedMobile, setHasExpandedMobile] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
        <a
          href="#"
          className="flex items-center"
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src="/assets/elephant.png"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Bam Elephant
          </span>
        </a>
        <div className="flex md:order-2">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              navigate("/v1");
            }}
          >
            Get started!
          </button>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded={hasExpandedMobile ? "true" : "false"}
            onClick={() => setHasExpandedMobile((boo) => !boo)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div
          id="mega-menu-full"
          className={`${
            !hasExpandedMobile ? "hidden" : ""
          } justify-between items-center w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col mt-4 text-sm font-medium md:flex-row md:space-x-8 md:mt-0">
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </a>
            </li>
            <li>
              <button
                id="mega-menu-full-dropdown-button"
                data-collapse-toggle="mega-menu-full-dropdown"
                className="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={() => setIsDropdown(!isDropdown)}
              >
                Help{" "}
                <svg
                  className="ml-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={() => {
                  navigate("/guide");
                }}
              >
                Guide
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={() => {
                  navigate("/walk-through");
                }}
              >
                Walkthrough
              </a>
            </li>

            {/* <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li> */}
          </ul>
        </div>
      </div>
      {isDropdown && (
        <div
          id="mega-menu-full-dropdown"
          className="mt-1 bg-white border-gray-200 shadow-sm border-y dark:bg-gray-800 dark:border-gray-600"
        >
          <div className="grid py-5 px-4 mx-auto max-w-screen-xl text-gray-900 dark:text-white sm:grid-cols-2 sm:grid-cols-2 md:px-6">
            <ul>
              <li>
                <a
                  href={`#${faqs[0].id}`}
                  onClick={() => {
                    navigate("/guide");
                  }}
                  className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">{faqs[0].title}</div>
                  <span className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {faqs[0].description}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={"#" + faqs[1].id}
                  onClick={() => {
                    navigate("/guide");
                  }}
                  className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">{faqs[1].title}</div>
                  <span className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {faqs[1].description}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={"#" + faqs[2].id}
                  onClick={() => {
                    navigate("/guide");
                  }}
                  className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">{faqs[2].title}</div>
                  <span className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {faqs[2].description}
                  </span>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href={"#" + faqs[3].id}
                  onClick={() => {
                    navigate("/guide");
                  }}
                  className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">{faqs[3].title}</div>
                  <span className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {faqs[3].description}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">Where do I play?</div>
                  <span className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Click the{" "}
                    <a
                      href="#"
                      onClick={() => navigate("/v1")}
                      className="text-blue-600 underline"
                    >
                      'Get Started'
                    </a>{" "}
                    button in the top right corner.
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};
