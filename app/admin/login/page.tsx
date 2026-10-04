import { loginAction } from "@/app/admin/actions";
import { LoginForm } from "@/components/LoginForm";

export const metadata = { title: "Admin login" };

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-4 py-24">
      <LoginForm action={loginAction} />
    </main>
  );
}
