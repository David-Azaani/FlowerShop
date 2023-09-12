import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../stroe/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
  //const { setBasket } = useStoreContext(); for Store Context
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  // for Store Context
  // useEffect(() => {
  //   const buyerId = getCookie("buyerId");
  //   if (buyerId) {
  //     agent.Basket.get()
  //       .then((basket) => setBasket(basket))
  //       .catch((error) => console.log(error))
  //       .finally(() => setLoading(false));
  //   } else {
  //     setLoading(false);
  //   }
  // }, [setBasket]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });
  function setDarkModeTheme() {
    setDarkMode(!darkMode);
  }

  if (loading)
    return <LoadingComponent loadingMessage="Initializing app ..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header changeTheme={setDarkModeTheme} darkMode={darkMode} />
      <Container>
        <Outlet />
        {/* <Catalog products={products} addProduct={addProducts} /> */}
      </Container>
    </ThemeProvider>
  );
}

export default App;

// Note : for learning more i did note remove unusead imports and comments on purpose!!
