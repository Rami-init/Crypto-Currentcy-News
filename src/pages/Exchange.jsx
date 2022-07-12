import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Typography";
import { useGetCryptoQuery } from "../services/Crypto";
import { Container } from "@mui/material";
import millify from "millify";
import { Grid } from "@mui/material";
import { Spinner } from "../components";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Exchange() {
  const [expanded, setExpanded] = React.useState(1);
  const { data: listCoin, isFetching } = useGetCryptoQuery(100);

  if (isFetching) return <Spinner />;
  return (
    <Container sx={{ flexGrow: 1 }}>
      <Box paddingY="1rem" mt={5}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Grid item xs={5}>
            <Typography>Rank & Name</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Price</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Exchange</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>24hVolume</Typography>
          </Grid>
        </Grid>
        {listCoin?.data?.coins?.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === index + 1}
            onClick={() => setExpanded(index + 1)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Grid item xs={5} display="flex" alignItems="center">
                  <Typography mr=".7rem">{`${index + 1}. `}</Typography>
                  <img
                    src={item.iconUrl}
                    alt="coin icon"
                    style={{ maxWidth: "2rem", maxHeight: "2rem" }}
                  />
                  <Typography ml=".5rem">{item.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{item.price && millify(item.price)}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{item.change}%</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography>
                    {item?.["24hVolume"] && millify(item?.["24hVolume"])}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography fontWeight={600} my={1}>
                What's is {item.name}
              </Typography>
              <Typography>
                {item.name} is the first digital currency that allows users to
                send and receive money, without the interference of a central
                bank or government. Instead, a network of thousands of peers is
                controlling the transactions; a decentralized system.
              </Typography>
              <Typography fontWeight={600} my={1}>
                Get Now Exchange {item.name}
              </Typography>
              <Typography>
                <a href={item.coinrankingUrl}>{item.coinrankingUrl}</a>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
