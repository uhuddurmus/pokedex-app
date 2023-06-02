import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  fetchPokemons,
  fetchPokemonsByIdOrName,
} from "../../redux/reducer/pokemonsList/pokemonListSlice";
import { Pokemon } from "../../redux/types/Pokemon";
import { useNavigate } from "react-router-dom";
import { getColorValueByKey } from "../../Theme/Colors";
import ThemeConfig from "../../Theme";
import { useTranslation } from "react-i18next";
import axios from "axios";

const MainPage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState<string>("");
  const { data, offset, loading, error } = useSelector(
    (state: RootState) => state.pokemon
  );


  useEffect(() => {
    data.length <= 1 && dispatch<any>(fetchPokemons());
  }, []);

  const handleQueryChange = React.useCallback(
    (query: string) => {
      setQuery(query.toLowerCase());
      if (query !== "") {
        dispatch<any>(fetchPokemonsByIdOrName(query.toLowerCase()));
      } else {
        dispatch<any>(fetchPokemons());
      }
    },
    [dispatch]
  );

  const handleLoadMore = React.useCallback(() => {
    dispatch<any>(fetchPokemons());
  }, [dispatch]);

  const showError = React.useCallback(() => {
    return query !== "" && !!error && !loading;
  }, [error, query, loading]);



  const navigate = useNavigate();

  const backgroundColor = (pokemon:any) => {
    if (pokemon?.types?.length > 0) {
      const name = pokemon?.types[0]?.type?.name;
      if (name) {
        return getColorValueByKey(name) || ThemeConfig.Colors.warmGrey;
      }
      return ThemeConfig.Colors.warmGrey;
    }
    return ThemeConfig.Colors.warmGrey;
  }
  const { t } = useTranslation();


  
  return (
    <>
    <div className="h1 text-center">
    {t('Welcome_to_React')}
    </div>
      <div className="row">
        
        {data.map((p: Pokemon | undefined, index: number) =>{

          var value = backgroundColor(p)

          if(p!==undefined){
            return(
              <div key={index} className="col-xl-4 mt-5" style={{height:'205px'}}>
                <div
                  onClick={() => {
                    navigate(`/pokemon/${p.id}`);
                  }}
                  className=" m-4 card "
                  style={{minHeight:'205px',
                  background: `linear-gradient(rgba(0,0,0,0.9) 0%, ${value} 70%, ${value} 100%)`, cursor:'pointer'}}
                >
                  <span className="text-white ms-2" style={{fontSize:'24px',fontStyle:'italic',fontWeight:'bold',}}>#{p.id}</span>
                    <div className="d-flex justify-content-center">
                    <img className="" width={100} height={100} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`} alt="" />
  
                    </div>
  
                  <div className="h2 text-center m-0" style={{fontSize:'28px',fontStyle:'italic',fontWeight:'bold',}}>
                    {p.name.toUpperCase()}
                  </div>
                </div>
              </div>
            )
          }else{
            return(
              <div  key={index} className="col-xl-4 mt-5 " style={{height:'205px'}}>
                  <div
                  
                  className=" m-4 card bg-secondary"
                  style={{minHeight:'205px'}}
                >
                  <span className="text-white ms-2" style={{fontSize:'24px',fontStyle:'italic',fontWeight:'bold',}}>#000</span>
                    <div className="d-flex justify-content-center">
  
                    </div>
  
                  <div className="h2 text-center m-0" style={{fontSize:'28px',fontStyle:'italic',fontWeight:'bold',}}>
                  </div>
                </div>
              </div>
              )
          }

          
        })}

      </div>

      <div className="row mt-5 mb-5">
        <button onClick={handleLoadMore} className="btn btn-danger">
        {t('Load')}

        </button>
      </div>
      
    </>
  );
};

export default MainPage;
