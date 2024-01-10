import useCampaignContext from "@/src/context/CampaignProvider";
import RegisterView from "@/src/views/register/RegisterView";
import { NextPageContext } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import TiktokScript from "@/src/scripts/TiktokScript";
// import Script from "next/script";

export default function Register({ headers }: any) {
  const { setPhoneNumber, setCarrierType } = useCampaignContext();
  const router = useRouter();
  const ttclid: any = router.query["ttclid"];
  const gclid: any = router.query["gclid"];

  console.log("--------------------------------------");
  console.log("register-x-msisdn", headers["x-msisdn"]);
  // console.log("register-msisdn", headers["msisdn"]);
  console.log("register-ttclid", router.query["ttclid"]);
  console.log("register-gclid", router.query["gclid"]);
  console.log("register-router-query", router.query);
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
        <title>Weatherwalay - Register</title>
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
        <meta property="og:title" content="WeatherWalay | Register" />
        <meta
          property="og:description"
          content="WeatherWalay provides real-time hyper local and accurate weather information through state-of-the-art weather forecasting 
      technologies and local weather experts"
        />
        {ttclid && <TiktokScript pixel="CM6IRKJC77U3QO247M80" />}
      </Head>
      <main>
        <RegisterView ttclid={ttclid} gclid={gclid} />
      </main>
    </>
  );
}

Register.getInitialProps = async (ctx: NextPageContext) => {
  const headers = ctx.req ? ctx.req.headers : {};
  return { headers };
};
