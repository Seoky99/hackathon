import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import TempPage from "./pages/TempPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/pagestyles/Home.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="about" element={<About />} />
          <Route path="temppage" element={<TempPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
