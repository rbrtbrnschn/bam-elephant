Demo:
- button to draw two cards V
- compare V
- decide winner V
- showcase rule/todo V
- draw another V

Alpha:
- refactor to use proper data V
- reshuffle V
- ace may add rules V
  - check for rules via map V
  - refactor to 1 state V
- add table view of rules V
- allow more than 3 players V
- winner functionality V
  - based on sort alg, V
    - which can be used to determine lose if more than 2 player V
  - draw V
- undo draw V
- add in map of cards as chosen per gamemodes to run cbs for winning cards (possible useGameState param?) V
- allow for different rule sets V
- shuffle deck from the get go V
- CSS statics V
- allow for different initialRule Sets V
- fix toasts (move to right || disable) V
- refactor winnerCallbacks V
- refactor interfaces V

- refactor undo, drawCards to store
- refactor toggle Modal, newRule out of store/index.ts 
- feat: add in givenState for gameState hook for modal and such to allow use of actions/access to state in IGameInjections 

Beta:
- tooltip on hover card showing current rule V
- fix up mobile view V
- use cookies to redirect to game from home V
- add home screen V
- allow for game modes V
- allow for rule sets V
- add in guide section V
- add in home page details V
- highlight winner row in table  V
- navbar #help links to rules sections V
- rules page V
- add How To Section ( Rules )V
- add in players V
- vercel V
- Tutorial Walkthrough V

release:
- add favicon V
- add logo navbar / footer V
- fix navbar mobile V
- add preview table on /v1 onboarding V
- refactor rules to objects as to use with more detailed knowledge ie. description for rules. V
- delete presets, no more custom presets, only as an interface for props V
- thinking to just get rid of presets all together. V
- refactor rule sets, gamemodes, presets V
- allow for more detail on rulesets and gamemodes, more than the actual data themselves. V
- add in gamemode description when playing. V
- refactor winner loser logic to gamemode! ;) 100iq move right there. V
- allow for toast/rule manipulation/creation via callback V

Release:
- build out readme V

release 1.1
- add lint test V
- add in tooltip for i on banner V
- maybe add in dropdown for gamemode rules to choose from instead of custom for choose rule modal V

- add loading page from onboarding to game V
- use redirect for onboarding completion V
- rename workflow title V
- redo walkthrough, use joyride V
- use joyride over current implementation ( dont work ) V
- rework walkthrough to look like game
- add in step for notifactions to walkthrough V
- add in step for ace V
- walkthrough with keys (could not figure out how)
- add winner name to banner V
- fix modal layout V


release 1.2
- add skeletons for card images V
- internationalization
  - add locales for rules
- gamemode about section -> table
- SEO home page tos privacy
- add in joyride to home page get started button -> guides 
- add I'm still confused, what do I do now button in guides / faq to start joyride  
- allow to add in rules dynamically form onboarding via dropdown, 
  - each gamemode has it's own categories of rules to be picked from. (no idea what I had planned here)
- add in card-value tooltip on right hand side


Ice Box:
- add strapi for rule management
- rework game component to allow walkthrough
- per account custom rules, that maybe added to gamemodes  or game Rules
