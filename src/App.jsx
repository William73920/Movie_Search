import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./utils/api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageError from "./pages/404/pageError";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    apiTesting();
  }, []);

  const apiTesting = async () => {
    const data = await fetchDataFromApi("/movie/popular");
    dispatch(getApiConfiguration(data));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="*" element={<PageError />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
