import { Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

import GraphCard from "../components/GraphCard/GraphCard";
import TransactionsCard from "../components/TransactionsCard/TransactionsCard";

const Home: NextPage = () => {
  return (
    <Container>
      <Grid container spacing={2} mt={1}>
        <Head>
          <title>Budget-In</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Grid item xs={12}>
          <GraphCard />
        </Grid>
        <Grid item xs={12}>
          <TransactionsCard />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
