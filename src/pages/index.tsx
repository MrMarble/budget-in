import { Grid, Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import TransactionTable from "../components/TransactionTable";
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
          <TransactionTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
