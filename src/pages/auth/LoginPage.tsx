import { LogInIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthFooter from "@/components/auth/AuthFooter";
import LoginForm from "@/components/auth/LoginForm";
import { useLogin } from "@/hooks/auth/useLogin";
import Seo from "@/components/Seo";

const LoginPage = () => {
  const { error, isLoading, emailRef, passwordRef, handleSubmit } = useLogin();

  return (
    <>
      <Seo title="로그인 | On & Off" description="On & Off에 로그인하고 근태 현황을 확인하세요." />

      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="space-y-6 p-6">
            <AuthHeader icon={LogInIcon} title="로그인" />
            <form onSubmit={handleSubmit} className="space-y-6">
              <LoginForm emailRef={emailRef} passwordRef={passwordRef} />
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <AuthFooter
                buttonText="로그인"
                linkText="계정이 없나요? 회원가입으로 이동"
                linkTo="/signup"
                loading={isLoading}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
