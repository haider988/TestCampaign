import { ChakraProvider } from "@chakra-ui/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { AppProps } from "next/app";
import theme from "../theme.fonts";
import { CampaignProvider } from "../src/context/CampaignProvider";
import { fonts } from "../src/fonts/poppins";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <SpeedInsights/>
      <style jsx global>
        {`
          :root {
            --font-poppins: ${fonts.poppins.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <CampaignProvider>
          <Component {...pageProps} />
        </CampaignProvider>
      </ChakraProvider>
    </>
  );
}
