import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useEmployeeSearch } from "./useEmployeeSearch";
import { EmployeeInfo } from "@/model/types/user.type";
import { registerVacation } from "@/api/vacation.api";
import { format } from "date-fns";
import { TVacationType } from "@/model/types/vacation.type";
import { useToast } from "../use-toast";

export const useVacationRegister = (
  onRegister: (newRequest: IVacationRequest) => void,
  onClose: () => void,
) => {
  const [vacationType, setVacationType] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [reason, setReason] = useState("");
  const { searchResults, setSearchResults, search } = useEmployeeSearch();
  const [inputValue, setInputValue] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInfo | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const maxDate = new Date();
  const { toast } = useToast();

  maxDate.setMonth(maxDate.getMonth() + 3);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setSearchResults]);

  const vacationDays =
    dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) + 1 : 0;

  const getYearMonthList = (start: Date, end: Date) => {
    const list = [];
    const current = new Date(start.getFullYear(), start.getMonth(), 1);

    while (current <= end) {
      list.push({
        year: String(current.getFullYear()),
        month: String(current.getMonth() + 1).padStart(2, "0"),
      });
      current.setMonth(current.getMonth() + 1);
    }

    return list;
  };

  const handleRegister = async () => {
    if (!vacationType || !dateRange?.from || !dateRange?.to || !selectedEmployee || !reason) {
      toast({
        title: "등록 실패",
        description: "필수 정보를 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const newRequest: IVacationRequest = {
      id: String(Date.now()),
      requestType: vacationType as TVacationType,
      requester: {
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        uid: selectedEmployee.uid,
        jobName: selectedEmployee.jobName,
      },
      requestDate: `${dateRange.from.toISOString().split("T")[0]} ~ ${dateRange.to.toISOString().split("T")[0]}`,
      reason,
      status: "자동승인",
      email: selectedEmployee.email,
    };

    const yearMonthList = getYearMonthList(dateRange.from, dateRange.to); // 두 달 걸쳐 있는 경우 대비
    const registerId = String(newRequest.id); // 중복 방지를 위한 ID

    for (const { year, month } of yearMonthList) {
      await registerVacation(
        selectedEmployee.companyCode,
        year,
        month,
        selectedEmployee.uid,
        registerId,
        {
          registerId,
          startDate: format(dateRange.from, "yyyy-MM-dd"),
          endDate: format(dateRange.to, "yyyy-MM-dd"),
          vacationType: vacationType as TVacationType,
          reason,
          status: "자동승인",
          createdAt: new Date().toISOString(),
          name: selectedEmployee.name,
          email: selectedEmployee.email,
          jobName: selectedEmployee.jobName,
        },
      );
    }
    onRegister(newRequest);
    toast({
      title: "등록 완료",
      description: `${selectedEmployee.name}님의 휴가가 정상 등록되었습니다.`,
    });
    onClose();
  };

  const handleDateChange: React.Dispatch<React.SetStateAction<DateRange | undefined>> = value => {
    const range = typeof value === "function" ? value(undefined) : value;
    if (!range?.from) return;

    if (vacationType === "반차") {
      setDateRange({ from: range.from, to: range.from });
    } else {
      setDateRange(range);
    }
  };

  // "반차"일 경우 하루 고정
  useEffect(() => {
    if (vacationType === "반차" && dateRange?.from) {
      setDateRange({ from: dateRange.from, to: dateRange.from });
    }
  }, [vacationType, dateRange?.from]);

  return {
    vacationType,
    setVacationType,
    dateRange,
    setDateRange,
    vacationDays,
    handleRegister,
    reason,
    setReason,
    inputValue,
    setInputValue,
    searchResults,
    setSearchResults,
    search,
    selectedEmployee,
    setSelectedEmployee,
    dropdownRef,
    maxDate,
    handleDateChange,
  };
};
