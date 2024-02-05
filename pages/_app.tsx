import "@/styles/globals.css";
import { CssVarsProvider } from "@mui/joy/styles";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </CssVarsProvider>
  );
}
