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


release 1.2 V
- add skeletons for card images V
- internationalization V
  - add locales for rules V
- gamemode about section -> table V
- add more info next to onboarding headers V
- add in joyride to home page get started button -> guides  V
  
release 1.3 V
- bam-elephant card? V
- extra cards by game-mode? V
- made it clearer who get's too choose new rule V
- bam elephant card grey on dark mod V
- onFocus after add-rule-modal shows up doenst work well on mobile V
- fix droddown mechanics, for accesibility. mobile cannot update rule by selecting from dropdown. V
- mobile layout fudged V

release 1.3.1 V
- SEO home V
  - guide V
  - alt tags V
  - headers V

release 2.0
- refactor gamerule.rule handle to not use hardcode card valus like ACE V
- cards that cannot be reruled like 2 in lowkey V
- add onclick for info component, so that mobile works V (it does on native anyways)
- remove title from locale swithcer for small devices, only flag V
- set defaults for translation keys V

- setup crowdin for translations V
  - create banner and/or joyride
  - maybe even as home page footer

- fix shuffle (seems to be very much the same every iteration)
- sound effects on wins
- settings to disable sound effects
- save game?
- add cookies message saying, we dont keep cookies. (accept or decline)
- jokers?
- user can create client-side rules
  - which will be injected into current gameMode.defaultRules
- add in animation for rocket
- add in real photos
- whole page detailing game modes / game rules / rule with search functionality and add functionality (after next upgrade?)
  - add - ctrl-k for some sort of (game) search

  

Ice Box:
- add in cookies section
- add strapi for rule management
- rework game component to allow walkthrough
- per account custom rules, that maybe added to gamemodes or game Rules

- think about moving to next 
  - could create static sites that would work as documentation for all the gamemodes and game rules and rules that were created.
  - add in strapi, 
  - allow user login
  - user can create rules, game rules / no gamemodes (least wouldnt know how)
  - user can upload custom cards / decks
- mobile game could have a tab view for nav + rule/notifs + card view + buttons / table / settings 