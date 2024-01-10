import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import LogoMark from "../assets/logomark.svg";
import Appstore from "../assets/appstore.svg";
import GooglePlay from "../assets/googleplay.svg";
import Image from "next/image";

const blueBrandColor = "#001B60";
const googlePlayStore =
  "https://play.google.com/store/apps/details?id=com.weatherwalay.pakweather.weathertoday";
const appleAppStore = "https://apps.apple.com/pk/app/weatherwalay/id1643122025";
const website = "https://weatherwalay.com";

const SuccessScreen = () => {
  return (
    <Stack
      align={"center"}
      justify={"center"}
      w="90%"
      maxW={600}
      mx={"auto"}
      mb={10}
      minH={"85vh"}
      spacing={10}
    >
      <Text fontSize={"3xl"} fontWeight={"bold"} color={"#38A169"}>
        Success
      </Text>
      <VStack align={"center"} justify={"center"}>
        <Box bg="white" shadow="lg" borderRadius="3xl" p={4}>
          <Box
            as={Image}
            w={100}
            src={LogoMark}
            alt="Weatherwalay Logo Mark"
            loading="eager"
          />
        </Box>
        <Heading
          as="h1"
          size="md"
          textAlign={{ base: "center", lg: "start" }}
          color={blueBrandColor}
          pt={8}
        >
          Download WeatherWalay Mobile App
        </Heading>
        <Text
          textAlign={{ base: "center", lg: "start" }}
          fontSize="sm"
          fontWeight={500}
          color="grey"
          maxW={600}
        >
          Accurate weather at your finger tips with AR mode, Camera weather
          overlay and many more feature ...
        </Text>
        <Flex gap={4} paddingTop={4}>
          <Tooltip
            px={4}
            py={2}
            borderRadius="lg"
            gutter={14}
            placement="bottom"
            hasArrow
            fontSize={"12px"}
          >
            <Box
              as={Image}
              minW={150}
              w={150}
              loading="eager"
              src={GooglePlay}
              alt="GooglePlay Icon"
              onClick={() => window.open(googlePlayStore)}
              transition={"all 0.3s ease-in-out"}
              _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
            />
          </Tooltip>

          <Tooltip
            px={4}
            py={2}
            borderRadius="lg"
            gutter={14}
            placement="bottom"
            hasArrow
            fontSize={"12px"}
          >
            <Box
              as={Image}
              minW={150}
              w={150}
              loading="eager"
              src={Appstore}
              alt="Appstore Icon"
              onClick={() => window.open(appleAppStore)}
              transition={"all 0.3s ease-in-out"}
              _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
            />
          </Tooltip>
        </Flex>
      </VStack>
      <Button
        size="sm"
        px={20}
        py={6}
        w={"full"}
        colorScheme="messenger"
        borderRadius={15}
        shadow={"lg"}
        onClick={() => window.open(website)}
        width={"fit-content"}
      >
        WeatherWalay Website
      </Button>
    </Stack>
  );
};

export default SuccessScreen;
