import { useParams } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useCompanyStore } from "@/store/company.store";
import { useUserStore } from "@/store/user.store";
import { useCommuteStatus } from "@/hooks/employee/useCommuteStatus";
import OutWorkingModal from "@/components/common/modal/OutWorkingModal";
import CommuteConfirmModal from "@/components/common/modal/CommuteConfirmModal";
import WorkPlaceMap from "@/components/company/company-settings/workplace-setting/map/WorkPlaceMap";
import { useMemo, useState } from "react";
import { useUserLocation } from "@/hooks/employee/useUserLocation";
import { useNearbyWorkplaces } from "@/hooks/employee/useNearbyWorkplaces";
import CommuteLoading from "@/components/common/CommuteLoading";
import CommuteError from "@/components/common/CommuteError";
import { useCommuteModal } from "@/hooks/employee/useCommuteModal";
import CommuteNotFound from "@/components/employee/mainpageBox/CommuteNotFound";
import {
  CommuteButton,
  CommuteHeader,
  CommutePlaceList,
} from "@/components/employee/mainpageBox/CommutePageUI";
import { useDefaultSelectedPlace } from "@/hooks/employee/useDefaultSelectedPlace";

export default function CommutePage() {
  const userId = useUserStore(state => state.currentUser?.uid);
  const { workPlacesList } = useCompanyStore(
    useShallow(state => ({
      workPlacesList: state.currentCompany?.workPlacesList,
    })),
  );
  if (!workPlacesList)
    return (
      <>
        <CommuteNotFound />
      </>
    );

  const { location: userLocation, isLoading, error } = useUserLocation();
  const nearbyPlaces = useNearbyWorkplaces(userLocation, workPlacesList);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const selectedPlace = useMemo(
    () => nearbyPlaces?.find(p => p.id === selectedPlaceId),
    [selectedPlaceId, nearbyPlaces],
  );
  const { status } = useCommuteStatus();

  const isCheckoutMode = status === "checked-in-only";
  const { isConfirmOpen, setIsConfirmOpen, handleCommuteModal, handleConfirmCommute } =
    useCommuteModal({
      userLocation,
      selectedPlace,
      userId,
      status,
    });
  useDefaultSelectedPlace(nearbyPlaces, setSelectedPlaceId);

  if (isLoading) return <CommuteLoading />;

  if (error)
    return (
      <>
        <CommuteError error={error}>
          <div className="space-y-4 rounded-md border border-red-300 bg-red-50 p-4 text-left text-sm text-red-700">
            <div>
              <p className="mb-2 font-medium">
                현재 위치 정보 접근이 차단되어 출근 처리가 불가능합니다. 아래 안내에 따라 위치
                권한을 허용해 주세요.
              </p>

              <p className="mb-1 font-semibold">📱 iPhone (iOS, Safari 기반)</p>
              <ul className="mb-3 list-disc pl-5">
                <li>
                  사파리 앱 실행 → 주소창 왼쪽 <strong>「가로줄 아이콘 (aA)」</strong> 탭
                </li>
                <li>
                  「웹사이트 설정」 → 「위치」를 <strong>허용</strong>으로 변경
                </li>
                <li>
                  또는: 설정 → Safari → 위치 → <strong>“웹사이트마다 물어보기”</strong>로 설정
                </li>
              </ul>

              <p className="mb-1 font-semibold">📱 Android (PWA 또는 크롬 기반)</p>
              <ul className="mb-3 list-disc pl-5">
                <li>홈 화면에 설치한 앱 실행 후</li>
                <li>
                  오른쪽 상단 <strong>「⋮」 (더보기)</strong> 메뉴 → <strong>사이트 설정</strong>{" "}
                  선택
                </li>
                <li>
                  「위치」 → <strong>허용</strong>으로 변경
                </li>
                <li>또는 크롬 앱 실행 → 주소창에 사이트 입력 → 🔒 아이콘 탭 → 위치 권한 허용</li>
              </ul>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={() => window.location.reload()}
                className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                새로고침
              </button>
            </div>
          </div>
        </CommuteError>
        {status && <OutWorkingModal isCheckout={isCheckoutMode} status={status} />}
      </>
    );

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4">
      {nearbyPlaces?.length > 0 ? (
        <div className="w-full max-w-md space-y-6">
          <CommuteHeader isCheckoutMode={isCheckoutMode} />
          {selectedPlace && (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <WorkPlaceMap
                lat={selectedPlace.lat}
                lng={selectedPlace.lng}
                isLoaded={!isLoading}
                markerDragAble={false}
                onLocationSelect={() => {}}
                radius={selectedPlace.radius}
              />
            </div>
          )}
          <CommutePlaceList
            places={nearbyPlaces}
            selectedPlaceId={selectedPlaceId}
            onSelect={setSelectedPlaceId}
          />
          <CommuteButton
            isCheckoutMode={isCheckoutMode}
            disabled={!selectedPlaceId}
            onClick={handleCommuteModal}
          />
        </div>
      ) : (
        <CommuteNotFound />
      )}
      {status && <OutWorkingModal isCheckout={isCheckoutMode} status={status} />}
      {selectedPlace && (
        <CommuteConfirmModal
          open={isConfirmOpen}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirmCommute}
          place={selectedPlace}
          isCheckoutMode={isCheckoutMode}
        />
      )}
    </div>
  );
}
