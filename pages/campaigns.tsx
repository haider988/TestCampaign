import useCampaignContext from "@/src/context/CampaignProvider";
import CampaignsView from "@/src/views/campaigns/CampaignsView";
import { NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getAnalytics } from "firebase/analytics";
import { app } from "@/src/firebase";
import TiktokScript from "@/src/scripts/TiktokScript";
import SnackvideoPageViewScript from "@/src/scripts/SnackvideoPageViewScript";

export default function Campaigns({ headers }: any) {
  const { setPhoneNumber, setCarrierType } = useCampaignContext();
  const router = useRouter();
  const ttclid: any = router.query["ttclid"]; //tiktok
  const gclid: any = router.query["gclid"]; //google
  const kwaiid: any = router.query["kwai_pixel_id"]; //snackvideo

  console.log("--------------------------------------");
  console.log("campaign-x-msisdn", headers["x-msisdn"]);
  // console.log("campaign-msisdn", headers["msisdn"]);
  console.log("campaign-ttclid", router.query["ttclid"]);
  console.log("campaign-gclid", router.query["gclid"]);
  console.log("campaign-kwaiid", router.query["kwai_pixel_id"]);
  console.log("campaign-router-query", router.query);
  console.log("--------------------------------------");

  useEffect(() => {
    // getAnalytics(app);

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
        <title>Weatherwalay - Campaigns</title>
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
        <meta property="og:title" content="WeatherWalay | Campaign" />
        <meta
          property="og:description"
          content="WeatherWalay provides real-time hyper local and accurate weather information through state-of-the-art weather forecasting 
      technologies and local weather experts"
        />

        {/* {kwaiid && <SnackvideoPageViewScript pixel="571438131124645948" />} */}
        {ttclid && <TiktokScript pixel="CM6IRKJC77U3QO247M80" />}
      </Head>
      <main>
        <CampaignsView ttclid={ttclid} gclid={gclid} kwaiid={kwaiid} />
      </main>
    </>
  );
}

Campaigns.getInitialProps = async (ctx: NextPageContext) => {
  const headers = ctx.req ? ctx.req.headers : {};
  return { headers };
};
