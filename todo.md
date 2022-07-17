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
- delete presets, no more custom presets, only as an interface for props
- thinking to just get rid of presets all together.

- refactor rule sets, gamemodes, presets
- allow for more detail on rulesets and gamemodes, more than the actual data themselves.
- refactor winner loser logic to gamemode! ;) 100iq move right there.
- gamemode may has rules to chose from, not rule sets, but rules categories? :shrug:

- use joyride over current implementation ( dont work )
- add in gamemode description when playing.
- add in card-value tooltip on right hand side
- maybe add in dropdown for gamemode rules to choose from instead of custom for choose rule modal
- build out readme

Ice Box:
