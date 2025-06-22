import iphoneImg from "@/assets/guideImg/iphoneguide.jpeg";
import iphoneImg2 from "@/assets/guideImg/iphoneguide2.jpeg";
import galaxyguide from "@/assets/guideImg/androidguide.jpeg";
import galaxyguide2 from "@/assets/guideImg/androidguide2.jpeg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import PoweredByFooter from "@/components/common/PoweredByFooter";

const GUIDE_DATA = {
  iphone: [
    {
      title: "Safari로 해당 앱 접속",
      description: (
        <div className="space-y-2">
          <p>
            Safari 브라우저로 접속 후, 아래 공유 버튼을 클릭하세요.
            <br />
            <a href="https://onoffatt.site" className="text-blue-600 underline">
              https://onoffatt.site
            </a>
          </p>
          <img src={iphoneImg} alt="아이폰 가이드 1" className="w-full rounded-md" />
        </div>
      ),
    },
    {
      title: "홈 화면 추가 버튼 클릭",
      description: (
        <div className="space-y-2">
          <p>
            공유 버튼 클릭 후 아래로 스크롤 하여
            <span className="font-semibold text-blue-700"> 홈 화면에 추가</span> 클릭
          </p>
          <p>
            ※ 반드시 <span className="font-bold text-red-400">메인 페이지</span>에서 다운로드를
            진행하셔야 합니다.
          </p>
          <img src={iphoneImg2} alt="아이폰 가이드 2" className="w-full rounded-md" />
        </div>
      ),
    },
  ],
  galaxy: [
    {
      title: "크롬 브라우저로 접속",
      description: (
        <div className="space-y-2">
          <p>
            크롬으로 접속 후, 오른쪽 상단 점 세개 클릭
            <br />
            <a href="https://onoffatt.site" className="text-blue-600 underline">
              https://onoffatt.site
            </a>
          </p>
          <img src={galaxyguide} alt="갤럭시 가이드 1" className="w-full rounded-md" />
        </div>
      ),
    },
    {
      title: "홈 화면 추가 버튼 클릭",
      description: (
        <div className="space-y-2">
          <p>
            <span className="font-semibold text-blue-700">홈 화면에 추가</span> 또는
            <span className="font-semibold"> 웹 어플리케이션 다운로드</span> 클릭
          </p>
          <p>
            ※ 반드시 <span className="font-bold text-red-400">메인 페이지</span>에서 다운로드를
            진행하셔야 합니다.
          </p>
          <img src={galaxyguide2} alt="갤럭시 가이드 2" className="w-full rounded-md" />
          <p className="text-sm text-destructive">
            해결되지 않으면,
            <a
              href="https://iboxcomein.com/adding-a-site-shortcut-to-the-galaxy-home-screen/"
              className="underline"
            >
              여기를 클릭하세요
            </a>
          </p>
        </div>
      ),
    },
  ],
};

const AppGuidePage = () => {
  useEffect(() => {
    localStorage.setItem("app_guide_seen", "true");
  }, []);

  return (
    <main className="mx-auto max-w-4xl space-y-10 bg-slate-100 px-4 py-12 dark:bg-zinc-900">
      <h1 className="flex flex-col items-center justify-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 dark:border-zinc-600 dark:bg-zinc-700 dark:text-gray-100 dark:hover:bg-zinc-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>뒤로가기</span>
        </button>
        On & Off 앱 다운로드 가이드
      </h1>

      <p className="mb-4 text-center text-gray-600 dark:text-gray-300">
        기기에 맞게 탭을 선택하여 앱 바로가기 등록 방법을 따라 해보세요.
      </p>

      <Tabs defaultValue="iphone" className="w-full space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <TabsList className="grid w-full grid-cols-2 border-b border-gray-300 dark:border-zinc-600">
            <TabsTrigger
              value="iphone"
              className="w-full border-b-2 border-transparent px-4 text-center text-sm font-semibold text-gray-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:text-gray-300 dark:data-[state=active]:border-blue-400 dark:data-[state=active]:text-blue-300"
            >
              아이폰
            </TabsTrigger>
            <TabsTrigger
              value="galaxy"
              className="w-full border-b-2 border-transparent px-4 text-center text-sm font-semibold text-gray-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:text-gray-300 dark:data-[state=active]:border-blue-400 dark:data-[state=active]:text-blue-300"
            >
              갤럭시
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            <TabsContent value="iphone" className="space-y-6">
              {GUIDE_DATA.iphone.map((step, idx) => (
                <section
                  key={idx}
                  className="space-y-2 rounded-xl border p-4 shadow-sm dark:border-zinc-700"
                >
                  <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                    {step.title}
                  </h2>
                  {step.description}
                  {idx < GUIDE_DATA.iphone.length - 1 && <Separator />}
                </section>
              ))}
            </TabsContent>
            <TabsContent value="galaxy" className="space-y-6">
              {GUIDE_DATA.galaxy.map((step, idx) => (
                <section
                  key={idx}
                  className="space-y-2 rounded-xl border p-4 shadow-sm dark:border-zinc-700"
                >
                  <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                    {step.title}
                  </h2>
                  {step.description}
                  {idx < GUIDE_DATA.galaxy.length - 1 && <Separator />}
                </section>
              ))}
            </TabsContent>
          </div>
        </div>
      </Tabs>

      <PoweredByFooter />

      <div className="flex justify-center">
        <button
          onClick={() => window.history.back()}
          className="mt-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 dark:border-zinc-600 dark:bg-zinc-700 dark:text-gray-100 dark:hover:bg-zinc-600"
        >
          홈 화면으로 돌아가기
        </button>
      </div>
    </main>
  );
};

export default AppGuidePage;
