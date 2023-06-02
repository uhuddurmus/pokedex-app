import * as React from "react";
import NoMatchPage from "../assets/Images/404.jpg";
import ThemeConfig from "../Theme";
import { useNavigate } from "react-router-dom";
import pokeball from "../assets/Images/404.webp";

/** page rendered as 404 - when no url matches **/
export const NoMatch: React.FC<any> = () => {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="row w-75 d-flex justify-content-center">
        <div className="row w-75 ">
          <img className="img-fluid" src={pokeball} alt="pokemon logo" />
        </div>

        <br />

        <button className="btn btn-danger" onClick={handlePress}>
          Take me back to the homepage to catch some Pokémons!
        </button>
      </div>
    </div>
  );
};
