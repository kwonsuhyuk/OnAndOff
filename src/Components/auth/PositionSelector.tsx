import { TPosition } from "@/model/types/position.type";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, User } from "lucide-react";
import { cn } from "@/util/cn.util";

interface IPositionSelectorProps {
  position: TPosition | undefined;
  onPositionChange: (value: TPosition) => void;
}

export const PositionSelector = ({ position, onPositionChange }: IPositionSelectorProps) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <Label className="mb-3 block text-lg font-semibold text-gray-700">가입 포지션</Label>

      <Tabs
        value={position}
        onValueChange={value => onPositionChange(value as TPosition)}
        className="w-full"
      >
        <TabsList className="grid h-auto grid-cols-2 gap-2 rounded-lg bg-white p-1">
          {/* 관리자 선택 */}
          <TabsTrigger
            value="manager"
            className={cn(
              "flex flex-col items-center space-y-1 rounded-lg border p-4 transition-all",
              "data-[state=active]:border-blue-200 data-[state=active]:bg-blue-200",
            )}
          >
            <Briefcase className="h-6 w-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">관리자</span>
          </TabsTrigger>

          <TabsTrigger
            value="employee"
            className={cn(
              "flex flex-col items-center space-y-1 rounded-lg border p-4 transition-all",
              "data-[state=active]:border-green-200 data-[state=active]:bg-green-200",
            )}
          >
            <User className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium text-gray-700">직원</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
