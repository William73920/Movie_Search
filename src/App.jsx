import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";

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

  return <div className="App">{url?.total_pages}</div>;
}

export default App;
