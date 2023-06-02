
import { NamedAPIResource } from "./NamedAPIResource";

export type Pageable = {
  count: number;
  next: string;
  previous: string;
  results: Array<NamedAPIResource>;
};
