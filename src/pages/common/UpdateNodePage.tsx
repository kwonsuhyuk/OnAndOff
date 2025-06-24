import React from "react";
import { useNavigate } from "react-router-dom";
import { DEV_NOTES } from "@/constants/devnotes";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const UpdateNodePage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      {/* 헤더 */}
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          ← 뒤로가기
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">📢 업데이트 노트</h1>
          <p className="mt-1 text-sm text-muted-foreground">최신 기능 및 개선사항을 확인하세요.</p>
        </div>
      </div>

      <Separator />

      {/* 업데이트 카드 리스트 */}
      {DEV_NOTES.map(note => (
        <Card key={note.date} className="bg-background shadow-sm">
          <CardContent className="space-y-4 p-5">
            {/* 날짜 & 버전 */}
            <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground">
              <span>{note.date}</span>
              {note.version && <span className="text-xs">버전 {note.version}</span>}
            </div>

            {/* 주요 업데이트 강조 */}
            {note.isMajor && (
              <Badge variant="default" className="bg-red-500 text-white">
                주요 업데이트
              </Badge>
            )}

            {/* 요약 */}
            {note.summary && (
              <p className="text-base font-semibold text-foreground md:text-lg">{note.summary}</p>
            )}

            {/* 상세 변경 내용 */}
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground md:text-base">
              {note.updates.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            {/* 이미지 */}
            {note.image && (
              <img src={note.image} alt="업데이트 이미지" className="w-full rounded-md border" />
            )}
            {/* 태그 */}
            {note.tags && (
              <div className="flex flex-wrap gap-2 pt-2">
                {note.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UpdateNodePage;
