export interface IDevNote {
  date: string;
  version?: string;
  summary?: string;
  updates: string[];
  tags?: string[];
  isMajor?: boolean;
  image?: string;
}

export const DEV_NOTES: IDevNote[] = [
  {
    date: "2025.06.24",
    version: "v1.0.0",
    summary: "🎉 On&Off 서비스 첫 정식 출시",
    updates: [
      "출퇴근 등록 및 조회 기능 제공",
      "관리자 근태 승인 및 휴가 관리 기능",
      "다크모드 지원 및 모바일 반응형 UI 적용",
    ],
    tags: ["출시", "근태관리", "관리자기능"],
    isMajor: true,
  },
];
