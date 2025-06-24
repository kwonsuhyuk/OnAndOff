import RegisterModal from "@/components/common/modal/commonModalLayout/RegisterModal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useVacationRegister } from "@/hooks/manager/useVacationRegisterModal";
import { VACATIONSELECT_TYPES } from "@/constants/vacationSelect";
import AutoCompleteUserInput from "../AutoCompleteInput";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import { EmployeeInfo } from "@/model/types/user.type";

interface IVacationModalProps {
  onClose: () => void;
  onRegister: (newRequest: IVacationRequest) => void;
}

const VacationRegisterModal: React.FC<IVacationModalProps> = ({ onClose, onRegister }) => {
  const {
    vacationType,
    setVacationType,
    dateRange,
    setDateRange,
    vacationDays,
    handleRegister,
    reason,
    setReason,
    setInputValue,
    setSelectedEmployee,
    maxDate,
    handleDateChange,
  } = useVacationRegister(onRegister, onClose);

  const { employeeList } = useEmployeeList();

  return (
    <RegisterModal
      open
      onClose={onClose}
      title="휴가 등록"
      onSubmit={handleRegister}
      submitLabel="등록"
    >
      <div className="space-y-6">
        {/* 휴가 대상 */}
        <section className="space-y-2">
          <label className="block text-sm font-medium text-gray-800 dark:text-white-text">
            휴가 대상
          </label>
          <AutoCompleteUserInput
            users={employeeList as EmployeeInfo[]}
            onSelect={(emp: EmployeeInfo | null) => {
              setSelectedEmployee(emp);
              setInputValue(`${emp?.name} (${emp?.email})`);
            }}
          />
        </section>

        {/* 휴가 유형 */}
        <section className="space-y-2">
          <label className="block text-sm font-medium text-gray-800 dark:text-white-text">
            휴가 유형
          </label>
          <Select value={vacationType} onValueChange={setVacationType}>
            <SelectTrigger className="w-full dark:text-white-text">
              <SelectValue placeholder="휴가 유형 선택" />
            </SelectTrigger>
            <SelectContent className="dark:border dark:border-dark-border dark:bg-white-card-bg dark:text-white-text">
              {VACATIONSELECT_TYPES.map(type => (
                <SelectItem
                  key={type}
                  value={type}
                  className="dark:text-white-text dark:hover:bg-white-bg"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {vacationType === "반차" && (
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              ※ 반차는 하루만 선택할 수 있으며, 오전/오후 선택은 별도 설정 없이 처리됩니다.
            </p>
          )}
        </section>

        {/* 사용 기간 */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-800 dark:text-white-text">
              사용 기간
            </label>
            {vacationDays > 0 && (
              <div className="rounded-md border px-2 py-1 text-sm text-gray-700 dark:border-dark-border dark:bg-white-bg dark:text-white-text">
                {vacationDays}일
              </div>
            )}
          </div>
          <DateRangePicker
            date={dateRange}
            setDate={handleDateChange}
            toDate={maxDate}
            vacationType={vacationType}
            handleDateChange={handleDateChange}
          />
          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            ※ 휴가 등록은 <strong>최대 3개월</strong> 이후까지만 가능합니다.
          </p>
        </section>

        {/* 사유 */}
        <section className="space-y-2">
          <label className="block text-sm font-medium text-gray-800 dark:text-white-text">
            사유
          </label>
          <textarea
            className="h-24 w-full resize-none rounded-md border border-gray-300 p-2 text-sm dark:border-dark-border dark:bg-white-bg dark:text-white-text"
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="간단한 사유를 입력해주세요"
          />
        </section>
      </div>
    </RegisterModal>
  );
};

export default VacationRegisterModal;
