import { TLoginForm } from "@/model/types/authTypes/login.type";
import { TSignupFormData } from "@/model/types/authTypes/signup.type";
import { getData, setData } from ".";
import { TCompanyInfo } from "@/model/types/company.type";
import { encrypt } from "@/util/encryptDecrypt.util";
import { TCMUserData, TEmpUserData } from "@/model/types/user.type";
import { getCompanyPath, getUserPath } from "@/constants/api.path";
import { companyFormSchema } from "@/model/schema/managerFirstSchema/managerFirst.schema";
import { z } from "zod";
import { apiRequest, tokenStorage } from "./http.api";

type ApiAuthUser = {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  companyCode: string;
  companyName: string;
  userType: "manager" | "employee";
  jobName?: string;
  employmentType?: TEmpUserData["employmentType"];
  salaryType?: string;
  salaryAmount?: number;
};

type AuthResponse = {
  user: ApiAuthUser;
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: string;
};

export const mapApiUser = (user: ApiAuthUser): TEmpUserData | TCMUserData => {
  const base = {
    uid: user.id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    companyCode: user.companyCode,
  };
  return user.userType === "manager"
    ? { ...base, userType: "manager" }
    : ({
        ...base,
        userType: "employee",
        jobName: user.jobName ?? "",
        employmentType: user.employmentType,
        salaryType: user.salaryType,
        salaryAmount: user.salaryAmount,
      } as TEmpUserData);
};

export async function login({ email, password }: TLoginForm) {
  try {
    const response = await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    tokenStorage.set(response.accessToken);
    return { success: true as const, data: { user: mapApiUser(response.user) } };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "로그인 실패",
    };
  }
}

export async function signup({
  email,
  password,
  name,
  companyCode,
  phoneNumber,
  position,
}: TSignupFormData) {
  try {
    const response = await apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
        companyCode,
        phoneNumber,
        position,
      }),
    });
    tokenStorage.set(response.accessToken);
    return { success: true as const, data: { user: mapApiUser(response.user) } };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "회원가입 실패",
    };
  }
}

export async function validateCompanyCode(code: string) {
  try {
    const company = await apiRequest<{ companyName: string }>(
      `/auth/companies/${encodeURIComponent(code)}`,
    );
    return { isValid: true, companyName: company.companyName };
  } catch (error) {
    return { isValid: false, error: error instanceof Error ? error.message : "회사 확인 실패" };
  }
}

export async function getCurrentUser() {
  const user = await apiRequest<ApiAuthUser>("/auth/me");
  return mapApiUser(user);
}

export function logout() {
  tokenStorage.clear();
}

export async function setEmployeeUser({
  name,
  uid,
  email,
  phoneNumber,
  companyCode,
  jobName,
  employmentType,
}: TEmpUserData) {
  const userData = {
    name,
    uid,
    email,
    phoneNumber,
    companyCode,
    jobName,
    employmentType,
    userType: "employee",
  };

  return await setData(
    getUserPath(companyCode, uid),
    userData,
    "직원이 성공적으로 등록되었습니다.",
  );
}

export async function setCompanyAndManagerData({
  formData,
  userId,
  companyCode,
  name,
  email,
  phoneNumber,
}: {
  formData: z.infer<typeof companyFormSchema>;
  userId: string;
  companyCode: string;
  name: string;
  email: string;
  phoneNumber?: string;
}) {
  if (!companyCode || !userId) {
    return { success: false, error: "회사 코드 또는 사용자 ID가 없습니다." };
  }

  const companyData: TCompanyInfo = {
    companyName: formData.companyBasic.companyName,
    adminName: formData.companyBasic.adminName,
    companyLogo: formData.companyBasic.companyLogo || "",
    companyIntro: formData.companyBasic.companyIntro,
    isDayNight: formData.companyNightHoliday.isDayNight,
    nightStart: formData.companyNightHoliday.nightStart || "0",
    nightEnd: formData.companyNightHoliday.nightEnd || "0",
    payCheckDay: formData.companyNightHoliday.payCheckDay || "1",
    nightPay: formData.companyNightHoliday.nightPay!,
    isHoliday: formData.companyNightHoliday.isHoliday,
    holidayPay: formData.companyNightHoliday.holidayPay!,
    holidayList: formData.companyNightHoliday.holidayList || [],
    jobList: formData.companyJobList.companyJobs || [],
    companyCode,
    qrValue: encrypt(companyCode),
    workPlacesList: formData.companyWorkPlacesList.companyWorkPlaces,
  };

  const userData: TCMUserData = {
    name: name!,
    uid: userId,
    email: email!,
    phoneNumber: phoneNumber || "",
    userType: "manager",
    companyCode,
  };

  // 회사 정보 및 관리자 정보 저장
  const companyResult = await setData(`${getCompanyPath(companyCode)}/companyInfo`, companyData);
  const userResult = await setData(getUserPath(companyCode, userId), userData);

  if (companyResult.success && userResult.success) {
    return { success: true, message: "회사 및 관리자 정보가 성공적으로 설정되었습니다." };
  }

  return { success: false, error: companyResult.error || userResult.error };
}
