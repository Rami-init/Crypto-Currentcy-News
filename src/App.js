import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { Home, Crypto, News, Exchange, CoinDetails } from "./pages";
import { styled } from "@mui/material";
const App = () => {
  const AppWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "row-reverse",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
    },
  }));
  const MainWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 25%)",
    minHeight: '100vh',
    justifyContent: "end",
    backgroundColor: theme.palette.grey[100],
    [theme.breakpoints.down("md")]: {
      width: "100%",
      justifyContent: "start",
    },
  }));
  return (
    <div className="app">
      <div className="nav-bar">
        <Navbar />
      </div>
      <AppWrapper>
        <MainWrapper className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/crypto" element={<Crypto />}></Route>
            <Route path="/exchange" element={<Exchange />}></Route>
            <Route path="/news" element={<News />}></Route>
            <Route path="/coin/:coinId" element={<CoinDetails />}></Route>
          </Routes>
          <div className="footer">
            <Footer />
          </div>
        </MainWrapper>
      </AppWrapper>
    </div>
  );
};

export default App;
