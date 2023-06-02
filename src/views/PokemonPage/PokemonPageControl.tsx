
import * as React from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pokemon } from "../../redux/types/Pokemon";
import { RootState } from "../../redux/rootReducer";
import { addPokemonToBag, removePokemonFromBag } from "../../redux/reducer/pokemonBag/pokemonBagSlice";
import { useTranslation } from "react-i18next";


export type PokemonPageControlsProps = {
  pokemon: Pokemon;
};

export const PokemonPageControls: React.FC<PokemonPageControlsProps> = ({
  pokemon,
}: PokemonPageControlsProps) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.pokemonBag);
  const pokemonExistsInBag = data.find(
    (p?: Pokemon) => p && p.id === pokemon.id
  );
  const handleBagPress = useCallback(() => {
    if (pokemonExistsInBag) {
      dispatch(removePokemonFromBag({ pokemon }));
    } else {
      dispatch(addPokemonToBag({ pokemon }));
    }
  }, [pokemonExistsInBag, dispatch, pokemon]);

  const { t } = useTranslation();

  return (

      <button
        id={pokemonExistsInBag ? "added_in_bag" : "not_added_in_bag"}
        color={pokemonExistsInBag ? "secondary" : "primary"}
        onClick={handleBagPress}
        className={pokemonExistsInBag ? "btn btn-danger mt-2 mb-0 float-end me-5" : "btn btn-success mt-2 mb-0 float-end me-5" }
      >
          {pokemonExistsInBag ? t('Release') : t('Catch') }
      </button>
  );
};


