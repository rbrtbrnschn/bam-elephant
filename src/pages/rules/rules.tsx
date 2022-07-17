import { MyFooter } from "../../components/footer/footer";
import { MyNavbar } from "../../components/navbar/navbar";
import { IFAQProps, RulesFAQS } from "./faqs.rules";
import { Feature } from "./feature.rules";
import { GetStarted } from "./get-started.rules";
import { Testimonial } from "./testimonial.rules";

export const faqs: IFAQProps[] = [
  {
    title: "How does this work?",
    id: "how-does-this-work",
    description: (
      <span>
        Check out the{" "}
        <a href="#" className="text-blue-600 underline">
          Walkthrough
        </a>
        . That should help with any questions or confusion.
      </span>
    ),
  },
  {
    title: "Can I play this with my friends?",
    id: "can-i-play-this-with-my-friends",
    description:
      "Yes, this is a multiplayer experience, though locally. Get your friends round. Join the fun. 1 Person acts as the 'Game Master' and leads the game.",
  },
  {
    title: "What are the different 'Game Modes'?",
    id: "what-are-the-different-game-modes",
    description: (
      <span>
        The 'Game Modes' are envisioned as a different start into game, for the
        different types of people or scenarios which you might find yourself in.
        If you play in a smaller group, you might aim for more of a low-key
        time. If you're out with the squad, maybe you want to try something more
        on the 'crazy' side. Check the{" "}
        <a href="#game-modes" className="text-blue-600 underline">
          'Game Modes'
        </a>{" "}
        section for more info.
      </span>
    ),
  },
  {
    title: "And what are 'Rule Sets'?",
    id: "and-what-are-rule-sets",
    description: (
      <span>
        <a href="#rule-sets" className="text-blue-600 underline">
          'Rule Sets'
        </a>{" "}
        are just a different starting points, regarding the pre-determined
        rules, applied to cards. Think of it like this. Haven't you ever played
        a card game with someone else, that tried to explain to you, that you've
        been playing a game wrong whole your life? People play the same games
        with different rules sometimes. We embrace this! Make it your own.
      </span>
    ),
  },
];
export const RulesPage = () => {
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
            className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12"
            id="game-modes"
          >
            Game Modes
          </h2>
          <div className="mb-8 sm:flex flex-wrap justify-center items-center text-center gap-8">
            <Feature
              title="Outdoors"
              description="Share relevant, engaging, and inspirational brand messages to
            create a connection with your audience."
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
            <Feature
              title="Low-Key"
              description="A low-key scenario, just sit down with your friends. Put on some good music. Have a good time."
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

            <Feature
              title="@ The Club"
              description="Let us help you level up your search engine game, explore our
            solutions for digital marketing for your business."
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
          </div>
          <hr />
          <Testimonial
            authorName={"York Treinis"}
            position={"Co Founder"}
            quote={"Why did we call this Bam Elephant again?"}
            authorImageUrl={"https://www.tailwind-kit.com/images/person/1.jpg"}
            iconUrl={"https://www.tailwind-kit.com/icons/rocket.svg"}
          />
          <h2
            className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12"
            id="rule-sets"
          >
            Rule Sets
          </h2>
          <div className="mb-8 sm:flex flex-wrap justify-center items-center text-center gap-8">
            <Feature
              title="Basic"
              description="At this point I'm out of information."
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
            <Feature
              title="Crazy"
              description="Lorem Ipsum. I don't even know, how to describe it. That's how crazy it is."
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
            <Feature
              title="Adversity-rich"
              description="I'm just making up words as I go now."
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
          </div>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
