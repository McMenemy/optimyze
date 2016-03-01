# optimyze

[Heroku link][heroku]

[heroku]: optimyze.herokuapp.com

## Minimum Viable Product

Optimyze is a web application built using Ruby on Rails and React.js. Optimyze allows users to:

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, view, edit, and delete optimizations of repetitive tasks
- [ ] Visualize individual optimizations in their dashboard (includes a graph of time saved over time based on frequency, time invested, and time saved per occurrence data.)
- [ ] See meta data of theoretical time saved from all their optimizations
- [ ] Add categories to their optimizations
- [ ] Browse other users optimizations by category

- **Bonus Functionality** (not part of minimum viable product)
- [ ] Copy other users optimizations to their dashboard or to their save for later list
- [ ] Up-vote other user's optimizations
- [ ] Browse other user's optimizations by number of up-votes
- [ ] Choose to track an optimization (tracking an optimization allows the user to input every time they did or didn't complete a task using their optimization). This would allow for calculation of actual time saved not just theoretical time saved.

In one sentence: Optimyze allows users to organize and find optimizations to repetitive tasks and keep track of the time they saved.

[Views][views]
[Components][components]
[Stores][stores]
[Api-endpoints][api-endpoints]
[Schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] user Sign Up/Sign In pages
- [x] blank landing page after sign in

### Phase 2: Optimizations Model, API, and basic APIUtil (1.5 days)

**Objective:** Optimizations can be created, read, edited and destroyed through
the API.

- [x] create `Optimization` model
- [x] seed the database with a small amount of test data
- [x] CRUD API for optimizations (`OptimizationsController`)
- [x] jBuilder views for optimizations
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` and `OptimizationActions` to interact with the API
- [x] test out API and Action interaction in the console.

### Phase 3: Flux Architecture and Router (2 days)

**Objective:** Optimizations can be created, read, edited, viewed and destroyed with the
user interface.

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- implement the following components
  - [x] `OptimizationIndex`
  - [x] `OptimizationIndexItem`
  - [x] `OptimizationEditForm`
  - [x] `OptimizationNewForm`
  - [x] `OptimizationDetail` - just show raw info, no graphing

### Phase 4: Start Styling (1 day)

**Objective:** Existing pages look appealing and `OptimizationDetail` will graph raw information.

- [x] add basic colors & styles
- [x] use highchartsJS to graph optimization details

### Phase 4.5: Add in User logic (1 day)

**Objective:** Dashboard only shows optimizations belonging to user.

- [x] user controller has many optimizations
- [x] api to select all optimizations for users
- [x] when logged in shows users optimizations

### Phase 5: Finish React Components (1 day)

**Objective:** User can search optimizations by name

- [x] create `SearchParamStore`
- [x] create `SearchIndex` flux cycle
- [x] searching updates shown optimizations
- [x] integrate user sign-in into react
- [x] add browse all button
- [ ] clean up UI for initial user testing
        - [x] graph shows correct units
        - [ ] new and edit form are intuitive
        - [x] right pane remains fixed
        - [ ] top ui of left pane remains fixed
        - [x] edit and delete links are stacked
        - [x] graph matches rest of site

### Phase 6: Categories and Overview component (1 day)

**Objective:** Optimizations can have multiple categories and are searchable by category and and see overall optimization time savings.

- [ ] create `UserOptimizationOverview`
- [ ] use CSS to style new views
- [ ] create `Category` model
- [ ] add categories to optimizations api jBuilder
- [ ] add search by category to `SearchIndex`
- [ ] add category to optimization forms

### Phase 7: Allow Browsing of other user's optimizations (1 day)

**objective:** Allow user to view and search all public optimizations.

- [x] Make browse view by dynamically unmounting non-needed components from dashboard view.  

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive, intuitive, and appealing to the eye.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Phase 9: Work on Bonus features.
