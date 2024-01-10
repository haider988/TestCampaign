import { PackageProps } from "@/src/types/packages";
import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

type Radio = number | null;

type Props = {
  radio: Radio;
  setRadio: React.Dispatch<React.SetStateAction<Radio>>;
  pack: PackageProps;
};

const PackageRadio = ({ pack, radio, setRadio }: Props) => {
  const handleSelect = (value: any) => {
    setRadio(value);
  };

  return (
    <HStack
      px={6}
      py={3}
      justify={"space-between"}
      borderRadius={10}
      bgColor={"gray.100"}
      cursor={"pointer"}
      onClick={() => handleSelect(pack.package_type)}
      border={pack.package_type === radio ? "2px solid #0952DF" : "none"}
      width={"350px"}
    >
      <HStack flex={1}>
        <Box
          border={"2px solid #DADADA"}
          borderRadius={"full"}
          minW={"18px"}
          minH={"18px"}
          bgColor={pack.package_type === radio ? "#0952DF" : "none"}
          transition={"all .15s linear"}
        />
        <Text fontSize={"14px"}>{pack.name}</Text>
      </HStack>
      <HStack>
        <Text fontSize={"sm"} fontWeight={600} textColor={"blue.400"}>
          Rs {pack.price}
        </Text>
        <Text fontSize={"sm"} textColor={"gray.400"}>
          + T/{pack.durationUnit}
        </Text>
      </HStack>
    </HStack>
  );
};

export default PackageRadio;
