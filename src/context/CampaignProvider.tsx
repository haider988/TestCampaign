import { createContext, useContext, useState } from "react";
import {
  CarrierType,
  JazzSubProps,
  OtpRecord,
  ProviderProps,
  SubPackageRecord,
} from "../types/jazzSub";

const CampaignContext = createContext<JazzSubProps>({} as JazzSubProps);

const CampaignProvider = ({ children }: ProviderProps) => {
  const source = 5;
  const [step, setStep] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otpRecord, setOtpRecord] = useState<OtpRecord>({} as OtpRecord);
  const [subRecord, setSubRecord] = useState<SubPackageRecord>(
    {} as SubPackageRecord
  );
  const [carrierType, setCarrierType] = useState<CarrierType>(null);

  const value: JazzSubProps = {
    source,
    step,
    setStep,
    phoneNumber,
    setPhoneNumber,
    otpRecord,
    setOtpRecord,
    subRecord,
    setSubRecord,
    carrierType,
    setCarrierType,
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
};

const useCampaignContext = () => {
  return useContext(CampaignContext);
};

export default useCampaignContext;
export { CampaignProvider };
