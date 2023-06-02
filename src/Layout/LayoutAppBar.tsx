import React, { useContext, useEffect } from "react";
import PokemonLogo from "../assets/Images/pokemon_logo.png";
import { ThemeContext } from "../App";
import pokeball from "../assets/Images/pokeball.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import classNames from "classnames";
import { Dropdown } from "react-bootstrap";
const languages = [
  {
    code: "tr",
    name: "Turkish",
    country_code: "tr",
  },
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
];

export const LayoutAppBar: React.FC = () => {
  const { t } = useTranslation();

  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { toggleTheme } = useContext(ThemeContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    var element = document.getElementById("background");
    if (theme === true) {
      element?.classList.add("bg-secondary");
    } else {
      element?.classList.remove("bg-secondary");
    }
  }, [theme]);
  const navigate = useNavigate();

  return (
    <div
      style={{ height: "66px" }}
      className={
        theme
          ? "d-flex flex-row justify-content-between bg-dark"
          : "d-flex flex-row justify-content-between bg-primary"
      }
    >
      <img
        className=" m-1 "
        style={{ height: "56px" }}
        src={PokemonLogo}
        alt="pokemon logo"
      />
      <div className=" my-auto me-4 mt-2 d-flex">
        <></>

        <button
          onClick={() => {
            navigate("/my-bag");
          }}
          className=" btn btn-secondary me-4"
          data-testid="envanter"
          style={{ height: "40px" }}
        >
          <img
            className=""
            style={{ height: "25px" }}
            src={pokeball}
            alt="pokemon logo"
          />{" "}
          {t('Inventory')} 
        </button>
        <Dropdown>
          <Dropdown.Toggle
          className="me-4"
            variant="secondary"
            id="dropdown-basic"
            style={{ height: "40px" }}
          >
            <span
              className={`fi fi-${currentLanguage?.country_code} mx-2`}
            ></span>
            {t("language")}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {languages.map(({ code, name, country_code},index :number) => (
              <>
                <Dropdown.Item
                  key={index}
                  tabindex={index}
                  disabled={currentLanguageCode === code}
                  onClick={() => {
                    i18next.changeLanguage(code);
                  }}
                >
                  <span
                    className={`fi fi-${country_code} mx-2`}
                    style={{
                      opacity: currentLanguageCode === code ? 0.5 : 1,
                    }}
                  ></span>
                  {name}
                </Dropdown.Item>
              </>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <button
          onClick={toggleTheme}
          className={theme ? "btn btn-danger " : "btn btn-success "}
          style={{ height: "40px" }}
        >
          {theme ? t('Dark_theme')  : t('Light_theme')}
        </button>
      </div>
    </div>
  );
};
