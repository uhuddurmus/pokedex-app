import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "../../redux/types/Pokemon";
import { getColorValueByKey } from "../../Theme/Colors";
import ThemeConfig from "../../Theme";
import AppStore from "../../redux/types/AppStore";

const BagPage = () => {
  useEffect(() => {
    loadBagFromStorage();
  }, []);

  const loadBagFromStorage = () => {
    const res = AppStore.get("MyPokemonBag");
    if (res) {
      setBagData(JSON.parse(res));
    }
  };
  
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
  const [query, setQuery] = useState<string>("");
  const [bagData, setBagData] = useState<Array<Pokemon>>([]);

  const filteredData = React.useCallback((): Array<Pokemon> => {
    return bagData.filter(
      (p: Pokemon) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        String(p.id).includes(query)
    );
  }, [bagData, query]);
  return (
    <>
      <div className="w-100">
        <div className="row d-flex justify-content-between">
          <div className="col-2 ps-5">
            <button
              onClick={() => {
                navigate(`/`);
              }}
              className="btn btn-primary mt-2 mb-0"
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
              <span className="ms-1">Return Home </span>
            </button>
          </div>
        </div>
        <div className="row">
        {filteredData().map((p: any,index) =>{

          var value = backgroundColor(p)

          if(p!==undefined){
            return(
              <div  key={index} className="col-xl-4 mt-5" style={{height:'205px'}}>
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
              <div className="col-xl-4 mt-5 " style={{height:'205px'}}>
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
      </div>{" "}
    </>
  );
};

export default BagPage;
