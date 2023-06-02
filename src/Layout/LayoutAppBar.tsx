import React, { useContext, useEffect } from "react";
import PokemonLogo from "../assets/Images/pokemon_logo.png";
import { ThemeContext } from "../App";
import pokeball from "../assets/Images/pokeball.png";
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
    <Navbar key={"xl"} bg={theme ? "dark" : "light"} expand={"xl"} className="mb-3">
      <Container fluid>
        <Navbar.Brand>
          <img
            className=" m-1 "
            style={{ height: "56px" }}
            src={PokemonLogo}
            alt="pokemon logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"xl"}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"xl"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"xl"}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"xl"}`}>
              Pokêdex
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link
                onClick={() => {
                  navigate("/my-bag");
                }}
              >
                <img
                  className=""
                  style={{ height: "25px" }}
                  src={pokeball}
                  alt="pokemon logo"
                />
              </Nav.Link>
              <Nav.Link
                                  onClick={toggleTheme}

              >
                <span className={theme ? " text-danger " : " text-success "}>
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
    // <div
    //   style={{ height: "66px" }}
    //   className={
    //     theme
    //       ? "d-flex row justify-content-between bg-dark"
    //       : "d-flex row justify-content-between bg-primary"
    //   }
    // >
    //   <div className="col-xl-4">
    //
    //   </div>

    //   <div className=" col-xl-4 my-auto me-4 mt-2 d-flex d-flex row">
    //     <></>
    //     <div className="col-md-2">
    //     <button
    //       onClick={() => {
    //         navigate("/my-bag");
    //       }}
    //       className=" btn btn-secondary me-4"

    //       data-testid="envanter"
    //       style={{ height: "40px",width:'70px' ,overflow:'none'}}
    //     >
    //       <img
    //         className=""
    //         style={{ height: "25px" }}
    //         src={pokeball}
    //         alt="pokemon logo"
    //       />{" "}
    //       {/* {t('Inventory')}  */}
    //     </button>
    //     </div>
    //     <div className="col-md-2">
    //     <Dropdown >
    //       <Dropdown.Toggle
    //       className=""
    //         variant="secondary"
    //         id="dropdown-basic"
    //         style={{ height: "40px" }}
    //       >
    //         <span
    //           className={`fi fi-${currentLanguage?.country_code} mx-2`}
    //         ></span>

    //       </Dropdown.Toggle>

    //       <Dropdown.Menu>
    //         {languages.map(({ code, name, country_code},index :number) => (
    //           <>
    //             <Dropdown.Item
    //               key={index}
    //               tabindex={index}
    //               disabled={currentLanguageCode === code}
    //               onClick={() => {
    //                 i18next.changeLanguage(code);
    //               }}
    //             >
    //               <span
    //                 className={`fi fi-${country_code} mx-2`}
    //                 style={{
    //                   opacity: currentLanguageCode === code ? 0.5 : 1,
    //                 }}
    //               ></span>
    //               {name}
    //             </Dropdown.Item>
    //           </>
    //         ))}
    //       </Dropdown.Menu>
    //     </Dropdown>
    //     </div>
    //     <div className="col-md-2">
    //     <button
    //       onClick={toggleTheme}
    //       className={theme ? "btn btn-danger " : "btn btn-success "}
    //       style={{ height: "40px" ,overflow:'none',width:'70px'}}
    //     >
    //       {theme ? t('Dark_theme')  : t('Light_theme')}
    //     </button>
    //     </div>

    //   </div>
    // </div>
  );
};
