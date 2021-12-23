import React, { createContext, useState } from "react";
import Isuues from "./Components/Issues/Issues";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./Components/IssueDetails/Details";

const pageProvider = createContext();

function App() {
  const [pageNo, setPageNo] = useState(1);

  return (
    <div>
      <pageProvider.Provider value={{ pageNo, setPageNo }}>
        <BrowserRouter>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<Isuues />} />
          </Routes>
        </BrowserRouter>
      </pageProvider.Provider>
    </div>
  );
}

export default App;
export { pageProvider };
