import { Grid, Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import TransactionsCard from "../components/TransactionsCard/TransactionsCard";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Head>
          <title>Budget-In</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Grid item xs={12}>
          <TransactionsCard />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
