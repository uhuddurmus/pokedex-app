
import { NamedAPIResource } from "./NamedAPIResource";

export type PokemonStat = {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
};
