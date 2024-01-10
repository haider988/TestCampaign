import {
  OtpResponse,
  SendOtpObj,
  SubPackage,
  UpdatePackage,
  VerifyOTP,
  VerifyOTPResponse,
} from "../types/jazzSub";
import { BSS_URL } from "./baseUrl";
import { useState } from "react";

const useSendOTP = (
  onSuccess?: (data: OtpResponse) => void,
  onError?: (err: Error) => void
) => {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (sendOtpObj: SendOtpObj) => {
    try {
      setIsLoading(true);

      const response = await BSS_URL.post("otp/send-otp", sendOtpObj);
      const data = response.data;

      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    } catch (err: any) {
      if (onError) {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
  };
};

const useVerifyOTP = (
  onSuccess?: (data: VerifyOTPResponse) => void,
  onError?: (data: Error) => void
) => {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (opt: VerifyOTP) => {
    try {
      setIsLoading(true);

      const response = await BSS_URL.post("otp/verify-otp", opt);
      const data = response.data;

      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    } catch (err: any) {
      if (onError) {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
  };
};

const useSubPackage = (
  onSuccess?: (data: any) => void,
  onError?: (data: Error) => void
) => {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (subPackage: SubPackage) => {
    try {
      setIsLoading(true);

      const response = await BSS_URL.post("subscribe/jazz", subPackage);
      const data = response.data;

      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    } catch (err: any) {
      if (onError) {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
  };
};

const useUpdatePackage = (
  onSuccess?: (data: any) => void,
  onError?: (data: Error) => void
) => {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (updatePackage: UpdatePackage) => {
    try {
      setIsLoading(true);

      const response = await BSS_URL.post(
        "packages/jazz-change-package",
        updatePackage
      );
      const data = response.data;

      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    } catch (err: any) {
      if (onError) {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
  };
};

export { useSendOTP, useVerifyOTP, useSubPackage, useUpdatePackage };
