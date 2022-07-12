import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  styled,
  Box,
  InputBase,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetCryptoQuery } from "../services/Crypto";
import millify from "millify";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/SearchOffRounded";
import Spinner from "./Spinner";

const TopTenCryptoInWorld = ({ simplefied }) => {
  const count = simplefied ? 10 : 100;
  const { data, isFetching } = useGetCryptoQuery(count);
  const [listCoins, setListCoins] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const theme = useTheme();
  const confingMillify = {
    precision: 3,
  };
  const ImgContainer = styled("div")({
    borderRadius: "100%",
    width: "4rem",
    hieght: "4rem",
  });
  const CardHeader = styled("div")({
    display: "flex",
    justifyContent: "space-Between",
    alignItems: "center",
    marginBottom: "2rem",
  });
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    marginTop: "7rem",
    marginBottom: "3rem",
    display: "center",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    marginLeft: 0,
    width: "17rem",
    alignItems: "center",
    [theme.breakpoints.up("ms")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    position: "absolute",
    padding: theme.spacing(0, 2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    height: "100%",
  }));
  const InputBaseWrapper = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("ms")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  useEffect(()=>{
    if(data?.data?.coins) {
      setListCoins(data?.data?.coins)
    }
  },[data])
  useEffect(() => {
    let tempList = data?.data?.coins?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerms.toLowerCase())
    );
    setListCoins(tempList);
  }, [searchTerms]);
  if (isFetching) return <Spinner />;
  return (
    <>
      {!simplefied && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <InputBaseWrapper
              placeholder="search..."
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
            />
          </Search>
        </Box>
      )}
      <Grid container spacing={3}>
        {listCoins?.map((coin, index) => {
          const { price, name, marketCap, change, iconUrl, uuid } = coin;
          return (
            <Grid item xs={12} md={6} lg={3} key={uuid}>
              <Card>
                <CardContent>
                  <Link to={`/coin/${uuid}`}>
                    <CardHeader>
                      <Typography variant="body1" fontWeight={600}>{`${
                        index + 1
                      }. ${name}`}</Typography>
                      <ImgContainer>
                        <img src={iconUrl} alt="img coin" />
                      </ImgContainer>
                    </CardHeader>
                    <Typography variant="body2" color={theme.palette.grey[500]}>
                      {" "}
                      Price:
                      <Typography
                        component="span"
                        fontWeight={600}
                        color={theme.palette.grey[700]}
                      >
                        {" "}
                        {millify(price, confingMillify)}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color={theme.palette.grey[500]}>
                      {" "}
                      Market Cap:
                      <Typography
                        component="span"
                        fontWeight={600}
                        color={theme.palette.grey[700]}
                      >
                        {" "}
                        {millify(marketCap, confingMillify)}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color={theme.palette.grey[500]}>
                      {" "}
                      Dialy Exchange:
                      <Typography
                        component="span"
                        fontWeight={600}
                        color={theme.palette.grey[700]}
                      >
                        {" "}
                        {millify(change, confingMillify)}
                      </Typography>
                    </Typography>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default TopTenCryptoInWorld;
