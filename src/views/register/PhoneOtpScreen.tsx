import { OtpRecord, OtpResponse, VerifyOTPResponse } from "../../types/jazzSub";
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect, useRef, FormEvent } from "react";
import useCampaignContext from "../../context/CampaignProvider";
import { useSendOTP, useSubPackage, useVerifyOTP } from "../../apis/jazzSub";
import OTPInput from "react-otp-input";
import { packagesPostpaid, packagesPrepaid } from "../../extra/packages";
import Package from "@/src/components/Package";
import PackageRadio from "@/src/components/PackageRadio";

type Values = {
  phone: string;
  otp: string;
  checked: boolean;
};
const url = "https://weatherwalay.com";
const phoneRegExp = /^03\d{9}$/;

const SECONDS = 119;
// const ATTEMPTS = 3;

type Props = {
  handleSuccess: (phone: string) => void;
};

function PhoneOtpScreen({ handleSuccess }: Props) {
  const toast = useToast();

  const [counter, setCounter] = useState<number>(SECONDS);
  const [formattedCounter, setFormattedCounter] = useState<string>("");
  const [status, setStatus] = useState<"phone" | "resend" | "subscribe">(
    "phone"
  );
  const [otpError, setOtpError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>("");
  const [packageError, setPackageError] = useState<boolean>(false);
  const [radio, setRadio] = useState<number | null>(null);

  const counterRef = useRef<any>();

  const { phoneNumber, carrierType, otpRecord, setOtpRecord } =
    useCampaignContext();
  const source = 10;
  const [values, setValues] = useState<Values>({
    phone: "",
    otp: "",
    checked: true,
  });

  const validateForm = () => {
    const { phone } = values;
    var error: string = "";

    if (!phone) {
      error = "Phone Number Required";
    } else if (phone.length !== 11) {
      error = "Phone number should have 11 digits";
    } else if (!phoneRegExp.test(phone)) {
      error = "Valid Format - 03XXXXXXXXX";
    }

    setPhoneError(error);
  };

  const startTimer = () => {
    counterRef.current = setInterval(() => {
      setCounter((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(counterRef.current);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };

  const onSubSuccess = (data: any) => {
    if (data.success) {
      toast({
        title: data?.msg || "Package Subscribed",
        status: "success",
        isClosable: true,
        position: "bottom",
      });
      handleSuccess(values.phone);
    } else {
      toast({
        title: data?.msg || "Unable To Subscribe Package",
        status: "error",
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const onSubError = (err: Error) => {
    toast({
      title: err.message || "Error",
      status: "error",
      isClosable: true,
      position: "bottom",
    });
  };

  const subPackage = useSubPackage(onSubSuccess, onSubError);

  const onVerifyOTPSuccess = (data: VerifyOTPResponse) => {
    if (data?.success || data?.subscriber) {
      const packageResponse = data.record;

      if (packageResponse?.package_type === 0) {
        const subPackageObj = {
          cellno: values.phone,
          source,
        };
        //there will be no network type if the user come from H.E
        if (packageResponse?.network_type) {
          const networkType = packageResponse.network_type;
          if (networkType === 1 || networkType === 2) {
            subPackage.mutate({ ...subPackageObj, package: radio });
          } else if (networkType === 3) {
            subPackage.mutate({ ...subPackageObj, package: radio });
          }
        } else {
          //the package will be assign automatically
          subPackage.mutate(subPackageObj);
        }
      } else {
        toast({
          title: data?.msg || "Already Subscribed",
          status: "info",
          isClosable: true,
          position: "bottom",
        });
        window.open(`${url}?phone=${values.phone}`, "_self");
      }
    } else {
      toast({
        title: data?.msg || "Unable To Verify",
        status: "error",
        isClosable: true,
        position: "bottom",
      });
    }
    // setAttempts((prevValue) => prevValue - 1);
  };

  const onVerifyOTPError = (err: Error) => {
    toast({
      title: err.message || "Error",
      status: "error",
      isClosable: true,
      position: "bottom",
    });
  };

  const verifyOtp = useVerifyOTP(onVerifyOTPSuccess, onVerifyOTPError);

  const onSendOtpSuccess = (data: OtpResponse) => {
    if (data?.success) {
      setOtpRecord(data?.record);
      setStatus("subscribe");
      setCounter(SECONDS);
      toast({
        title: data?.msg || "OTP Send",
        status: "success",
        isClosable: true,
        position: "bottom",
      });

      if (carrierType && data?.record?.otp) {
        toast({
          title: "Autofetching OTP",
          status: "loading",
          isClosable: true,
          position: "bottom",
          duration: 1000,
        });

        handleChange("otp", String(data?.record?.otp));
      }
    } else {
      toast({
        title: data?.msg || "Error Sending OTP",
        status: "error",
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const onSendOtpError = (err: Error) => {
    toast({
      title: err.message || "Error Sending OTP",
      status: "error",
      isClosable: true,
      position: "bottom",
    });
  };

  const sendOtp = useSendOTP(onSendOtpSuccess, onSendOtpError);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "phone" || status === "resend") {
      sendOtp.mutate({ phone: values.phone });
    } else if (status === "subscribe") {
      if (values.otp.length < 4) {
        setOtpError(true);
      } else if (values.checked === false) {
        setPackageError(true);
      } else {
        verifyOtp.mutate({
          submittedOTP: values.otp,
          phone: values.phone,
          source: source,
          ...otpRecord,
        });
        setOtpError(false);
        setPackageError(false);
      }
    }
  };

  const handleChangeNumber = () => {
    setOtpRecord({} as OtpRecord);
    setStatus("phone");
    setOtpError(false);
    handleChange("otp", "");
  };

  const handleChange = (name: keyof Values, value: string | boolean) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (status === "subscribe") {
      startTimer();
    }

    return () => clearInterval(counterRef.current);
  }, [status]);

  useEffect(() => {
    const minutes = Math.floor(counter / 60);
    const remainingSeconds = counter % 60;
    const formattedDuration = `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;

    setFormattedCounter(formattedDuration);

    if (counter <= 0) {
      setStatus("resend");
      handleChange("otp", "");
      setOtpError(false);
    }
  }, [counter]);

  useEffect(() => {
    if (carrierType) {
      toast({
        title: "Autofetching number",
        status: "loading",
        isClosable: true,
        position: "bottom",
        duration: 1000,
      });
      handleChange("phone", phoneNumber);
      sendOtp.mutate({ phone: phoneNumber, carrier: carrierType });
    }
  }, [carrierType]);

  useEffect(() => {
    if (otpRecord?.network_type) {
      if (otpRecord.network_type === 1 || otpRecord.network_type === 2) {
        setRadio(1);
      } else if (otpRecord.network_type === 3) {
        setRadio(3);
      }
    }
  }, [otpRecord?.network_type]);

  useEffect(() => {
    if (values?.phone || values?.otp) {
      validateForm();
    }
  }, [values]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={7} align={"center"} maxWidth={"350px"}>
        <FormControl
          isDisabled={status !== "phone"}
          isInvalid={!!phoneError}
          alignItems={"center"}
        >
          <FormLabel
            fontWeight={"600"}
            color="blackAlpha.800"
            fontSize={"md"}
            htmlFor="phone"
            textAlign={"center"}
            marginBottom={4}
          >
            Enter Your Valid Jazz Mobile Number
          </FormLabel>
          <Input
            id={"phone"}
            name="phone"
            type="tel"
            size="lg"
            placeholder={"03XXXXXXXXX"}
            textAlign="center"
            borderWidth={"2px"}
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={validateForm}
          />
          {!!phoneError && (
            <FormErrorMessage justifyContent={"center"}>
              <>{phoneError}</>
            </FormErrorMessage>
          )}
        </FormControl>
        <Stack spacing={4}>
          <HStack
            width={"full"}
            justify={
              status === "subscribe" || status === "resend"
                ? "space-between"
                : "center"
            }
            fontSize={"md"}
            fontWeight={"600"}
          >
            <Text color="blackAlpha.800">Enter OTP</Text>
            {status === "subscribe" || status === "resend" ? (
              <Text color={"blue.500"}>{formattedCounter}</Text>
            ) : null}
          </HStack>
          <OTPInput
            value={values.otp}
            onChange={(value) => handleChange("otp", value)}
            numInputs={4}
            inputType={"number"}
            inputStyle={{
              border: otpError ? "2px solid red" : "2px solid #CBD5E0",
              borderRadius: "6px",
              height: "48px",
              width: "100%",
              cursor: status !== "subscribe" ? "not-allowed" : "pointer",
            }}
            renderInput={(props) => (
              <input disabled={status !== "subscribe"} {...props} />
            )}
            renderSeparator={<span>&nbsp;&nbsp;</span>}
          />
        </Stack>
        <Button
          size="sm"
          py={7}
          mt={2}
          colorScheme="messenger"
          type="submit"
          borderRadius={15}
          textColor={"white"}
          shadow={"lg"}
          isLoading={
            sendOtp.isLoading || verifyOtp.isLoading || subPackage.isLoading
          }
          loadingText={
            status === "phone"
              ? "Generating OTP"
              : status === "resend"
              ? "Regenerating OTP"
              : status === "subscribe"
              ? "Subscribing"
              : ""
          }
          width={"full"}
        >
          {status === "phone"
            ? "Generate OTP"
            : status === "resend"
            ? "Regenerate OTP"
            : status === "subscribe"
            ? "Subscribe"
            : ""}
        </Button>

        <Stack direction={"column"} spacing={3} width={"100%"}>
          {(otpRecord.network_type === 1 || otpRecord.network_type === 2) &&
            packagesPrepaid.map((pack, index) => (
              <PackageRadio
                key={"pack" + index}
                radio={radio}
                pack={pack}
                setRadio={setRadio}
              />
            ))}
          {otpRecord.network_type === 3 &&
            packagesPostpaid.map((pack, index) => (
              <PackageRadio
                key={"pack" + index}
                radio={radio}
                pack={pack}
                setRadio={setRadio}
              />
            ))}

          {otpRecord?.network_type === null && (
            <HStack>
              <Package {...packagesPrepaid[0]} networkType="Prepaid" />
              <Package {...packagesPostpaid[0]} networkType="Postpaid" />
            </HStack>
          )}
        </Stack>

        <Stack spacing={5}>
          {status !== "subscribe" ? (
            <Text fontSize="sm">You will recieve a 4-digit OTP</Text>
          ) : null}

          {status !== "phone" && (
            <Button onClick={handleChangeNumber} size={"sm"} variant={"link"}>
              {"< Change Phone Number"}
            </Button>
          )}
        </Stack>

        <FormControl
          isDisabled={status !== "subscribe"}
          isInvalid={packageError && values.checked === false}
        >
          <Checkbox
            name="checked"
            size={"lg"}
            spacing={3}
            defaultChecked
            isChecked={values.checked}
            onChange={(e) => handleChange("checked", e.target.checked)}
          >
            <Text
              fontSize={"11px"}
              color={
                packageError && values.checked === false ? "red" : "gray.500"
              }
            >
              I have read and agreed to the{" "}
              <Link
                href="https://weatherwalay.com/company/terms"
                target={"_blank"}
                fontWeight={600}
                color="black"
              >
                T&C
              </Link>{" "}
              and{" "}
              <Link
                href="https://weatherwalay.com/company/privacy"
                target={"_blank"}
                fontWeight={600}
                color="black"
              >
                Privacy Policy
              </Link>
            </Text>
          </Checkbox>
        </FormControl>
      </Stack>
    </form>
  );
}

export default PhoneOtpScreen;
