import { memo, useCallback } from "react";
// import SuccessScreen from "../SuccessScreen";
import WWBanner from "../../assets/wwBanner.jpg";
import { Box, Flex, HStack } from "@chakra-ui/layout";
import PhoneOtpScreen from "./PhoneOtpScreen";
import CampaginBanner2 from "../../assets/campaignBanner2.jpg";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {
  ttclid: any;
  gclid: any;
  kwaiid: any;
};

function CampaignsView({ ttclid, gclid, kwaiid }: Props) {
  // const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSuccess = useCallback(async (phone: string) => {
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

    if (kwaiid) {
      router.push(`/success?phone=${phone}`);
    } else {
      //redirecting to website with phone number as params
      window.open(`https://weatherwalay.com?phone=${phone}`, "_self");
    }
  }, []);

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
      paddingY={{ base: 4, lg: 8 }}
    >
      <Flex
        direction={"column"}
        maxW={600}
        align={"center"}
        gap={{ base: 5, lg: 10 }}
      >
        {/* <Box
          as={Image}
          loading="eager"
          h={"60px"}
          w={"370px"}
          src={CampaginBanner2}
          alt="Top Banner"
          borderRadius={10}
        /> */}
        <Image
          src={CampaginBanner2}
          loading="lazy"
          height={60}
          width={370}
          alt="Top Banner"
          style={{ borderRadius: 10 }}
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

export default memo(CampaignsView);
