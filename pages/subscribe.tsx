import useCampaignContext from "@/src/context/CampaignProvider";
import SubscribeView from "@/src/views/subscribe/SubscribeView";
import { NextPageContext } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import TiktokScript from "@/src/scripts/TiktokScript";
// import Script from "next/script";

export default function Subscribe({ headers }: any) {
  const { setPhoneNumber, setCarrierType } = useCampaignContext();
  const router = useRouter();
  const ttclid: any = router.query["ttclid"];
  const gclid: any = router.query["gclid"];

  console.log("--------------------------------------");
  console.log("subscribe-x-msisdn", headers["x-msisdn"]);
  // console.log("subscribe-msisdn", headers["msisdn"]);
  console.log("subscribe-ttclid", router.query["ttclid"]);
  console.log("subscribe-gclid", router.query["gclid"]);
  console.log("subscribe-router-query", router.query);
  console.log("--------------------------------------");

  useEffect(() => {
    const xmsisdn = headers["x-msisdn"]; //jazz
    // const msisdn = headers["msisdn"]; //ufone

    // if (msisdn || xmsisdn) {
    //   let formattedNumber;
    //   if (xmsisdn) {
    //     formattedNumber = xmsisdn.replace(/^92/, "0");
    //     setCarrierType("jazz");
    //   } else if (msisdn) {
    //     formattedNumber = msisdn.replace(/^92/, "0");
    //     setCarrierType("ufone");
    //   }
    //   setPhoneNumber(formattedNumber);
    // }

    if (xmsisdn) {
      const formattedNumber = xmsisdn.replace(/^92/, "0");
      setCarrierType("jazz");
      setPhoneNumber(formattedNumber);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Weatherwalay - Subscribe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/wwlogo.svg" />

        <meta
          name="description"
          content="WeatherWalay provides real-time hyper local and accurate weather information through state-of-the-art weather forecasting 
      technologies and local weather experts."
        />
        <meta
          name="keywords"
          content="weatherwalay, walaway, weather, campaign"
        />
        <meta property="og:title" content="WeatherWalay | Subscribe" />
        <meta
          property="og:description"
          content="WeatherWalay provides real-time hyper local and accurate weather information through state-of-the-art weather forecasting 
      technologies and local weather experts"
        />

        {ttclid && <TiktokScript pixel="CM6IRKJC77U3QO247M80" />}
      </Head>

      <main>
        <SubscribeView ttclid={ttclid} gclid={gclid} />
      </main>
    </>
  );
}

Subscribe.getInitialProps = async (ctx: NextPageContext) => {
  const headers = ctx.req ? ctx.req.headers : {};
  return { headers };
};
