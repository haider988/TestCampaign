import Head from "next/head";
import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Weatherwalay - Marketing</title>
        <link rel="icon" href="/wwlogo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="WeatherWalay | Marketing" />
        <meta
          name="description"
          content="WeatherWalay provides real-time hyper local and accurate weather information through state-of-the-art weather forecasting 
      technologies and local weather experts."
        />

        <meta
          property="og:description"
          content="WeatherWalay provides real-time hyper local and accurate weather information through state-of-the-art weather forecasting 
      technologies and local weather experts"
        />
        <meta
          name="keywords"
          content="weatherwalay, walaway, weather, marketing, campaign"
        />
      </Head>
      <main>
        <Box height={"100vh"} display={"grid"} placeItems={"center"}>
          <Stack spacing={6}>
            <Heading>Marketing</Heading>
            <Link href={'/campaigns'}>
              <Button
                // onClick={() => router.push("/campaigns")}
                size={"lg"}
                style={{width:'100%'}}
                colorScheme="messenger"
              >
                Campaign
              </Button>
            </Link>
            <Link href={'/register'}>
              <Button
                // onClick={() => router.push("/register")}
                size={"lg"}
                style={{width:'100%'}}
                colorScheme="messenger"
              >
                Register
              </Button>
            </Link>
            <Link href={'/subscribe'}>
              <Button
                // onClick={() => router.push("/subscribe")}
                size={"lg"}
                style={{width:'100%'}}
                colorScheme="messenger"
              >
                Subscribe
              </Button>
            </Link>
          </Stack>
        </Box>
      </main>
    </>
  );
}
