import { createContext, useEffect, useRef, useState } from "react";
import "amazon-connect-streams";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProfileCreation from "./components/ProfileCreation";

export const GlobalContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GlobalContext.Provider value={{ isLoading, setIsLoading }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Dashboard></Dashboard>} path={"/"}></Route>
          <Route
            element={<ProfileCreation></ProfileCreation>}
            path={"/create-profile"}
          ></Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
