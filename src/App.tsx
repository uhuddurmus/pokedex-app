import React, { createContext, useState } from "react";
import "./App.css";
import Navigation from "./routes/Navigation";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { Provider } from "react-redux";
import store from "./redux/store";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    supportedLngs: ["tr", "en"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage"],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
    react: { useSuspense: false },
  });
export const ThemeContext = createContext<any>(null);

const App: React.FC = () => {
  const [theme, settheme] = useState<any>(false);

  const toggleTheme = () => {
    settheme((curr: any) => (curr === true ? false : true));
  };
  return (
    <React.Fragment>
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <Navigation />
        </ThemeContext.Provider>
      </Provider>
    </React.Fragment>
  );
};
export default App;
