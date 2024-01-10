// import SuccessScreen from "../SuccessScreen";
import { Box, Flex, HStack } from "@chakra-ui/react";
import PhoneOtpScreen from "./PhoneOtpScreen";
import WWBanner from "../../assets/wwBanner.jpg";
import WWLogoText from "../../assets/logoWithText.svg";
import UrduPrompt from "../../assets/urdu_prompt.svg";
import Image from "next/image";

const url = "https://weatherwalay.com";
type Props = {
  ttclid: any;
  gclid: any;
};

function SubscribeView({ ttclid, gclid }: Props) {
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
          h={"80px"}
          src={WWLogoText}
          loading="eager"
          alt="پاکستان کی پہلی پرائیویٹ موسمیاتی کمپنی۔"
        />

        <Box
          as={Image}
          w={"340px"}
          h={"80px"}
          src={UrduPrompt}
          loading="lazy"
          alt="ویدر والے کے بروقت الرٹس سے اپنا قیمتی جانی اور مال نقصان بچائیں"
        />

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

export default SubscribeView;
