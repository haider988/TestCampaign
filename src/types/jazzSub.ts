//context types

export type ProviderProps = { children: React.ReactNode };

export type JazzSubProps = {
  source: number;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  otpRecord: OtpRecord;
  setOtpRecord: React.Dispatch<React.SetStateAction<OtpRecord>>;
  subRecord: SubPackageRecord;
  setSubRecord: React.Dispatch<React.SetStateAction<SubPackageRecord>>;
  carrierType: CarrierType;
  setCarrierType: React.Dispatch<React.SetStateAction<CarrierType>>;
};

export type CarrierType = "jazz" | "ufone" | null;

//api types
export type SendOtpObj = {
  phone: string;
  carrier?: CarrierType;
};

export type OtpRecord = {
  token: string;
  carrier: string;
  network_type: number | null;
  otp: string;
  packages: Array<Packages>;
};

export type OtpResponse = {
  success: boolean;
  msg: string;
  record: OtpRecord;
};

export type VerifyOTP = {
  phone: string;
  submittedOTP: string;
  token: string;
  carrier: string;
  network_type: number | null;
  source: number;
};

export type VerifyOTPResponse = {
  success: boolean;
  msg: string;
  subscriber: boolean;
  record: SubPackageRecord;
};

export type Packages = {
  name: string;
  package_type: number;
  price: number;
  duration: number;
  durationUnit: string;
};

export type SubPackageRecord = {
  network_type: number;
  network_name: string;
  package_type: number;
  packages: Array<Packages>;
};

export type SubPackage = {
  cellno: string;
  package?: number | null;
  source: number;
};

export type UpdatePackage = {
  cellno: string;
  previousPackage: number;
  newPackage: number;
};
