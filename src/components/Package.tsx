import { Flex, Text, VStack } from "@chakra-ui/layout";
import { PackageProps } from "../types/packages";

const Package = ({ price, durationUnit, networkType }: PackageProps) => (
  <Flex
    bgColor={"#f9f9f9"}
    w={"100%"}
    justify={"space-between"}
    paddingInline={networkType ? 2 : 3}
    paddingBlock={networkType ? 1 : 2}
    borderRadius={6}
    borderWidth={"2px"}
    fontSize={12}
    fontWeight={600}
    align={"end"}
  >
    {networkType ? (
      <VStack flex={1} align={"start"} spacing={0}>
        <Text>{networkType}</Text>
        <Text color={"blackAlpha.700"}>Rs: {price}</Text>
      </VStack>
    ) : (
      <Text color={"blackAlpha.700"}>Rs: {price}</Text>
    )}

    <Text color={"blackAlpha.500"}>+T/{durationUnit}</Text>
  </Flex>
);

export default Package;
