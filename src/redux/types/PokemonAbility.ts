
import { NamedAPIResource } from "./NamedAPIResource";

export type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
};
