import React, { useCallback, useContext, useEffect } from "react";
import { PokemonSpecies } from "../../redux/types/PokemonSpecies";
import { Pokemon } from "../../redux/types/Pokemon";
import { RootState } from "../../redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPokemonSpeciesById } from "../../redux/reducer/pokemonSpecies/pokemonSpeciesSlice";
import { ThemeContext } from "../../App";
import { Tab, Tabs } from "react-bootstrap";
import { PokemonPageControls } from "./PokemonPageControl";
import { useTranslation } from "react-i18next";

const PokemonPage = () => {
  const match = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.pokemon);
  const { speciesData } = useSelector(
    (state: RootState) => state.pokemonSpecies
  );
  const selectedPokemon = data.find(
    (p?: Pokemon) => p && p.id === Number(match?.id)
  );
  const selectedPokemonSpecies = speciesData.find(
    (ps: PokemonSpecies) => ps && ps.id === Number(match?.id)
  );
  useEffect(() => {
    fetchPokemonSpeciesIfUnavailable();
  }, []);



  const fetchPokemonSpeciesIfUnavailable = () => {
    if (!selectedPokemonSpecies) {
      dispatch<any>(fetchPokemonSpeciesById(match?.id));
    }
  };

  const { theme } = useContext(ThemeContext);

  function capitalizeFirstLetter(word: any) {
    return word?.charAt(0)?.toUpperCase() + word?.slice(1);
  }
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className="w-100">
        <div className="row d-flex justify-content-between">
          <div className="col-md-2 text-center mt-2">
            <button
              data-testid="returnhome"
              onClick={() => {
                navigate(`/`);
              }}
              className="btn btn-primary m-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
                style={{ marginTop: "-2px" }}
              >
                <path
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                  fill="white"
                />
              </svg>
              <span className="ms-1"> {t('Return_home')} </span>
            </button>
          </div>
          <div className="col-md-2 text-center mt-2">
            {selectedPokemon ? (
              <PokemonPageControls pokemon={selectedPokemon} />
            ) : null}
          </div>
        </div>
      </div>
      <div
        className="card m-2 p-2 border-0 row d-flex"
        style={{ backgroundColor: theme ? "#585858" : "#f5f5f5" }}
      >
        <div className="row">
          <div className="col-xl-4">
            <img
              className="img-fluid"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${selectedPokemon?.id}.png`}
              alt=""
            />

            <div
              className="text-primary ms-2"
              style={{
                fontSize: "3vw",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              #{selectedPokemon?.id}
            </div>
          </div>

          <div className="col-xl-8 text-center">
            <span
              style={{
                fontSize: "3vw",
                fontStyle: "italic",
                fontWeight: "900",
              }}
            >
              {selectedPokemon?.name.toUpperCase()}
            </span>
            <Tabs
              defaultActiveKey="General"
              id="uncontrolled-tab-example"
              className="mb-3 mt-3"
              fill
              style={{ backgroundColor: "transparent" }}
            >
              <Tab eventKey="General" title={t('General')}>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="text-start ">
                      <span style={{fontSize: "2vw", fontWeight: "bolder" }}>
                        {" "}
                        {t('Types')} 
                        <br />
                        {selectedPokemon?.types.map((type: any ,index) => {
                          return (
                            <>
                              <span key={index} style={{ fontWeight: "normal" }}>
                                - {capitalizeFirstLetter(type.type.name)}{" "}
                              </span>
                              <br />
                            </>
                          );
                        })}
                      </span>

                      <br />

                      <span style={{fontSize: "2vw", fontWeight: "bolder" }}>
                        {" "}
                        {t('Abilities')} 

                        <br />
                        {selectedPokemon?.abilities.map((abilities: any,index) => {
                          return (
                            <>
                              <span key={index} style={{ fontWeight: "normal" }}>
                                -{" "}
                                {capitalizeFirstLetter(abilities.ability.name)}{" "}
                              </span>
                              <br />
                            </>
                          );
                        })}
                      </span>
                      <br />

                      <span style={{fontSize: "2vw", fontWeight: "bolder" }}>
                        {" "}
                        {t('Height')}
                        <br />
                        <span style={{ fontWeight: "normal" }}>
                          {selectedPokemon?.height}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="text-start">
                      <span style={{fontSize: "2vw", fontWeight: "bolder" }}>
                        {" "}
                        {t('Weight')}
                        <br />
                        <span style={{ fontWeight: "normal" }}>
                          {selectedPokemon?.weight}
                        </span>
                      </span>

                      <br />
                      <br />

                      <span style={{fontSize: "2vw", fontWeight: "bolder" }}>
                        {" "}
                        {t('Moves')} 
                        <br />
                        <div
                          className="mt-1"
                          style={{ maxHeight: "250px", overflow: "scroll" }}
                        >
                          {selectedPokemon?.moves.map((moves: any,index:number) => {
                            return (
                              <>
                                <span key={index} style={{ fontWeight: "normal" }}>
                                  - {capitalizeFirstLetter(moves.move.name)}{" "}
                                </span>
                                <br />
                              </>
                            );
                          })}
                        </div>
                      </span>
                      <br />
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="Stats" title={t('Stats')}>
                {selectedPokemon?.stats.map((stat: any,index) => {
                  return (
                    <>
                      <div key={index} className="w-100" style={{ fontWeight: "normal" }}>
                        <span style={{ fontWeight: "bolder" }}>
                          {stat?.stat?.name.toUpperCase()}{" "}
                        </span>
                        ({stat?.base_stat}/100)
                        <br />
                        <input
                          className="w-100"
                          type="range"
                          disabled
                          defaultValue={stat?.base_stat}
                          max={100}
                        />
                      </div>
                      <br />
                    </>
                  );
                })}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
