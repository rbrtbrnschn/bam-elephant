import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../../common/useTranslation";
import ReactJoyride, { Step } from "react-joyride";
import { useLocation, useNavigate } from "react-router-dom";
import { MyFooter } from "../../components/footer/footer";
import { MyNavbar } from "../../components/navbar/navbar";
import { useStorage } from "../../utils/useStorage";
import { Testimonial } from "../rules/testimonial.rules";
import { useGameRedirect } from "./redirect.hook";
import { MyBanner } from "../../components/banner/banner";
import { Hero2 } from "../../components/hero/hero2";

export const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getLocaleStorage, setLocalStorage } = useStorage(localStorage);
  const needsJoyride = !getLocaleStorage("site.visited-walkthrough");

  const needsLocaleBanner = !getLocaleStorage("site.show-crowdin-banner");
  const [showLocaleBanner, setShowLocaleBanner] = useState(
    !!needsLocaleBanner ?? false
  );
  const disableLocaleBanner = () => {
    setShowLocaleBanner(false);
    setLocalStorage("site.show-crowdin-banner", Date.now() + "");
  };

  const getStartedButtonRef = useRef<HTMLButtonElement>(null);

  const [steps] = useState<Step[]>([
    {
      target: "#home-news-alert",
      placement: "left",
      content:
        "Jump right in. Get started. We'll even give you a quick walkthrough.",
      spotlightClicks: true,
    },
  ]);
  useEffect(() => {
    getStartedButtonRef.current?.focus();
  }, []);

  return (
    <div>
      {needsJoyride ? <ReactJoyride steps={steps} run={true} /> : null}
      {showLocaleBanner ? (
        <div className="px-4 mx-auto max-w-screen-xl text-center lg:px-12 ">
          <MyBanner
            title={
              <span>
                "New Internationilization Feature!" To add translations for your
                language{" "}
                <a
                  href="https://crowdin.com/project/bam-elephant"
                  target={"_blank"}
                  className="text-blue-500 underline "
                  onClick={() => {
                    disableLocaleBanner();
                  }}
                >
                  click here.
                </a>
              </span>
            }
            dataTip="We're using 'Crowdin' for language support."
            color="teal"
            className={"dark:text-white"}
            onClose={() => {
              disableLocaleBanner();
            }}
          />
        </div>
      ) : null}
      <MyNavbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <a
            href="#"
            id="home-news-alert"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
            onClick={() => {
              navigate("/walk-through");
            }}
          >
            <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">
              {t("home.tag.badge")}
            </span>{" "}
            <span className="text-sm font-medium">{t("home.tag.text")}</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {t("home.header")}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            {t("home.subHeader")}
          </p>

          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <video loop autoPlay src={"/assets/drinking-stock.mp4"} />
          </div>
          <div className="pt-4 flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
              id="get-started-button"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              ref={getStartedButtonRef}
              onClick={() => {
                navigate("/v1");
              }}
            >
              {t("home.c2a.1")}
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              onClick={() => {
                navigate("/guide");
              }}
            >
              <svg
                className="mr-2 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
              {t("home.c2a.2")}
            </a>
          </div>
          <hr />

          <Testimonial
            authorName={"Robert Bornschein"}
            position={"Co Founder"}
            quote={t("home.quote")}
            authorImageUrl={"https://www.tailwind-kit.com/images/person/1.jpg"}
            iconUrl={"https://www.tailwind-kit.com/icons/rocket.svg"}
          />
          <hr />
          <Hero2
            title="The Translations need your help!"
            description="Want to play the game in your language instead? Click below to get started."
            buttons={[
              {
                onClick: () => {
                  disableLocaleBanner();
                  window.open(
                    "https://crowdin.com/project/bam-elephant",
                    "_blank"
                  );
                },
                label: "Get started",
              },
            ]}
            imageUrl={"/assets/pc-man.png"}
          />
        </div>
      </section>
      <MyFooter />
    </div>
  );
};
