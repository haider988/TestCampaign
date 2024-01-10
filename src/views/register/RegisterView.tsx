import { memo } from "react";
// import SuccessScreen from "../SuccessScreen";
import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/layout";
import PhoneOtpScreen from "./PhoneOtpScreen";
import WWBanner from "../../assets/wwBanner.jpg";
import WWLogoText from "../../assets/logoWithText.svg";
import ShieldIcon from "../../assets/icons/shieldIcon.svg";
import DrHanif from "../../assets/icons/drHanifIcon.svg";
import TimeIcon from "../../assets/icons/timeIcon.svg";

import Image from "next/image";

const url = "https://weatherwalay.com";
type Props = {
  ttclid: any;
  gclid: any;
};

function RegisterView({ ttclid, gclid }: Props) {
  // const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = (phone: string) => {
    // setIsSuccess(true);
    if (ttclid) {
      // @ts-ignore
      window.ttq.track("Subscribe", null);
    }

    if (gclid) {
      // @ts-ignore
      window.gtag("event", "conversion", {
        send_to: "AW-11165809080/C2rhCOPGha8YELjzoswp",
      });
    }
    //redirecting to website with phone number as params
    window.open(`${url}?phone=${phone}`, "_self");
  };

  const FeatureCard = ({ src, text }: { src: string; text: string }) => (
    <Box
      height={"100px"}
      width={"100px"}
      padding={1.5}
      borderWidth={2}
      borderRadius={"2xl"}
      display={"grid"}
      placeItems={"center"}
    >
      <Box
        as={Image}
        h={"38px"}
        src={src}
        loading="eager"
        alt={text}
        borderRadius={10}
      />
      <Text fontSize={"10px"} textAlign={"center"} fontWeight={"semibold"}>
        {text}
      </Text>
    </Box>
  );

  return (
    // <>
    //   {isSuccess ? (
    //     <SuccessScreen />
    //   ) : (
    <HStack
      w={"90%"}
      maxW={"1300px"}
      mx={"auto"}
      gap={14}
      justify={"center"}
      align={"start"}
      paddingBottom={10}
      paddingY={{ base: 6, lg: 8 }}
    >
      <Flex direction={"column"} maxW={600} align={"center"} gap={8}>
        <Box
          as={Image}
          h={"70px"}
          src={WWLogoText}
          loading="eager"
          alt="پاکستان کی پہلی پرائیویٹ موسمیاتی کمپنی۔"
          borderRadius={10}
        />

        <Stack direction={"row"}>
          <FeatureCard src={ShieldIcon} text={"Get Lifesaving Timely Alerts"} />
          <FeatureCard src={DrHanif} text={"Weather by Dr. Hanif"} />
          <FeatureCard src={TimeIcon} text={"Monitor Weather Anomalies"} />
        </Stack>
        <PhoneOtpScreen handleSuccess={handleSuccess} />
      </Flex>
      <Box
        as={Image}
        position={"sticky"}
        top={120}
        src={WWBanner}
        display={{ base: "none", lg: "block" }}
        width={"50%"}
        loading={"lazy"}
        alt="Side Banner"
      />
    </HStack>
    //   )}
    // </>
  );
}

export default memo(RegisterView);
