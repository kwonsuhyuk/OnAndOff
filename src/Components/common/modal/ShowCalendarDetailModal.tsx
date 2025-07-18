import { MapPin, CalendarDays, PlaneTakeoff, Briefcase, LogIn, LogOut } from "lucide-react";
import { TCommuteData } from "@/model/types/commute.type";
import { TRegisteredVacation } from "@/model/types/vacation.type";
import { useCompanyStore } from "@/store/company.store";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import DetailModal from "./commonModalLayout/DetailModal";

dayjs.extend(isBetween);

interface CommuteDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: string | null;
  commuteData: Record<string, TCommuteData>;
  vacationList: TRegisteredVacation[];
}

const CommuteDetailModal = ({
  open,
  onOpenChange,
  selectedDate,
  commuteData,
  vacationList = [],
}: CommuteDetailModalProps) => {
  const workPlaceList = useCompanyStore(state => state.currentCompany?.workPlacesList);
  const getWorkplaceNameById = (id?: string) => {
    if (!id) return undefined;
    if (id === "외근") return "외근";
    return workPlaceList?.find(w => w.id === id)?.name;
  };

  const commute = selectedDate ? commuteData[selectedDate] : null;
  const vacation = vacationList.find(v =>
    dayjs(selectedDate).isBetween(v.startDate, v.endDate, null, "[]"),
  );
  const isOutworking = commute?.startWorkplaceId === "외근";

  return (
    <DetailModal
      open={open}
      onClose={() => onOpenChange(false)}
      title={
        <span className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          {selectedDate}
        </span>
      }
      icon={null}
      maxWidthClass="max-w-xs"
    >
      {/* 외근 */}
      {isOutworking && (
        <div className="rounded-2xl border border-solid border-yellow-300 bg-yellow-50 px-4 py-6 shadow-sm dark:border-yellow-400 dark:bg-yellow-900/30">
          <div className="mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <h4 className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
              외근 정보
            </h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">외근 사유</span>
              <span className="ml-auto font-medium text-gray-800 dark:text-white">
                {commute?.outworkingMemo || "내용 없음"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">외근 시간</span>
              <span className="ml-auto font-medium text-gray-800 dark:text-white">
                {commute?.startTime ? dayjs(commute.startTime).format("YYYY-MM-DD HH:mm:ss") : "-"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 휴가 */}
      {vacation && (
        <div className="rounded-2xl border border-solid border-blue-200 bg-blue-50 px-4 py-6 text-sm shadow-sm dark:border-blue-400 dark:bg-blue-900/30">
          <div className="space-y-6">
            {/* 휴가 정보 제목 */}
            <div className="space-y-2">
              <div className="mb-5 flex items-center gap-2">
                <PlaneTakeoff className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  휴가 정보
                </h4>
              </div>

              {/* 휴가 정보 목록 */}
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 dark:text-gray-400">휴가 기간</span>
                  <span className="ml-auto font-medium text-gray-800 dark:text-white">
                    {vacation.startDate === vacation.endDate
                      ? vacation.startDate
                      : `${vacation.startDate} ~ ${vacation.endDate}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 dark:text-gray-400">휴가 유형</span>
                  <span className="ml-auto font-medium text-gray-800 dark:text-white">
                    {vacation.vacationType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 dark:text-gray-400">사유</span>
                  <span className="ml-auto font-medium text-gray-800 dark:text-white">
                    {vacation.reason || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 출근 정보 (외근 아니고 출근 기록이 있을 때) */}
      {commute?.startTime && !isOutworking && (
        <div className="rounded-2xl border border-solid border-gray-200 bg-white px-4 py-6 shadow-sm dark:border-zinc-600 dark:bg-zinc-800">
          <div className="space-y-6">
            {/* 출퇴근 시간 */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">출퇴근 시간</h4>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <LogIn className="h-4 w-4 text-green-500" />
                  <span className="text-gray-500 dark:text-gray-400">출근</span>
                  <span className="ml-auto font-medium text-gray-800 dark:text-white">
                    {dayjs(commute.startTime).format("HH:mm:ss")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <LogOut className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-500 dark:text-gray-400">퇴근</span>
                  <span className="ml-auto font-medium text-gray-800 dark:text-white">
                    {commute.endTime ? dayjs(commute.endTime).format("HH:mm:ss") : "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* 근무지 */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">근무지 정보</h4>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-500" />
                  <span className="text-gray-500 dark:text-gray-400">출근 근무지</span>
                  <span className="ml-auto font-medium text-gray-800 dark:text-white">
                    {getWorkplaceNameById(commute.startWorkplaceId) || "-"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-500 dark:text-gray-400">퇴근 근무지</span>
                  <span className="ml-auto font-medium text-gray-800 dark:text-white">
                    {getWorkplaceNameById(commute.endWorkplaceId) || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 출근 기록 없음 안내 */}
      {!vacation && !isOutworking && !commute?.startTime && (
        <div className="rounded-md border border-solid border-gray-200 bg-muted p-3 text-sm text-muted-foreground dark:border-zinc-700 dark:bg-zinc-800/30">
          출근 기록이 없습니다.
        </div>
      )}
    </DetailModal>
  );
};

export default CommuteDetailModal;
