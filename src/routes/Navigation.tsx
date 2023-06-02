

import * as React from "react";
import {  Route, BrowserRouter, Routes } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import MainPage from "../views/MainPage/MainPage";
import BagPage  from "../views/BagPage/BagPage";
import  PokemonPage  from "../views/PokemonPage/PokemonPage";
import { NoMatch } from "./NoMatch";

const Navigation = () => {

  return (
    <div className="h-100">
      <BrowserRouter>
          <React.Suspense>
            <Layout>
              <Routes>
                <Route  path="/" element={<MainPage/>} />
                <Route  path="/my-bag" element={<BagPage/>} />
                {/** Dynamic URL with `:id` param embed **/}
                <Route path="/pokemon/:id" element={<PokemonPage/>} />
                {/** A "fallback" route, to catch 404 errors **/}
                <Route path="/*"element={<NoMatch/>} />
              </Routes>
            </Layout>
          </React.Suspense>
        </BrowserRouter>
    </div>
  );
};
export default Navigation

