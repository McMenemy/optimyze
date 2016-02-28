# Flux Stores

### OptimizationStore

Holds all persisted optimization data.

##### Actions:
- `receiveAllOptimizations`
- `receiveSingleOptimization`
- `receiveUserOptimizations`

##### Listeners:
- `OptimizationsIndex` (passes to `OptimizationIndexItem` via props)
- `OptimizationDetail`
- `UserOptimizationOverview`

### SearchParamsStore

Holds typeahead suggestions for search.

##### Actions:
- `receiveSearchSuggestions`

##### Listeners:
- `SearchIndex`
