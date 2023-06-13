import React, { useContext, useEffect } from "react";
import PokemonLogo from "../assets/Images/pokemon_logo.png";
import { ThemeContext } from "../App";
import pokeball from "../assets/Images/pokeball.png";
import sun from "../assets/Images/sun.png";
import moon from "../assets/Images/moon.png";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import classNames from "classnames";
import {
  Container,
  Dropdown,
  Nav,
  NavDropdown,
  NavItem,
  NavLink,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
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
    <Navbar
      key={"xl"}
      bg={theme ? "dark" : "light"}
      expand={"xl"}
      className="mb-3 w-100"
      collapseOnSelect={true}
    >
      <Container fluid>
        <Navbar.Brand>
          <img
            className=" m-1 "
            style={{ height: "56px" }}
            src={PokemonLogo}
            alt="pokemon logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle className="bg-secondary" aria-controls={`offcanvasNavbar-expand-${"xl"}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"xl"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"xl"}`}
          placement="end"
          className={theme ? "bg-dark" : "bg-light"}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"xl"}`}>
              <span className={theme ? "text-light" : "text-dark"}>
                Pokêdex
              </span>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link
                onClick={() => {
                  navigate("/my-bag");
                }}
                aria-label="Close"
              >
                <img
                  className=""
                  style={{ height: "25px" }}
                  src={pokeball}
                  alt="pokemon logo"
                />
                <span className={theme ? "text-white h6" : "text-dark h6"}>
                  {t("Inventory")}
                </span>
              </Nav.Link>
              <Nav.Link onClick={toggleTheme}>
                <span className={theme ? " text-warning h6" : " text-dark h6"}>
                  {theme ? (
                    <img
                      className=""
                      style={{ height: "25px" }}
                      src={moon}
                      alt="moon logo"
                    />
                  ) : (
                    <img
                      className=""
                      style={{ height: "25px" }}
                      src={sun}
                      alt="sun logo"
                    />
                  )}
                  {theme ? t("Dark_theme") : t("Light_theme")}
                </span>
              </Nav.Link>
              <NavDropdown
                title={
                  <span
                    className={`fi fi-${currentLanguage?.country_code} mx-2`}
                  ></span>
                }
                id={`offcanvasNavbarDropdown-expand-${"xl"}`}
              >
                {languages.map(
                  ({ code, name, country_code }, index: number) => (
                    <NavDropdown.Item
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
                    </NavDropdown.Item>
                  )
                )}
              </NavDropdown>
              <div style={{ visibility: "hidden" }}>
                <Nav.Link href="#action2">Link</Nav.Link>
              </div>
              <div style={{ visibility: "hidden" }}>
                <Nav.Link href="#action2">Link</Nav.Link>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
