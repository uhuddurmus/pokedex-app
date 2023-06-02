
import { combineReducers } from "@reduxjs/toolkit";
import { pokemonReducer } from "./reducer/pokemonsList/pokemonListSlice";
import { pokemonBagReducer } from "./reducer/pokemonBag/pokemonBagSlice";
import { pokemonSpeciesReducer } from "./reducer/pokemonSpecies/pokemonSpeciesSlice";

const rootReducer = combineReducers({
  /** the reducer for the pokemon data loaded
   * in the main page and used throughout the app **/
  pokemon: pokemonReducer,
  /** the reducer for the pokemon species data loaded
   * and used in the pokemon details relevant page **/
  pokemonSpecies: pokemonSpeciesReducer,
  /** the reducer for loading and managing the "my bag"
   * saved pokemons  **/
  pokemonBag: pokemonBagReducer,
  /** the reducer that loads the initial NamedApiResource data
   * from the PokeAPI in order to fulfill the autocomplete
   * functionality **/
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
