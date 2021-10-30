import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const darkTheme = createTheme({
    palette: { mode: prefersDarkMode ? "dark" : "light" },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <CssBaseline />
          <Component {...pageProps} />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
export default MyApp;
