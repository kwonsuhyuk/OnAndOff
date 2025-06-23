import React from "react";
import { PlaneTakeoff, User, BadgeCheck, Calendar, FileText, Check, X } from "lucide-react";

import { StatusBadge } from "@/components/company/table/VacationColumns";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useVacationDetailModal } from "@/hooks/manager/useVacationDetailModal";
import DetailModal from "@/components/common/modal/commonModalLayout/DetailModal";
import { VACATION_TYPE_CLASS_MAP } from "@/constants/\bvacation";

interface IVacationDetailModalProps {
  request: IVacationRequest;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const VacationDetailModal = ({
  request,
  onClose,
  onApprove,
  onReject,
}: IVacationDetailModalProps) => {
  if (!request) return null;

  const badgeTypeClass =
    VACATION_TYPE_CLASS_MAP[request.requestType] ?? "bg-gray-400 text-white dark:bg-gray-500";
  const { isPending, detailRows, displayRequestDate, handleApproveClick, handleRejectClick } =
    useVacationDetailModal(request, onApprove, onReject, onClose);

  return (
    <DetailModal
      open
      onClose={onClose}
      maxWidthClass="max-w-xl"
      title={
        <div className="flex items-center gap-2">
          <PlaneTakeoff className="h-5 w-5 text-primary dark:text-white" />
          <span className="text-base font-bold text-gray-800 dark:text-white">휴가 상세 정보</span>
          <StatusBadge status={request.status} />
        </div>
      }
    >
      {/* 상세 정보 */}
      <div className="my-10 space-y-6 text-sm text-gray-800 dark:text-white">
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
          <div className="flex shrink-0 items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">기간</span>
          </div>

          <div className="flex flex-col items-end gap-2 text-right">
            <span className="font-medium text-gray-800 dark:text-white">{displayRequestDate}</span>
            <span
              className={`rounded-full border border-solid px-3 py-0.5 text-xs font-semibold ${badgeTypeClass}`}
            >
              {request.requestType}
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

      {isPending && (
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={handleApproveClick}
            className="flex items-center gap-2 rounded-md border border-emerald-500 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-transparent dark:text-emerald-300"
          >
            <Check className="h-4 w-4" />
            수락
          </button>
          <button
            onClick={handleRejectClick}
            className="flex items-center gap-2 rounded-md border border-red-500 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:bg-transparent dark:text-red-300"
          >
            <X className="h-4 w-4" />
            거절
          </button>
        </div>
      )}
    </DetailModal>
  );
};

export default VacationDetailModal;
