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

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user Sign Up/Sign In pages
- [ ] blank landing page after sign in

### Phase 2: Optimizations Model, API, and basic APIUtil (1.5 days)

**Objective:** Optimizations can be created, read, edited and destroyed through
the API.

- [ ] create `Optimization` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for optimizations (`OptimizationsController`)
- [ ] jBuilder views for optimizations
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (2 days)

**Objective:** Optimizations can be created, read, edited, viewed and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement the following components
  - [ ] `OptimizationNewButton`
  - [ ] `OptimizationIndex`
  - [ ] `OptimizationIndexItem`
  - [ ] `DashboardPanel`
  - [ ] `OptimizationEditForm`
  - [ ] `OptimizationNewForm`
  - [ ] `OptimizationDetail` - just show raw info, no graphing

### Phase 4: Start Styling (1 day)

**Objective:** Existing pages look appealing and `OptimizationDetail` will graph raw information.

- [ ] add basic colors & styles
- [ ] use highchartsJS to graph optimization details

### Phase 5: Finish React Components (1 day)

**Objective:** User can search optimizations by name and see overall optimization time savings.

- [ ] create `SearchSuggestionStore`
- [ ] create `SearchIndex`
- [ ] create `UserOptimizationOverview`
- Use CSS to style new views

### Phase 6: Categories (.5 days)

**Objective:** Optimizations can have multiple categories and are searchable by category.

- [ ] create `Category` model
- [ ] add categories to optimizations api jBuilder
- [ ] add search by category to `SearchIndex`
- [ ] add category to optimization forms

### Phase 7: Allow Browsing of other user's optimizations (1 day)

**objective:** Allow user to view and search all public optimizations.

- [ ] Make browse view by dynamically unmounting non-needed components from dashboard view.  

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive, intuitive, and appealing to the eye.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Phase 9: Work on Bonus features.
