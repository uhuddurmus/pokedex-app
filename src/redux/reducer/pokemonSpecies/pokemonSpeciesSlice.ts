
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { pokeApiGet } from "../../api/pokeApi";
import { PokemonSpecies } from "../../types/PokemonSpecies";
import { RequestStatusType } from "../../types/RequestStatusType";

type PokemonSpeciesType = {
  speciesData: PokemonSpecies[];
} & RequestStatusType;

const initialState: PokemonSpeciesType = {
  speciesData: [],
  loading: false,
  error: null,
};

const pokemonSpeciesSlice = createSlice({
  name: "pokemonSpecies",
  initialState,
  reducers: {
    /** set up state between calls **/
    preparePokemonSpecies(state) {
      state.loading = true;
      state.error = null;
    },
    setPokemonSpeciesSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    setPokemonSpeciesFailure(state, action: PayloadAction<{ err: string }>) {
      const { err } = action.payload;
      state.loading = false;
      state.error = err;
    },
    getPokemonSpeciesReducer(
      state,
      action: PayloadAction<{ species: PokemonSpecies }>
    ) {
      const { species } = action.payload;
      const pokemonSpeciesExists = state.speciesData.find(
        (ps: PokemonSpecies) => ps && ps.id === species.id
      );
      if (!pokemonSpeciesExists) {
        state.speciesData.push(species);
      }
    },
  },
});

export const {
  preparePokemonSpecies,
  setPokemonSpeciesSuccess,
  setPokemonSpeciesFailure,
  getPokemonSpeciesReducer,
} = pokemonSpeciesSlice.actions;

export const pokemonSpeciesReducer = pokemonSpeciesSlice.reducer;

export const fetchPokemonSpeciesById = (id: any): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(preparePokemonSpecies());
    const pokemonSpecies = await pokeApiGet(`/pokemon-species/${id}`);
    dispatch(getPokemonSpeciesReducer({ species: pokemonSpecies }));
    dispatch(setPokemonSpeciesSuccess());
  } catch (err) {
    dispatch(setPokemonSpeciesFailure({ err: JSON.stringify(err) }));
  }
};
