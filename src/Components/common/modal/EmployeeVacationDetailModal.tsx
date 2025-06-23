import React from "react";
import { Calendar, User, BadgeCheck, FileText, PlaneTakeoff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TVacationRequest } from "@/model/types/vacation.type";
import { VACATION_STATUS_CLASSES, VACATION_TYPE_CLASS_MAP } from "@/constants/\bvacation";
import DetailModal from "@/components/common/modal/commonModalLayout/DetailModal";

interface TEmployeeVacationDetailModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  request: TVacationRequest;
  start: string;
  end: string;
  isSameDay: boolean;
  label: string;
}

const EmployeeVacationDetailModal = ({
  modalOpen,
  setModalOpen,
  request,
  start,
  end,
  isSameDay,
  label,
}: TEmployeeVacationDetailModalProps) => {
  const badgeTypeClass =
    VACATION_TYPE_CLASS_MAP[request.vacationType] ?? "bg-gray-400 text-white dark:bg-gray-500";
  const badgeStatusClass = VACATION_STATUS_CLASSES[label] || "bg-gray-400";

  return (
    <DetailModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      maxWidthClass="max-w-xl"
      title={
        <div className="flex items-center gap-2">
          <PlaneTakeoff className="h-5 w-5 text-primary dark:text-white" />
          <span className="text-base font-bold text-gray-800 dark:text-white">휴가 상세 정보</span>
          <span
            className={`rounded-full px-3 py-0.5 text-xs font-semibold text-white ${badgeStatusClass}`}
          >
            {label}
          </span>
        </div>
      }
    >
      <div className="mt-6 space-y-4 text-sm text-gray-800 dark:text-white">
        {/* 이름 */}
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400">이름</span>
          <span className="ml-auto font-medium text-gray-800 dark:text-white">
            {request.requester.name}
          </span>
        </div>

        {/* 직무 */}
        <div className="flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400">직무</span>
          <span className="ml-auto font-medium text-gray-800 dark:text-white">
            {request.requester.jobName}
          </span>
        </div>

        {/* 기간 */}

        <div className="flex items-start justify-between gap-2">
          {/* 아이콘 + 텍스트 */}
          <div className="flex shrink-0 items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">기간</span>
          </div>

          {/* 날짜 + 유형 */}
          <div className="flex flex-col items-end gap-2 text-right">
            <span className="font-medium text-gray-800 dark:text-white">
              {isSameDay ? start : `${start} ~ ${end}`}
            </span>
            <span
              className={`rounded-full border border-solid px-3 py-0.5 text-xs font-semibold ${badgeTypeClass}`}
            >
              {request.vacationType}
            </span>
          </div>
        </div>

        {/* 사유 */}
        <div className="flex items-center gap-2">
          <FileText className="mt-0.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400">사유</span>
          <span className="ml-auto break-words text-right font-medium text-gray-800 dark:text-white">
            {request.reason?.trim() || "-"}
          </span>
        </div>
      </div>
    </DetailModal>
  );
};

export default EmployeeVacationDetailModal;
