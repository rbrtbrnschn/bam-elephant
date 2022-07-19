import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useGameModesWithDescription } from "../../common/game-modes";
import { useGameRulesWithDescription } from "../../common/game-rules";
import { MyFooter } from "../../components/footer/footer";
import { MyNavbar } from "../../components/navbar/navbar";
import { IGameModeWithDescription } from "../../interfaces/game.interface";
import { IFAQProps, RulesFAQS } from "./faqs.rules";
import { Feature, IFeatureProps } from "./feature.rules";
import { GetStarted } from "./get-started.rules";
import { Testimonial } from "./testimonial.rules";

export const useFaqs = (): IFAQProps[] => {
  const { t } = useTranslation();
  return [
    {
      title: t("guide.faqs.1.title"),
      id: "how-does-this-work",
      description: (
        <span>
          {t("guide.faqs.1.description.prefix")}{" "}
          <a href="#" className="text-blue-600 underline">
            {t("navbar.walkthrough")}
          </a>
          . {t("guide.faqs.1.description.suffix")}
        </span>
      ),
    },
    {
      title: t("guide.faqs.2.title"),
      id: "can-i-play-this-with-my-friends",
      description: t("guide.faqs.2.description"),
    },
    {
      title: t("guide.faqs.3.title"),
      id: "what-are-the-different-game-modes",
      description: (
        <span>
          {t("guide.faqs.3.description.1")}{" "}
          <a href="#game-modes" className="text-blue-600 underline">
            {t("guide.faqs.3.description.2")}
          </a>{" "}
          {t("guide.faqs.3.description.3")}
        </span>
      ),
    },
    {
      title: t("guide.faqs.4.title"),
      id: "and-what-are-rule-sets",
      description: (
        <span>
          <a href="#rule-sets" className="text-blue-600 underline">
            {t("guide.faqs.4.description.1")}
          </a>{" "}
          {t("guide.faqs.4.description.2")}
        </span>
      ),
    },
  ];
};

export const RulesPage = () => {
  const faqs = useFaqs();
  const { t } = useTranslation();
  const gameModes = useGameModesWithDescription();
  const gameRules = useGameRulesWithDescription();
  return (
    <div>
      <MyNavbar />
      <div className="container mx-auto px-4 pt-4">
        {/* RulesPage Showcase different game modes / rulesets / general rules */}
        <RulesFAQS>
          {faqs.map((faq) => (
            <RulesFAQS.FAQ {...faq} />
          ))}
        </RulesFAQS>

        <div className="max-w-screen-xl mx-auto p-8">
          <GetStarted className="mb-24" />

          <h2
            className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12 dark:text-white"
            id="game-modes"
          >
            {t("guide.gameModes.title")}
          </h2>
          <div className="mb-8 sm:flex flex-wrap justify-center items-center text-center gap-8">
            {gameModes.map((gm) => (
              <Feature
                title={gm.title}
                description={gm.description}
                key={"gamemode-" + gm.title}
                icon={
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="h-6 w-6"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
                  </svg>
                }
              />
            ))}
          </div>
          <hr className="mb-12" />
          <Testimonial
            authorName={"York Treinis"}
            position={"Co Founder"}
            quote={"Why did we call this Bam Elephant again?"}
            authorImageUrl={"https://www.tailwind-kit.com/images/person/1.jpg"}
            iconUrl={"https://www.tailwind-kit.com/icons/rocket.svg"}
          />
          <h2
            className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12 dark:text-white mt-6"
            id="rule-sets"
          >
            {t("guide.gameRules.title")}
          </h2>
          <div className="mb-8 sm:flex flex-wrap justify-center items-center text-center gap-8">
            {gameRules.map((gr) => (
              <Feature
                title={gr.title}
                description={gr.description}
                key={"gamerule-" + gr.title}
                icon={
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="h-6 w-6"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
                  </svg>
                }
              />
            ))}
          </div>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
