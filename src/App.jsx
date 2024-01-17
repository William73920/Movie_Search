import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./utils/api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
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
    genresCall();
  }, []);

  const apiTesting = async () => {
    const data = await fetchDataFromApi("/configuration");
    const url = {
      backdrop: data.images.secure_base_url + "original",
      poster: data.images.secure_base_url + "original",
      profile: data.images.secure_base_url + "original",
    };
    dispatch(getApiConfiguration(url));
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = { item }));
    });
    dispatch(getGenres(allGenres));
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
